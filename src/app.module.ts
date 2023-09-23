import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './environment.validation';
import { FilmsModule } from './films/films.module';
import { CountriesModule } from './countries/countries.module';
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true, // should be available globally in our case
      envFilePath: '.env', // since we have .env
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
    // MigrationModule,
    // SeederModule,
    FilmsModule,
    CountriesModule,
    DatabaseModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
