import { Column, Entity } from 'typeorm';

@Entity()
export class Payment {
	@Column({ name: 'card_company', type: 'varchar' })
	card_company: string;

	@Column({ name: 'card_number', type: 'varchar' })
	card_number: string;
}
