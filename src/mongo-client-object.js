const mongo = require('mongodb').MongoClient;
const mongo_config = require('./mongo-config');
const mongo_url = mongo_config.database.url;
let mongo_client;

/**
 * 
 * @param {*} p_database
 * getMongoClient() creates a mongo db instance, which is shared by all the function's 
 */
async function getMongoClient(p_database) {
    if (mongo_client != undefined) {
        delete mongo_client; //remove reference of the object
        mongo_client = undefined; //make it undefined to create another instance
        if (!mongo_client) {
            mongo_client = { db: null, client: null };
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
                    mongo_client.db = client.db(p_database);
                    mongo_client.client = client;
                    resolve(mongo_client);
                });
            });
        } else {
            return mongo_client;
        }
    } else {
        if (!mongo_client) {
            mongo_client = { db: null, client: null };
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
                    mongo_client.db = client.db(p_database);
                    mongo_client.client = client;
                    resolve(mongo_client);
                });
            });
        } else {
            return mongo_client;
        }
    }
};

module.exports.dbClient = async (database_name) => {
    let database = await getMongoClient(database_name);
    return database;
};
