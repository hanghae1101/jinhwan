import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { AppController } from './app.controller';
import { FindWayModule } from '../find-way/find-way.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from '../find-way/entities/bookmark.entity';
import { MatchingModule } from 'src/matching/matching.module';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

@Module({
	imports: [
		FindWayModule,
		MatchingModule,
		ConfigModule.forRoot({
			envFilePath: 'src/config/.env',
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'postgres',
			database: 'taxi',
			entities: [Bookmark],
			synchronize: true,
		}),
		WinstonModule.forRoot({
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.timestamp(),
						winston.format.ms(),
						nestWinstonModuleUtilities.format.nestLike('TAXI', {
							colors: true,
							prettyPrint: true,
						})
					),
				}),
			],
		}),
	],
	controllers: [AppController],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
