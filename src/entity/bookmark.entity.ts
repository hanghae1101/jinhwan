import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Double } from 'typeorm';
import { BasicEntity } from './basic.entity';
// import { User } from './User';

@Entity()
export class Bookmark extends BasicEntity {
	@Column()
	placeName: string;

	@Column()
	address: string;

	@Column()
	road_address: string;

	@Column()
	x: string;

	@Column()
	y: string;
}
