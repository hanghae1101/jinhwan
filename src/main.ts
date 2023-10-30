import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
	const port = process.env.PORT;
	const host = process.env.HOST;
  const app = await NestFactory.create(AppModule);
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
