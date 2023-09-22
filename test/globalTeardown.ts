import config from './utils/config';
import { MongoMemoryServer } from 'mongodb-memory-server';

export default async function globalTeardown(globalConfig, projectConfig) {
    if (config.Memory) {
        const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
        await instance.stop();
    }
}
