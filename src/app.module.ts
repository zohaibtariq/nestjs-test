import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './environment.validation';
import { FilmsModule } from './films/films.module';
import { CountriesModule } from './countries/countries.module';
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { SearchModule } from './search/search.module';
import { DatabaseTestingModule } from "./database/database-testing.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true, // IMPORTANT:  should be available globally in our case
      envFilePath: '.env', // IMPORTANT: since we have .env
    }),
    process.env.NODE_ENV === 'test' ? DatabaseTestingModule : DatabaseModule,
    AuthModule,
    UsersModule,
    FilmsModule,
    CountriesModule,
    DatabaseModule,
    SearchModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
