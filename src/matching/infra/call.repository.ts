import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Call } from 'src/entity/call.entity';

@Injectable()
export class CallRepository extends Repository<Call> {
	constructor(dataSource: DataSource) {
		super(Call, dataSource.createEntityManager());
	}

	async getCallByUserId(userId: number) {
		const call = await this.findOne({ where: { userId } });
		return call;
	}
}
