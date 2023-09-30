import { Module } from '@nestjs/common';
import { GetExpectedInfoHttpController } from './controllers/get.expected.info.http.controller';

@Module({
  controllers: [GetExpectedInfoHttpController],
  providers: [],
})
export class CallPresentationModule {}
