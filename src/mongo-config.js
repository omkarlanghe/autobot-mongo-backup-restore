const path = require('path');

/**
 * MODIFY BELOW CONFIGURATIONS LIKE DATABASE NAMES, COLLECTIONS NAMES, PATHS, ETC AS PER YOUR OS ENVIRONMENT
 */
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
};

const dbRestoreOptions = {
    host: 'localhost',
    port: 27017,
    logFileName: 'restore-logs.txt',
    sourcePath: path.resolve('/EMS/Version-3/New_Repos/autobot-mongo-backup-restore/backup'),
    logFilePath: path.resolve('/EMS/Version-3/New_Repos/autobot-mongo-backup-restore/backup'),
    drop: true
};

const collectionRestoreOptions = {
    host: 'localhost',
    port: 27017,
    logFileName: 'collection-restore-logs.txt',
    sourcePath: path.resolve('/EMS/Version-3/New_Repos/autobot-mongo-backup-restore/backup'),
    logFilePath: path.resolve('/EMS/Version-3/New_Repos/autobot-mongo-backup-restore/backup'),
    database: ['demo_ems_db'],
    collections: [
        'energyMeterDailyValues',
        'energyMeterMonthlyValues',
        'energyMeterMDValues',
        'energyMeterMonthlyMDValues',
        'energyMeterValues',
        'abc'
    ],
    drop: true
};

module.exports = { 
    dbBackupOptions, 
    database, 
    dbRestoreOptions, 
    collectionRestoreOptions 
};
