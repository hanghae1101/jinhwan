import { Injectable } from '@nestjs/common';
import { IPayment } from './payment.interface';
import { DataSource, Repository } from 'typeorm';
import { Payment } from '../app/entity/payment.entity';

@Injectable()
export class PaymentRepository extends Repository<Payment> implements IPayment {
	constructor(private dataSource: DataSource) {
		super(Payment, dataSource.createEntityManager());
	}

	findByNumber(card_number: string): Promise<Payment | null> {
		return this.findOne({ where: { card_number: card_number } });
	}
	insertPayment(payment: Payment): void {
		this.insert(payment);
	}
}
