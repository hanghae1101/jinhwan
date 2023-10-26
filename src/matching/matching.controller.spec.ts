import { Test, TestingModule } from '@nestjs/testing';
import { MatchingController } from './controller/matching.controller';
import { MatchingService } from './application/matching.service';

describe('MatchingController', () => {
	let controller: MatchingController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MatchingController],
			providers: [MatchingService],
		}).compile();

		controller = module.get<MatchingController>(MatchingController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
