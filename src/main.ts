import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseSeeder } from "./database/database.seeder";

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(process.env.NODE_APP_PORT || 3000); // from .env or default

  // IMPORTANT we can trigger it with NestFactory.createApplicationContext(SomeSeederModule) using appContext and bootstrap it from package.json scripts but in either way it get called
  // over app load once so called it here
  const databaseSeeder = app.get(DatabaseSeeder);
  await databaseSeeder.seedCountries();

}

bootstrap();
