import { Module } from '@nestjs/common';
import { MatchingController } from './controller/matching.controller';
import { MatchingService } from './application/matching.service';
import { MatchingRepository } from './infra/matching.repository';

@Module({
	controllers: [MatchingController],
	providers: [MatchingService, MatchingRepository],
})
export class MatchingModule {}
