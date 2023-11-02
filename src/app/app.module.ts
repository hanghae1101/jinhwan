import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { FindWayModule } from '../find-way/find-way.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from '../entity/bookmark.entity';
import { MatchingModule } from 'src/matching/matching.module';
import { Driver } from '../entity/driver.entity';
import { LoggerModule } from 'src/logger/logger.module';
import configuration from '../config/app.config';

@Module({
	imports: [
		FindWayModule,
		MatchingModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['src/config/.env'],
			load: [configuration],
		}),
		LoggerModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'postgres',
			database: 'taxi',
			entities: [Bookmark, Driver],
			synchronize: true,
		}),
	],
	controllers: [AppController],
})
export class AppModule {}
