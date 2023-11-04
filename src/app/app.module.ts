import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { FindWayModule } from '../find-way/find-way.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchingModule } from 'src/matching/matching.module';
import { LoggerModule } from 'src/logger/logger.module';
import configuration from '../config/app.config';

import { Bookmark } from '../entity/bookmark.entity';
import { Driver } from '../entity/driver.entity';
import { User } from 'src/entity/user.entity';
import { Call } from 'src/entity/call.entity';
import { Operation } from 'src/entity/operation.entity';
import { Payment } from 'src/entity/payment.entity';
import { SeedModule } from 'src/seed/seed.module';

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
			entities: [Bookmark, Driver, User, Call, Operation, Payment],
			synchronize: true,
		}),
		TypeOrmModule.forFeature([User, Driver]),
		SeedModule,
	],
	controllers: [AppController],
})
export class AppModule {}
