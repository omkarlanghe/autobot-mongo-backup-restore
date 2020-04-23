const path = require('path');

const dbBackupOptions = {
    host: 'localhost',
    port: 27017,
    database: 'db-name-parent',
    autoBackup: true,
    removeOldBackup: true,
    keepLastDaysBackup: 1,
    logFileName: 'backup-logs.txt',
    autoBackupPath: path.resolve('your_path'),
    logFilePath: path.resolve('your_path')
};

// database connection string
const database = {
    url: 'mongodb://127.0.0.1:27017/',
    name: ['db-name1', 'db-name2']
}

const dbRestoreOptions = {
    host: 'localhost',
    port: 27017,
    logFileName: 'restore-logs.txt',
    sourcePath: path.resolve('your_path'),
    logFilePath: path.resolve('your_path'),
    drop: true
}

const collectionRestoreOptions = {
    host: 'localhost',
    port: 27017,
    logFileName: 'collection-restore-logs.txt',
    sourcePath: path.resolve('your_path'),
    logFilePath: path.resolve('your_path'),
    database: ['db-name'],
    collections: [
        'collection-name 1',
        'collection-name 2',
        'collection-name 3',
        'collection-name 4',
        'collection-name 5',
        'abc'
    ],
    drop: true
}

module.exports = { 
    dbBackupOptions, 
    database, 
    dbRestoreOptions, 
    collectionRestoreOptions 
};
