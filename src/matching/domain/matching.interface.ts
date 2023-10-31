import { Driver } from 'src/entity/driver.entity';

export interface IMatching {
	findWaitingDriver(): Promise<any>;
}
