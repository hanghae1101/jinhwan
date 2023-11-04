import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomPinoLogger } from 'src/logger/application/logger.service';
import { DriverRepository } from '../infra/driver.repository';
import { CallRepository } from '../infra/call.repository';
import { OperationRepository } from '../infra/operation.repository';
import { CreateOperationDto } from '../controller/dto/create-operation.dto';
import { UserRepository } from 'src/user/infra/user.repository';
import { DataSource, EntityNotFoundError } from 'typeorm';

@Injectable()
export class MatchingService {
	constructor(
		private readonly driverRepositoy: DriverRepository,
		private readonly userRepository: UserRepository,
		private readonly callRepository: CallRepository,
		private readonly operationRepository: OperationRepository,
		private readonly logger: CustomPinoLogger,
		private readonly dataSource: DataSource
	) {}

	async matching(createOperationDto: CreateOperationDto): Promise<any> {
		const { userId, routeInfo } = createOperationDto;

		const result = await this.dataSource.transaction(async (transaction) => {
			let startTime: number = new Date().getTime();
			const userInfo = await this.userRepository.getUserById(userId);
			let elapsTime: number = new Date().getTime() - startTime;
			this.logger.info('tran1', { elapsTime });

			if (!userInfo) {
				throw new EntityNotFoundError('User', { msg: 'not found' });
			}

			startTime = new Date().getTime();
			const call = await this.callRepository.getCallByUserId(userId);
			if (!call) {
				throw new EntityNotFoundError('Call', { msg: 'not found' });
			}
			elapsTime = new Date().getTime() - startTime;
			this.logger.info('tran2', { elapsTime });

			startTime = new Date().getTime();
			const idleDriver = await this.driverRepositoy.getWaitDriver();
			elapsTime = new Date().getTime() - startTime;
			this.logger.info('tran3', { elapsTime });

			if (!idleDriver) {
				throw new EntityNotFoundError('Driver', { msg: 'There is no driver in waiting' });
			}

			startTime = new Date().getTime();
			const operation = await this.operationRepository.saveOperation(userId, idleDriver.id, routeInfo);
			elapsTime = new Date().getTime() - startTime;
			this.logger.info('tran4', { elapsTime });
			return operation;
		});

		return result;
	}
}
