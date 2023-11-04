import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UserRepository } from 'src/user/infra/user.repository';
import { DriverRepository } from 'src/matching/infra/driver.repository';

@Module({
	providers: [SeedService, UserRepository, DriverRepository],
	exports: [SeedService],
})
export class SeedModule {}
