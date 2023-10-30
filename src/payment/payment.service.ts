import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IPayment } from './payment.interface';
import { Payment } from '../app/entity/payment.entity';
import { CreatePaymentDto } from './dtos/create.payment.dto';

@Injectable()
export class PaymentService {
	constructor(@Inject('PAYMENT_REPOSITORY') private readonly paymentRepository: IPayment) {}
	async create(createPaymentDto: CreatePaymentDto) {
		const paymentEntity: Payment | null = await this.paymentRepository.findByNumber(createPaymentDto.card_number);

		if (paymentEntity) throw new ConflictException();

		const payment: Payment = new Payment();
		payment.card_company = createPaymentDto.card_company;
		payment.card_number = createPaymentDto.card_number;

		await this.paymentRepository.insertPayment(payment);
	}
}
