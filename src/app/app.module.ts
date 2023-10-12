import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { FindWayModule } from '../find-way/find-way.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    FindWayModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
