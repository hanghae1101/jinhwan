import { Column, Entity, OneToMany } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { Operation } from './operation.entity';

@Entity()
export class User extends BasicEntity {
	@Column()
	name: string;

	@Column()
	phone: string;

	@OneToMany(() => Operation, (operation) => operation.user)
	operations: Operation[];
}
