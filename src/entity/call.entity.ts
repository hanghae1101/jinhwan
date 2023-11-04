import { Column, Entity } from 'typeorm';
import { BasicEntity } from './basic.entity';

@Entity()
export class Call extends BasicEntity {
	@Column()
	userId: number;

	@Column('json')
	route: any;
}
