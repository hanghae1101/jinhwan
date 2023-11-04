import { Column, Entity, OneToMany } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { Operation } from './operation.entity';

export enum driverStatus {
	WAIT = 'WAIT',
	CALL = 'CALL',
	DRIVE = 'DRIVE',
	BILL = 'BILL',
}

@Entity()
export class Driver extends BasicEntity {
	@Column()
	name: string;

	@Column()
	vehicle: string;

	@Column({
		type: 'enum',
		enum: driverStatus,
		default: driverStatus.WAIT,
	})
	status: string;

	@OneToMany(() => Operation, (operation) => operation.driver)
	operations: Operation[];
}
