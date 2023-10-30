import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@Get()
	getHello() {
		return 'welcome!!, version : 0.0.0.2!!!';
	}
}
