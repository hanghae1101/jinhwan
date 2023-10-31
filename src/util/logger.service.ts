import { Injectable, LoggerService } from '@nestjs/common';
import winston, { createLogger, format, transports } from 'winston';
import * as WinstonCloudWatch from 'winston-cloudwatch';

const { combine, simple, colorize, timestamp, printf } = format;

@Injectable()
export class WinstonLoggerService implements LoggerService {
	private logger: winston.Logger;

	constructor() {
		this.logger = createLogger({
			level: 'info',
			format: combine(
				timestamp({
					format: 'YYYY-MM-DD HH:mm:ss',
				}),
				printf(({ timestamp, level, message }) => {
					return `${timestamp} [${level}]: ${message}`;
				})
			),
		});

		if (process.env.NODE_ENV === 'production') {
			const cloudwatchConfig: WinstonCloudWatch.CloudwatchTransportOptions = {
				awsOptions: {
					credentials: {
						accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY!,
						secretAccessKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY!,
					},
					region: process.env.CLOUDWATCH_REGION,
				},
				logGroupName: process.env.CLOUDWATCH_LOG_GROUP_NAME,
				logStreamName: `${process.env.CLOUDWATCH_LOG_GROUP_NAME}-${process.env.NODE_ENV}`,
				messageFormatter: ({ level, message, additionalInfo }) => `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(additionalInfo)}`,
			};

			const cloudwatchHelper = new WinstonCloudWatch(cloudwatchConfig);
			this.logger.add(cloudwatchHelper);
		} else if (process.env.NODE_ENV === 'development') {
			this.logger.add(
				new transports.Console({
					format: combine(colorize(), simple()),
				})
			);
		}
	}

	public log(message: string): void {
		this.logger.info(message);
	}

	public error(message: string, trace: string): void {
		this.logger.error(message, { trace });
	}

	public warn(message: string): void {
		this.logger.warn(message);
	}

	public debug(message: string): void {
		this.logger.debug(message);
	}

	public verbose(message: string): void {
		this.logger.verbose(message);
	}
}