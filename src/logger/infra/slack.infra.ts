import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SlackSender {
	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService
	) {}

	public async sendToSlack(context): Promise<void> {
		const slackWebHookUrl = this.configService.get<string>('SLACK_WEBHOOK_URL');
		const headers = {
			'Content-type': 'application/json',
		};

		try {
			await this.httpService.axiosRef.post(slackWebHookUrl, context, { headers });
		} catch (err) {
			console.log(err);
		}
	}
}
