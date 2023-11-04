import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../entity/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
	constructor(dataSource: DataSource) {
		super(User, dataSource.createEntityManager());
	}

	async getUserById(id: number) {
		const user = await this.findOne({ where: { id } });
		return user;
	}
}
