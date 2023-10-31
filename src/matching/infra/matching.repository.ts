import { Injectable, NotFoundException } from '@nestjs/common';
import { Driver, driverStatus } from '../../entity/driver.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MatchingRepository extends Repository<Driver> {
	constructor(dataSource: DataSource) {
		super(Driver, dataSource.createEntityManager());
	}

	async findWaitingDriver(): Promise<any> {
		const driver = await this.createQueryBuilder('driver')
			.select(['driver.id AS id', 'driver.vehicle AS vehicle'])
			.where('driver.status = :status', { status: driverStatus.WAITING })
			.orderBy('RANDOM()')
			.limit(1)
			.getRawOne();

		if (driver === undefined) {
			throw new NotFoundException(`There are no taxi drivers waiting to drive.`);
		}

		return driver;
	}
}
