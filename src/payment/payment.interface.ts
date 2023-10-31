import { Payment } from '../app/entity/payment.entity';

export interface IPayment {
	findByNumber(number: string): Promise<Payment | null>;
	findById(id: number): Promise<Payment | null>;
	insertPayment(payment: Payment): void;
	updatePayment(payment: Payment): void;
	deletePayment(id: number): void;
}
