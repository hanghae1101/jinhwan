import { Test, TestingModule } from '@nestjs/testing';
import { MatchingService } from './application/matching.service';

describe('MatchingService', () => {
	let service: MatchingService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [MatchingService],
		}).compile();

		service = module.get<MatchingService>(MatchingService);
	});

	it('기사와 손님 매칭 성공', () => {
		// const driverName = 'jeus';
		// service.addDriver(driverName);
		// const result = service.matching();
		// expect(result).toEqual(driverName);
	});

	it('기사와 손님 매칭 실패', () => {
		// const result = service.matching();
		// expect(result).toEqual(null);
	});
});
