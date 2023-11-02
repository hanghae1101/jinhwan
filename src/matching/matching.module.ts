import { Module } from '@nestjs/common';
import { MatchingController } from './controller/matching.controller';
import { MatchingService } from './application/matching.service';
import { MatchingRepository } from './infra/matching.repository';
import { WinstonLoggerService } from 'src/util/logger.service';

const infra = [{ provide: 'MatchingRepository', useClass: MatchingRepository }];

@Module({
	controllers: [MatchingController],
	providers: [MatchingService, ...infra],
})
export class MatchingModule {}
