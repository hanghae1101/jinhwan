import { Global, Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { CustomPinoLogger } from './application/logger.service';
import { CloudWatchSender } from './infra/cloudwatch.infra';
import * as pino from 'pino';
import * as FileStreamRotator from 'file-stream-rotator';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { SlackSender } from './infra/slack.infra';
import formattedTimestamp from '../util/format-timestamp';

const infra = [{ provide: 'CloudWatchSender', useClass: CloudWatchSender }];

@Global()
@Module({
	imports: [
		PinoLoggerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				return {
					pinoHttp: {
						level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
						serializers: {
							req(request) {
								return {
									traceId: request.id,
									method: request.method,
									url: request.url,
								};
							},
							res(response) {
								return {
									statusCode: response.statusCode,
								};
							},
						},
						autoLogging: true,
						timestamp: formattedTimestamp,
						stream: pino.multistream([
							{
								stream: FileStreamRotator.getStream({
									filename: `./${configService.get<string>('LOG_PATH')}/error/error-%DATE%`,
									frequency: 'daily',
									date_format: 'YYYY-MM-DD',
									audit_file: `./${configService.get<string>('LOG_PATH')}/audit.json`,
									extension: '.log',
								}),
								level: 'error',
							},
							{
								stream: FileStreamRotator.getStream({
									filename: `./${configService.get<string>('LOG_PATH')}/info/info-%DATE%`,
									frequency: 'daily',
									date_format: 'YYYY-MM-DD',
									audit_file: `./${configService.get<string>('LOG_PATH')}/audit.json`,
									extension: '.log',
								}),
								level: 'info',
							},
							{
								stream: FileStreamRotator.getStream({
									filename: `./${configService.get<string>('LOG_PATH')}/debug/debug-%DATE%`,
									frequency: 'daily',
									date_format: 'YYYY-MM-DD',
									audit_file: `./${configService.get<string>('LOG_PATH')}/audit.json`,
									extension: '.log',
								}),
								level: 'debug',
							},
						]),
					},
				};
			},
		}),
		HttpModule,
	],
	providers: [CustomPinoLogger, ...infra, SlackSender],
	exports: [CustomPinoLogger],
})
export class LoggerModule {}
