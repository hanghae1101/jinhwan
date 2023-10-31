import { Inject, Injectable } from '@nestjs/common';
import { WinstonLoggerService } from '../../util/logger.service';
import { IMatching } from '../domain/matching.interface';

@Injectable()
export class MatchingService {
	constructor(
		@Inject('MatchingRepository')
		private readonly matchingRepository: IMatching,
		private readonly logger: WinstonLoggerService
	) {}

	hello() {
		try {
			this.logger.warn('this is a manual log for test cloudwatch');
		} catch (err) {
			this.logger.error('??', '????');
		}
	}

	async matching(): Promise<any> {
		const driverInfo = await this.matchingRepository.findWaitingDriver();
		return driverInfo;
	}
}
