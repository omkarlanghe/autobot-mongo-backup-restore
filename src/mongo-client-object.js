const mongo = require('mongodb').MongoClient;
const mongo_config = require('./mongo-config');
const mongo_url = mongo_config.database.url;
const database_name = 'xxxxxxxxxxx';
let mongo_client;

/**
 * 
 * @param {*} p_database
 * getMongoClient() creates a mongo db instance, which is shared by all the function's 
 */
function getMongoClient(p_database) {
    if (!mongo_client) {
        return new Promise((resolve, reject) => {
            mongo.connect(mongo_url, {
                useNewUrlParser: true,
                poolSize: 200,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1000,
                keepAlive: 300000,
                autoReconnect: true
            }, async function (err, client) {
                if (err) {
                    return reject(err);
                }
                mongo_client = client.db(p_database);
                resolve(mongo_client);
            });
        });
    } else {
        return mongo_client;
    }
};

module.exports.dbClient = async () => {
    let database = await getMongoClient(database_name);
    return database;
}
