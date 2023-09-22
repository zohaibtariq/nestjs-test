const { MongoMemoryServer } = require('mongodb-memory-server');
const { connection } = require('mongoose');

(async () => {
    const mongod = await MongoMemoryServer.create();
    const mongoConnection = connection;

    global.mongod = mongod;
    global.mongoConnection = mongoConnection;

})();
