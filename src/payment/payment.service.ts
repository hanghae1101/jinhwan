import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPayment } from './payment.interface';
import { Payment } from '../app/entity/payment.entity';
import { CreatePaymentDto } from './dtos/create.payment.dto';
import { UpdatePaymentDto } from './dtos/update.payment.dto';
import { DeletePaymentDto } from './dtos/delete.payment.dto';

@Injectable()
export class PaymentService {
	constructor(@Inject('PAYMENT_REPOSITORY') private readonly paymentRepository: IPayment) {}
	async create(createPaymentDto: CreatePaymentDto) {
		const paymentEntity: Payment | null = await this.paymentRepository.findByNumber(createPaymentDto.card_number);

		if (paymentEntity) throw new ConflictException();

		const payment: Payment = new Payment();
		payment.card_company = createPaymentDto.card_company;
		payment.card_name = createPaymentDto.card_name;
		payment.card_number = createPaymentDto.card_number;

		await this.paymentRepository.insertPayment(payment);
	}

	async update(updatePaymentDto: UpdatePaymentDto) {
		const paymentEntity: Payment | null = await this.paymentRepository.findById(updatePaymentDto.id);

		if (!paymentEntity) throw new NotFoundException();

		const payment: Payment = new Payment();
		payment.id = updatePaymentDto.id;
		payment.card_company = updatePaymentDto.card_company;
		payment.card_name = updatePaymentDto.card_name;
		payment.card_number = updatePaymentDto.card_number;

		await this.paymentRepository.updatePayment(payment);
	}

	async delete(deletePaymentDto: DeletePaymentDto) {
		const paymentEntity: Payment | null = await this.paymentRepository.findById(deletePaymentDto.id);

		if (!paymentEntity) throw new NotFoundException();

		await this.paymentRepository.deletePayment(deletePaymentDto.id);
	}
}
