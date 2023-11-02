import { Column, Entity } from 'typeorm';
import { BasicEntity } from './base.entity';

@Entity()
export class Driver extends BasicEntity {
	@Column()
	name: string;

	@Column()
	phone: string;
}
