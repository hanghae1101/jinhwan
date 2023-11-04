import { Column, Entity } from 'typeorm';
import { BasicEntity } from './basic.entity';

@Entity()
export class Payment extends BasicEntity {
	@Column({ name: 'card_company', type: 'varchar' })
	card_company: string;

	@Column({ name: 'card_name', type: 'varchar' })
	card_name: string;

	@Column({ name: 'card_number', type: 'varchar' })
	card_number: string;
}
