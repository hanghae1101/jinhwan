import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { ILogSender } from '../domain/logger.domain';

export class CloudWatchSender implements ILogSender {
	private cloudWatch: AWS.CloudWatchLogs;
	private logGroupName: string;
	private logStreamName: string;

	constructor(private readonly configService: ConfigService) {
		this.cloudWatch = new AWS.CloudWatchLogs({
			credentials: {
				accessKeyId: this.configService.get<string>('cloudwatch.accessKey'),
				secretAccessKey: this.configService.get<string>('cloudwatch.secretAccessKey'),
			},
			region: this.configService.get<string>('cloudwatch.region'),
		});
		this.logGroupName = process.env.CLOUDWATCH_LOG_GROUP!;
		this.logStreamName = `${process.env.CLOUDWATCH_LOG_GROUP_NAME}-${process.env.NODE_ENV}`!;
	}
	async sendLog(message: string, context?: any, stack?: any): Promise<void> {}
}
