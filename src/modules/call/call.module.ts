import { Module } from '@nestjs/common';
import { GetExpectedInfoHttpController } from './presentation/controllers/get.expected.info.http.controller';

@Module({
  imports: [GetExpectedInfoHttpController],
})
export class CallModule {}
