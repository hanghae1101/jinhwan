import { Injectable } from '@nestjs/common';
import { Operation } from 'src/entity/operation.entity';
import { CustomPinoLogger } from 'src/logger/application/logger.service';
import { DataSource, QueryRunner, Repository } from 'typeorm';

@Injectable()
export class OperationRepository extends Repository<Operation> {
	constructor(
		dataSource: DataSource,
		private readonly logger: CustomPinoLogger
	) {
		super(Operation, dataSource.createEntityManager());
	}

	async saveOperation(userId: number, driverId: number, routeInfo: any): Promise<any> {
		const operation = this.create({ userId, driverId, routeInfo });
		const savedOperation = await this.save(operation);
		return { userId: savedOperation.userId, driverId: savedOperation.driverId, routeInfo: savedOperation.routeInfo };
	}
}
