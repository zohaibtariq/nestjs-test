import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import config from './utils/config';

export default async function globalSetup() {
    if (config.Memory) {
        const instance = await MongoMemoryServer.create();
        const uri = instance.getUri();
        (global as any).__MONGOINSTANCE = instance;
        process.env.MONGODB_TEST_URI = uri.slice(0, uri.lastIndexOf('/'));
    } else {
        process.env.MONGODB_TEST_URI = `mongodb://${config.IP}:${config.Port}`;
    }
    await mongoose.connect(`${process.env.MONGODB_TEST_URI}/${config.Database}`);
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
}
