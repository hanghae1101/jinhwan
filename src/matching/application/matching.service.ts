import { Inject, Injectable } from '@nestjs/common';
import { IMatching } from '../domain/matching.interface';
import { CustomPinoLogger } from 'src/logger/application/logger.service';

@Injectable()
export class MatchingService {
	constructor(
		@Inject('MatchingRepository')
		private readonly matchingRepository: IMatching,
		private readonly logger: CustomPinoLogger
	) {}

	async matching(): Promise<any> {
		this.logger.debug({ spanId: 1, func: 'matching' }, 'logger.debug test');
		this.logger.warn({ spanId: 2, func: 'matching' }, 'logger.warning test');
		this.logger.verbose('logger.verbose test');

		try {
			throw new Error('logger.error test');
		} catch (err) {
			this.logger.error(err.message, err.trace);
		}
		// const driverInfo = await this.matchingRepository.findWaitingDriver();
		// return driverInfo;
	}

	logTest(): void {
		// this.logger.debug('logger.debug test2');
	}
}
