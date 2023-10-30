import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { FindWayModule } from '../find-way/find-way.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from '../find-way/entities/bookmark.entity';

@Module({
	imports: [
		FindWayModule,
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'postgres-db',
			port: 5432,
			username: 'root',
			password: 'password',
			database: 'taxi',
			entities: [Bookmark],
			synchronize: true,
		}),
	],
	controllers: [AppController],
})
export class AppModule {}
