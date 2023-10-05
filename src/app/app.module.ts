import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CallModule } from '../modules/call/call.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CallModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
