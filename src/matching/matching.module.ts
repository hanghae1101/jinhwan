import { Module } from '@nestjs/common';
import { MatchingController } from './controller/matching.controller';
import { MatchingService } from './application/matching.service';
import { DriverRepository } from './infra/driver.repository';
import { CallRepository } from './infra/call.repository';
import { OperationRepository } from './infra/operation.repository';
import { UserRepository } from 'src/user/infra/user.repository';

@Module({
	controllers: [MatchingController],
	providers: [MatchingService, DriverRepository, UserRepository, CallRepository, OperationRepository],
})
export class MatchingModule {}
