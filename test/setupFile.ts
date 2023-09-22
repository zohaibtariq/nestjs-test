import mongoose from 'mongoose';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI as string);
});

afterAll(async () => {
    await mongoose.disconnect();
});
