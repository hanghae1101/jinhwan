import { Inject, Injectable } from '@nestjs/common';
import { IMatching } from '../domain/matching.interface';

@Injectable()
export class MatchingService {
	constructor(
		@Inject('MatchingRepository')
		private readonly matchingRepository: IMatching
	) {}

	async matching(): Promise<any> {
		const driverInfo = await this.matchingRepository.findWaitingDriver();
		return driverInfo;
	}
}
