import { Payment } from '../app/entity/payment.entity';

export interface IPayment {
	findByNumber(card_number: string): Promise<Payment | null>;
	insertPayment(payment: Payment): void;
}
