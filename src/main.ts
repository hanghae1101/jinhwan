import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
	const port = process.env.PORT || 3000;
	const app = await NestFactory.create(AppModule);
	await app.listen(Number(port));
	Logger.log(`port is ${port}`, 'application');
}
bootstrap();
