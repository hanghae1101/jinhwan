import { Payment } from '../app/entity/payment.entity';
import { UpdatePaymentDto } from './dtos/update.payment.dto';

export interface IPayment {
	findByNumber(number: string): Promise<Payment | null>;
	findById(id: number): Promise<Payment | null>;
	insertPayment(payment: Payment): void;
	updatePayment(payment: Payment): void;
}
