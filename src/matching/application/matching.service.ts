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
		try {
			this.logger.debug('test message', { span: 1, param: { name: 'a' } });
			this.logger.warn('test message', { span: 2, param: { name: 'a' } });
			this.logger.info('test message', { span: 3, param: { name: 'a' } });
		} catch (err) {
			return 0;
		}

		// this.logger.fatal('test message', { span: 4, param: { name: 'a' } });
		// return { msg: 'hello' };
		// const driverInfo = await this.matchingRepository.findWaitingDriver();
		// return driverInfo;
	}

	logTest(): void {
		// this.logger.debug('logger.debug test2');
	}
}
