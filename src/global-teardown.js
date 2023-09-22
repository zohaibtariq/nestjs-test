export default async function () {
    if (global.mongoConnection) {
        // Drop the database and close the connection
        await global.mongoConnection.dropDatabase();
        await global.mongoConnection.close();
    }
    if (global.mongod) {
        // Stop the MongoDB memory server
        await global.mongod.stop();
    }
}