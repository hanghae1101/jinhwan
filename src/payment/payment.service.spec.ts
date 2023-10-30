import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { IPayment } from './payment.interface';
import { ConflictException } from '@nestjs/common';
import { CreatePaymentDto } from './dtos/create.payment.dto';

class MockPaymentRepository implements IPayment {
	findByNumber = jest.fn();
	insertPayment = jest.fn();
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
		const mockCreateDto: CreatePaymentDto = { card_company: '신한카드', card_number: '1111222233334444' };
		paymentRepository.findByNumber = jest.fn().mockResolvedValue(mockCreateDto);

		expect(() => service.create(mockCreateDto)).rejects.toThrowError(new ConflictException());
	});

	it('[성공] 결제 정보 추가', async () => {
		const mockCreateDto: CreatePaymentDto = { card_company: '신한카드', card_number: '1111222233334444' };
		await service.create(mockCreateDto);

		expect(paymentRepository.insertPayment).toBeCalledTimes(1);
	});

	it.todo('[실패] 결제 정보 변경 - 결제 정보 에러');
	it.todo('[성공] 결제 정보 변경');

	it.todo('[실패] 결제 정보 삭제 - 결제 정보 에러');
	it.todo('[성공] 결제 정보 삭제');

	it.todo('결제 요청');
});
