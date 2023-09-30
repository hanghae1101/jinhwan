import { Module } from '@nestjs/common';
import { CallPresentationModule } from './presentation/call.presentation.module';

@Module({
  imports: [CallPresentationModule],
})
export class CallModule {}
