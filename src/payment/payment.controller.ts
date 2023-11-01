import { Body, Controller, Delete, Post, Put, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dtos/create.payment.dto';
import { UpdatePaymentDto } from './dtos/update.payment.dto';
import { DeletePaymentDto } from './dtos/delete.payment.dto';

@Controller('payment')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Post()
	create(@Body() createPaymentDto: CreatePaymentDto) {
		this.paymentService.create(createPaymentDto);
	}

	@Put()
	update(@Body() updatePaymentDto: UpdatePaymentDto) {
		this.paymentService.update(updatePaymentDto);
	}

	@Delete()
	delete(@Query() deletePaymentDto: DeletePaymentDto) {
		this.paymentService.delete(deletePaymentDto);
	}
}
