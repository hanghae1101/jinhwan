import { Injectable } from '@nestjs/common';
import { Driver, driverStatus } from '../../entity/driver.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';

@Injectable()
export class DriverRepository extends Repository<Driver> {
	constructor(dataSource: DataSource) {
		super(Driver, dataSource.createEntityManager());
	}

	async getWaitDriver(): Promise<any> {
		const query = `
			SELECT
				driver.id AS id,
				driver.vehicle AS vehicle
			FROM
				driver
			TABLESAMPLE SYSTEM(1)
			WHERE
				driver.status = $1
			LIMIT 1
		`;

		const driver = await this.query(query, [driverStatus.WAIT]);
		// .select(['driver.id AS id', 'driver.vehicle AS vehicle'])
		// .from(Driver, 'driver')
		// .where('driver.status = :status', { status: driverStatus.WAIT })
		// .orderBy('RANDOM()')
		// .limit(1)
		// .getRawOne();

		console.log(driver[0]);
		return driver[0];
	}

	async setCallStatus(queryRunner: QueryRunner, driverId: number): Promise<void> {
		await queryRunner.manager.update(Driver, driverId, { status: driverStatus.CALL });
		return;
	}
}
