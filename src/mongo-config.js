const path = require('path');

const dbBackupOptions = {
    host: 'localhost',
    port: 27017,
    database: 'ems_db',
    autoBackup: true,
    removeOldBackup: true,
    keepLastDaysBackup: 1,
    logFileName: 'backup-logs.txt',
    autoBackupPath: path.resolve('/EMS/Version-3/New_Repos/autobot-mongo-backup-restore/backup'),
    logFilePath: path.resolve('/EMS/Version-3/New_Repos/autobot-mongo-backup-restore/backup')
};

// database connection string
const database = {
    url: 'mongodb://127.0.0.1:27017/',
    name: ['ems_db_dev', 'ems_db_test']
}

const dbRestoreOptions = {
    host: 'localhost',
    port: 27017,
    logFileName: 'restore-logs.txt',
    sourcePath: path.resolve('/EMS/Version-3/New_Repos/autobot-mongo-backup-restore/backup'),
    logFilePath: path.resolve('/EMS/Version-3/New_Repos/autobot-mongo-backup-restore/backup'),
    drop: true
}

module.exports = { dbBackupOptions, database, dbRestoreOptions };