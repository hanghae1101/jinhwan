import { CloudWatchLogs, InputLogEvent } from '@aws-sdk/client-cloudwatch-logs';
import { ConfigService } from '@nestjs/config';
import { ILogSender } from '../domain/logger.domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudWatchSender implements ILogSender {
	private cloudWatch: CloudWatchLogs;
	private logGroupName: string;
	private logStreamName: string;
	private logStreamExist: boolean;

	constructor(private readonly configService: ConfigService) {
		this.cloudWatch = new CloudWatchLogs({
			credentials: {
				accessKeyId: this.configService.get<string>('cloudwatch.accessKey'),
				secretAccessKey: this.configService.get<string>('cloudwatch.secretAccessKey'),
			},

			region: this.configService.get<string>('cloudwatch.region'),
		});
		this.logGroupName = this.configService.get<string>('cloudwatch.logGroup');
		this.logStreamName = this.configService.get<string>('cloudwatch.streamName');
		this.logStreamExist = false;
	}

	async ensureLogStreamExists(): Promise<void> {
		if (this.logStreamExist) {
			return;
		}

		try {
			const { logStreams } = await this.cloudWatch.describeLogStreams({
				logGroupName: this.logGroupName,
				logStreamNamePrefix: this.logStreamName,
			});

			const streamExists = logStreams?.some((stream) => stream.logStreamName === this.logStreamName);

			if (!streamExists) {
				await this.cloudWatch.createLogStream({
					logGroupName: this.logGroupName,
					logStreamName: this.logStreamName,
				});

				this.logStreamExist = true;
			}
		} catch (error) {
			// console.error('[CloudWatchLogSender] ensureLogStreamExists fail. error:', error);
			throw error;
		}
	}

	async sendLog(message: string, context?: any, stack?: any): Promise<void> {
		try {
			await this.ensureLogStreamExists();

			const logEvent: InputLogEvent = {
				message: JSON.stringify({
					message,
					...(context && { context }),
					...(stack && { stack }),
				}),
				timestamp: Date.now(),
			};

			const params = {
				logGroupName: this.logGroupName,
				logStreamName: this.logStreamName,
				logEvents: [logEvent],
			};
			await this.cloudWatch.putLogEvents(params);
		} catch (error) {
			throw error;
		}
	}
}
