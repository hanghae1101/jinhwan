import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { IPayment } from './payment.interface';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dtos/create.payment.dto';
import { UpdatePaymentDto } from './dtos/update.payment.dto';

class MockPaymentRepository implements IPayment {
	findByNumber = jest.fn();
	findById = jest.fn();
	insertPayment = jest.fn();
	updatePayment = jest.fn();
	deletePayment = jest.fn();
}

describe('PaymentService', () => {
	let service: PaymentService;
	let paymentRepository: IPayment;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PaymentService, { provide: 'PAYMENT_REPOSITORY', useClass: MockPaymentRepository }],
		}).compile();

		service = module.get<PaymentService>(PaymentService);
		paymentRepository = module.get<IPayment>('PAYMENT_REPOSITORY');
	});

	it('[실패] 결제 정보 추가 - 중복 에러', () => {
		const mockCreateDto: CreatePaymentDto = { card_company: '신한카드', card_name: '신한카드 Deep Oil', card_number: '1111222233334444' };
		paymentRepository.findByNumber = jest.fn().mockResolvedValue(mockCreateDto);

		expect(async () => await service.create(mockCreateDto)).rejects.toThrowError(new ConflictException());
	});

	it('[성공] 결제 정보 추가', async () => {
		const mockCreateDto: CreatePaymentDto = { card_company: '신한카드', card_name: '신한카드 Deep Oil', card_number: '1111222233334444' };
		await service.create(mockCreateDto);

		expect(paymentRepository.insertPayment).toBeCalledTimes(1);
	});

	it('[실패] 결제 정보 변경 - 결제 정보 에러', () => {
		const mockUpdateDto: UpdatePaymentDto = { id: 1, card_number: '5555222233334444' };
		paymentRepository.findById = jest.fn().mockResolvedValue(null);

		expect(async () => await service.update(mockUpdateDto)).rejects.toThrowError(new NotFoundException());
	});

	it('[성공] 결제 정보 변경', async () => {
		const mockUpdateDto: UpdatePaymentDto = { id: 1, card_number: '5555222233334444' };
		paymentRepository.findById = jest.fn().mockResolvedValue(mockUpdateDto);

		await service.update(mockUpdateDto);

		expect(paymentRepository.updatePayment).toBeCalledTimes(1);
	});

	it('[실패] 결제 정보 삭제 - 결제 정보 에러', async () => {
		paymentRepository.findById = jest.fn().mockResolvedValue(null);
		expect(async () => await service.delete(1)).rejects.toThrowError(new NotFoundException());
	});

	it('[성공] 결제 정보 삭제', async () => {
		paymentRepository.findById = jest
			.fn()
			.mockResolvedValue({ id: 1, card_company: '신한카드', card_name: '신한카드 Deep Oil', card_number: '1111222233334444' });

		await service.delete(1);
		expect(paymentRepository.deletePayment).toBeCalledTimes(1);
	});

	it.todo('결제 요청');
});
