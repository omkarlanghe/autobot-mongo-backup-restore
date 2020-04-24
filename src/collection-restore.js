const mongo_util = require('./mongo-client-object');
const mongo_config = require('./mongo-config');
const fs = require('fs');
const exec = require('child_process').exec;

/**
 * FUNCTION TO DROP PREVIOUSLY RESTORED COLLECTIONS TO RESTORE THEM BACK WHEN TRIGGERED
 */
async function dropCollections() {
    try {
        let dropped_collection_stats = [];
        for await (const name of mongo_config.collectionRestoreOptions.database) {
            try {
                let mongo_client = await mongo_util.dbClient(name);
                for await (const coll_name of mongo_config.collectionRestoreOptions.collections) {
                    try {
                        let x = await mongo_client.collection(coll_name).drop();
                        if (x) { dropped_collection_stats.push({ db: name, collection: coll_name, drop_status: true }); }
                    } catch (error) {

                    }
                }
                await mongo_client.close();
            } catch (error) {
                console.error(error);
            }
        }
        return (dropped_collection_stats);
    } catch (error) {
        console.error(error);
    }
};

/**
 * FUNCTION WHICH RESTORES COLLECTION
 */
async function collectionRestore() {
    try {
        if (mongo_config.collectionRestoreOptions.drop === true) {
            let result = await dropCollections();
            if (result.length != 0) {
                for await (const dbName of mongo_config.collectionRestoreOptions.database) {
                    let writeable_stream = fs.createWriteStream(`${mongo_config.collectionRestoreOptions.logFilePath}\\${mongo_config.collectionRestoreOptions.logFileName}`).setDefaultEncoding('utf8');
                    for await (const index of result) {
                        let cmd = `mongorestore.exe --db ${dbName} ${mongo_config.collectionRestoreOptions.sourcePath}\\dump\\${mongo_config.dbBackupOptions.database}\\${index.collection}.bson`;
                        exec(cmd, async (error, stdout, stderr) => {
                            for await (const chunks of stderr) {
                                writeable_stream.write(chunks);
                            }
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = { collectionRestore };
