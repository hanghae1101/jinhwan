import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto {
	@IsNumber()
	id: number;

	@IsString()
	@IsOptional()
	card_company?: string;

	@IsString()
	@IsOptional()
	card_name?: string;

	@IsString()
	@IsOptional()
	card_number?: string;
}
