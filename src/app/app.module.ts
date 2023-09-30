import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CallModule } from '../modules/call/call.module';

@Module({
  imports: [CallModule],
  controllers: [AppController],
})
export class AppModule {}
