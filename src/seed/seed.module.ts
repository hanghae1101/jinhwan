import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Driver } from 'src/entity/driver.entity';
import { SeedService } from './seed.service';
import { UserRepository } from 'src/user/infra/user.repository';
import { DriverRepository } from 'src/matching/infra/driver.repository';

@Module({
	providers: [SeedService, UserRepository, DriverRepository],
	exports: [SeedService],
})
export class SeedModule {}
