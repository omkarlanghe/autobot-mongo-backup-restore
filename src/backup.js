const fs = require('fs');
const _ = require('lodash');
const exec = require('child_process').exec;
const dbOptions = require('./mongo-config').dbOptions;

function stringToDate(dateString) {
    return new Date(dateString);
}

/* return if variable is empty or not. */
function empty(mixedVar) {
    var undef, key, i, len;
    var emptyValues = [undef, null, false, 0, '', '0'];
    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixedVar === emptyValues[i]) {
            return true;
        }
    }
    if (typeof mixedVar === 'object') {
        for (key in mixedVar) {
            return false;
        }
        return true;
    }
    return false;
};

// Auto backup script
function dbAutoBackUp() {
    try {
        // check for auto backup is enabled or disabled
        if (dbOptions.autoBackup == true) {
            let date = new Date();

            let beforeDate,
                oldBackupDir,
                oldBackupPath;


            currentDate = stringToDate(date); // Current date
            let newBackupDir = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
            let newBackupPath = dbOptions.autoBackupPath + 'mongodump-' + newBackupDir; // New backup path for current backup process
            let writeable_stream = fs.createWriteStream(`${dbOptions.logFilePath}mongodump-${newBackupDir}\\backup-logs.txt`).setDefaultEncoding('utf8');

            // check for remove old backup after keeping # of days given in configuration
            if (dbOptions.removeOldBackup == true) {
                beforeDate = _.clone(currentDate);
                beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup); // Substract number of days to keep backup and remove old backup
                oldBackupDir = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
                oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir; // old backup(after keeping # of days)
            }
            let cmd = 'mongodump --host ' + dbOptions.host + ' --port ' + dbOptions.port + ' --db ' + dbOptions.database + ' --out ' + newBackupPath; // Command for mongodb dump process
            exec(cmd, async function (error, stdout, stderr) {
                if (empty(error)) {
                    // check for remove old backup after keeping # of days given in configuration
                    if (dbOptions.removeOldBackup == true) {
                        if (fs.existsSync(oldBackupPath)) {
                            exec("rm -rf " + oldBackupPath, function (err) { });
                        }
                    }
                }

                for await (const chunk of stderr) {
                    writeable_stream.write(chunk);
                }
                //console.log(stderr);
                //console.log(stdout);
            });
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = { dbAutoBackUp }
