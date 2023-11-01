import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { ILogSender } from '../domain/logger.domain';

@Injectable()
export class CustomPinoLogger implements LoggerService {
	constructor(
		@InjectPinoLogger(CustomPinoLogger.name) private logger: PinoLogger,
		@Inject('CloudWatchSender') private logSender: ILogSender
	) {}

	log(message: string, context?: any) {
		this.logger.info(message, ...context);
		this.logSender.sendLog(message, context);
	}

	info(message: string, context?: any) {
		this.logger.info(message, context);
	}

	warn(data: object, message?: string, ...arg: any[]) {
		this.logger.warn(data, message, ...arg);
	}

	debug(data: object, message?: string, ...arg: any[]) {
		this.logger.debug(data, message, ...arg);
	}

	error(message: string, context?: any, stack?: any) {
		this.logger.error(message, context, stack);
		this.logSender.sendLog(message, context, stack);
	}

	fatal(message: string, context?: any) {
		this.logger.fatal(message, context);
	}

	verbose(message: string, context?: any) {
		this.logger.trace(message, context);
	}
}
