import { Injectable } from '@nestjs/common';
import { IPayment } from './payment.interface';
import { DataSource, Repository } from 'typeorm';
import { Payment } from '../app/entity/payment.entity';

@Injectable()
export class PaymentRepository extends Repository<Payment> implements IPayment {
	constructor(private dataSource: DataSource) {
		super(Payment, dataSource.createEntityManager());
	}

	async findByNumber(number: string): Promise<Payment | null> {
		return await this.findOne({ where: { card_number: number } });
	}

	async findById(id: number): Promise<Payment | null> {
		return await this.findOne({ where: { id: id } });
	}

	async insertPayment(payment: Payment) {
		await this.insert(payment);
	}

	async updatePayment(payment: Payment) {
		const { id, ...newInput } = payment;
		await this.update({ id: id }, { ...newInput });
	}

	async deletePayment(id: number) {
		await this.delete(id);
	}
}
