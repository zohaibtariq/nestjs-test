import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseSeeder } from "./database.seeder";
import { CountriesModule } from "../countries/countries.module";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: process.env.MONGODB_URI,
            }),
        }),
        CountriesModule
    ],
    providers: [
        DatabaseSeeder,
    ]
})
export class DatabaseModule {}
