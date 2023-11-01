import { Controller, Post } from '@nestjs/common';
import { MatchingService } from '../application/matching.service';

@Controller('matching')
export class MatchingController {
	constructor(private readonly matchingService: MatchingService) {}

	@Post()
	matching(): Promise<any> {
		return this.matchingService.matching();
	}

	@Post('/test')
	test(): void {
		return this.matchingService.logTest();
	}
}
