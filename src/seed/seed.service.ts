import { Injectable } from '@nestjs/common';
import { DriverRepository } from 'src/matching/infra/driver.repository';
import { UserRepository } from 'src/user/infra/user.repository';
import { EntityManager } from 'typeorm';

@Injectable()
export class SeedService {
	private seedCnt: number;
	constructor(
		private readonly userRepository: UserRepository,
		private readonly driverRepository: DriverRepository,
		private readonly manager: EntityManager
	) {
		this.seedCnt = 10000;
	}

	private getRandomNumber(): string {
		const randomNumber = Math.floor(Math.random() * 9999) + 1;
		const randomNumberString = randomNumber.toString().padStart(4, '0');
		return randomNumberString;
	}

	private getRandomPhoneNumber(): string {
		const middlePart = Math.floor(Math.random() * 10000)
			.toString()
			.padStart(4, '0');
		const lastPart = Math.floor(Math.random() * 10000)
			.toString()
			.padStart(4, '0');
		return `010-${middlePart}-${lastPart}`;
	}

	async seedUsers() {
		const userCnt = await this.userRepository.findAndCount();
		if (userCnt[1] !== 0) {
			return;
		}

		for (let cnt = 0; cnt < this.seedCnt; cnt++) {
			try {
				let name = `user${cnt}`;
				let phone = this.getRandomPhoneNumber();

				let user = this.userRepository.create({ name, phone });
				await this.userRepository.save(user);
			} catch (error) {
				throw error;
			}
		}
	}

	async seedDrivers() {
		const driverCnt = await this.driverRepository.findAndCount();
		if (driverCnt[1] !== 0) {
			return;
		}

		for (let cnt = 0; cnt < this.seedCnt; cnt++) {
			try {
				let name = `driver${cnt}`;
				let randomNum = this.getRandomNumber();
				let vehicle = `02아 ${randomNum}`;

				let driver = this.driverRepository.create({ name, vehicle });
				await this.driverRepository.save(driver);
			} catch (err) {
				throw err;
			}
		}
	}
}
