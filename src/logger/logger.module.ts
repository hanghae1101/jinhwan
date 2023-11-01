import { Global, Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { CustomPinoLogger } from './application/logger.service';
import { CloudWatchSender } from './infra/cloudwatch.infra';

const infra = [{ provide: 'CloudWatchSender', useClass: CloudWatchSender }];

@Global()
@Module({
	imports: [
		PinoLoggerModule.forRoot({
			pinoHttp: {
				level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
				transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
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
			},
		}),
	],
	providers: [CustomPinoLogger, ...infra],
	exports: [CustomPinoLogger],
})
export class LoggerModule {}
