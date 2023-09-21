// src/seeder/seeder.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { YourModel } from './your-model'; // Replace with your model

@Injectable()
export class SeederService {
    constructor(
        // @InjectModel(YourModel.name) private readonly yourModel: Model<YourModel>,
    ) {}

    async seedData() {
        // Your seeding logic here
        // const newData = new this.yourModel({ /* ... */ });
        // await newData.save();
    }
}
