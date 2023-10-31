import { Inject, Injectable } from '@nestjs/common';
import { IMatching } from '../domain/matching.interface';
import { WinstonLoggerService } from 'src/util/logger.service';

@Injectable()
export class MatchingService {
	constructor(
		@Inject('MatchingRepository')
		private readonly matchingRepository: IMatching,
		private readonly logger: WinstonLoggerService
	) {}

	async matching(): Promise<any> {
		this.logger.debug('logger.debug test');
		this.logger.warn('logger.warning test');
		this.logger.log('logger.log test');
		this.logger.verbose('logger.verbose test');

		try {
			throw new Error('logger.error test');
		} catch (err) {
			this.logger.error(err.message, err.trace);
		}
		// const driverInfo = await this.matchingRepository.findWaitingDriver();
		// return driverInfo;
	}
}
