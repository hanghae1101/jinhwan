import { Controller, Post, Get } from '@nestjs/common';
import { MatchingService } from '../application/matching.service';

@Controller('matching')
export class MatchingController {
	constructor(private readonly matchingService: MatchingService) {}

	@Get()
	hello() {
		return this.matchingService.hello();
	}

	@Post()
	matching(): Promise<any> {
		return this.matchingService.matching();
	}
}
