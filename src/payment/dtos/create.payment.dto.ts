import { IsString } from 'class-validator';

export class CreatePaymentDto {
	@IsString()
	card_company: string;

	@IsString()
	card_name: string;

	@IsString()
	card_number: string;
}
