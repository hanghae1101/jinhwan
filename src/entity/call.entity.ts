import { Column, Entity } from 'typeorm';
import { BasicEntity } from './base.entity';

@Entity()
export class Driver extends BasicEntity {
	@Column()
	userId: number;

	@Column()
	driverId: number;

	@Column()
	route: Object;
}
