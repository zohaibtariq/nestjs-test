import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseSeeder } from "./database/database.seeder";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.NODE_APP_PORT || 3000); // from .env or default

  const databaseSeeder = app.get(DatabaseSeeder); // TODO:: Time shortage fired here
  await databaseSeeder.seedCountries(); // TODO:: it should be fire externally via some command not here

}

bootstrap();
