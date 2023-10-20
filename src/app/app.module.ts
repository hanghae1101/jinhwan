import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { FindWayModule } from '../find-way/find-way.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from '../find-way/entities/bookmark.entity';
import { Driver } from './entity/driver.entity';

@Module({
  imports: [
    FindWayModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'password',
      database: 'taxi',
      entities: [Bookmark, Driver],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
