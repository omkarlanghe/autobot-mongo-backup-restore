const mongo_util = require('./mongo-client-object');
const mongo_config = require('./mongo-config');
const exec = require('child_process').exec;
const fs = require('fs');

async function dropDatabase() {
    try {
        let mongo_client = await mongo_util.dbClient();
        let isDropped = false;

        return (new Promise(async (resolve) => {
            for await (const name of mongo_config.database.name) {
                mongo_client.s.databaseName = name;
                isDropped = await mongo_client.dropDatabase();
            }
            resolve(isDropped);
        }).catch(reject => {
            reject(false);
        }));
    } catch (error) {
        console.error(error);
    }
}

async function dbRestore() {
    try {
        if (mongo_config.dbRestoreOptions.drop === true) {
            let x = await dropDatabase();
            if (x === true) {
                let writeable_stream = fs.createWriteStream(`${mongo_config.dbRestoreOptions.logFilePath}\\restore-logs.txt`).setDefaultEncoding('utf8');
                for await (const destination_database of mongo_config.database.name) {
                    let cmd = `mongorestore.exe --host ${mongo_config.dbRestoreOptions.host} --port ${mongo_config.dbRestoreOptions.port} --db ${destination_database}  ${mongo_config.dbRestoreOptions.sourcePath}\\mongodump-2020-4-22\\${mongo_config.dbBackupOptions.database}`;
                    exec(cmd, async (error, stdout, stderr) => {
                        for await(const chunks of stderr) {
                            writeable_stream.write(chunks);
                        }
                    });
                }
            }
        }


    } catch (error) {
        console.error(error);
    }
}

module.exports = { dropDatabase, dbRestore }
