import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);
	const port = configService.get<number>('port');
	const host = configService.get<string>('host');

	await app.listen(Number(port), host);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		})
	);

	Logger.log(`port is ${port}`, 'application');
}
bootstrap();
