const mongo_util = require('./mongo-client-object');
const mongo_config = require('./mongo-config');
const exec = require('child_process').exec;
const fs = require('fs');

// FUNCTION TO DROP ALL PREVIOUSLY RESTORED DATABASE BEFORE RESTORING AGAIN
async function dropDatabase() {
    try {
        let isDropped = false;
        for (let i = 0; i < mongo_config.database.name.length; i++) {
            let mongo_client = await mongo_util.dbClient(mongo_config.database.name[i]);
            isDropped = await mongo_client.db.dropDatabase();
            await mongo_client.client.close();
        }
        return(isDropped);
    } catch (error) {
        console.error(error);
    }
};

// FUNCTION WHICH RESTORE DATABASE
async function dbRestore() {
    try {
        if (mongo_config.dbRestoreOptions.drop === true) {
            let x = await dropDatabase();
            if (x === true) {
                let writeable_stream = fs.createWriteStream(`${mongo_config.dbRestoreOptions.logFilePath}\\${mongo_config.dbRestoreOptions.logFileName}`).setDefaultEncoding('utf8');
                for await (const destination_database of mongo_config.database.name) {
                    let cmd = `mongorestore.exe --host ${mongo_config.dbRestoreOptions.host} --port ${mongo_config.dbRestoreOptions.port} --db ${destination_database}  ${mongo_config.dbRestoreOptions.sourcePath}\\dump\\${mongo_config.dbBackupOptions.database}`;
                    exec(cmd, async (error, stdout, stderr) => {
                        for await (const chunks of stderr) {
                            writeable_stream.write(chunks);
                        }
                    });
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = { dropDatabase, dbRestore };
