import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { ILogSender } from '../domain/logger.domain';
import { SlackSender } from '../infra/slack.infra';

@Injectable()
export class CustomPinoLogger implements LoggerService {
	private cloudWatchFlag: boolean;

	constructor(
		@InjectPinoLogger(CustomPinoLogger.name) private logger: PinoLogger,
		@Inject('CloudWatchSender') private logSender: ILogSender,
		private readonly slackSender: SlackSender
	) {
		this.cloudWatchFlag = true;
	}

	private async sendLog(message: string, context?: any, stack?: any): Promise<void> {
		try {
			await this.logSender.sendLog(message, context, stack);
		} catch (error) {
			this.logger.error(error.message, error, error.stack);
			this.cloudWatchFlag = false;

			try {
				await this.slackSender.sendToSlack({ text: 'cloudwatch is not working' });
			} catch (error) {
				this.logger.error(error.message, error, error.stack);
				throw error;
			}
		}
	}

	public log(message: string, context?: any) {
		this.logger.info({ message, context });

		try {
			if (this.cloudWatchFlag) {
				this.sendLog(message, context);
			}
		} catch (error) {
			return;
		}
	}

	public info(message: string, context?: any) {
		this.logger.info({ message, context });
	}

	public warn(message: string, context?: any) {
		this.logger.warn({ message, context });
	}

	public debug(message: string, context?: any) {
		this.logger.debug({ message, context });
	}

	public error(message: string, context?: any, stack?: any) {
		this.logger.error({ message, context, stack });

		if (this.cloudWatchFlag) {
			this.sendLog(message, context, stack);
		}
	}

	public fatal(message: string, context?: any) {
		this.logger.fatal({ message, context });
	}

	public verbose(message: string, context?: any) {
		this.logger.trace({ message, context });
	}
}
