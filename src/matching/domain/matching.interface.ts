import { Driver } from 'src/app/entity/driver.entity';

export interface IMatching {
	findWaitingDriver(): Promise<any>;
}
