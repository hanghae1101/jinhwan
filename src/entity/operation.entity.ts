import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { User } from './user.entity';
import { Driver } from './driver.entity';

@Entity()
export class Operation extends BasicEntity {
	@Column()
	userId: number;

	@Column()
	driverId: number;

	@Column('json')
	routeInfo: any;

	@ManyToOne(() => User, (user) => user.operations)
	@JoinColumn({ name: 'userId' })
	user: User;

	@ManyToOne(() => Driver, (driver) => driver.operations)
	@JoinColumn({ name: 'driverId' })
	driver: Driver;
}
