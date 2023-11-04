import { Body, Controller, Post } from '@nestjs/common';
import { MatchingService } from '../application/matching.service';
import { CreateOperationDto } from './dto/create-operation.dto';

@Controller('matching')
export class MatchingController {
	constructor(private readonly matchingService: MatchingService) {}

	@Post()
	matching(@Body() createOperationDto: CreateOperationDto): Promise<any> {
		return this.matchingService.matching(createOperationDto);
	}
}
