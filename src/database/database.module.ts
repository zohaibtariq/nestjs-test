import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseSeeder } from "./database.seeder";
import { CountriesModule } from "../countries/countries.module";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => {
                return {
                    uri: process.env.MONGODB_URI,
                }
            },
            inject: [ConfigService],
        }),
        CountriesModule
    ],
    providers: [
        DatabaseSeeder,
    ]
})
export class DatabaseModule {}
