import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './environment.validation';
import { MigrationModule } from './migration/migration.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true // should be available globally in our case
      // envFilePath: '.dev.env', // since we have .env
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    MigrationModule,
    SeederModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
