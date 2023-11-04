import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { SeedService } from './seed/seed.service';
import { EntityNotFoundFilter } from './util/filter/typeorm-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.init();

	const configService = app.get(ConfigService);
	const port = configService.get<number>('port');
	const host = configService.get<string>('host');

	const seedService = app.get(SeedService);
	await seedService.seedUsers();
	await seedService.seedDrivers();

	app.useGlobalFilters(new EntityNotFoundFilter());

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
