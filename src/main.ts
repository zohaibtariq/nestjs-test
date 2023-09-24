import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseSeeder } from "./database/database.seeder";

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(process.env.NODE_APP_PORT || 3000); // from .env or default

  const databaseSeeder = app.get(DatabaseSeeder);
  await databaseSeeder.seedCountries();

}

bootstrap();
