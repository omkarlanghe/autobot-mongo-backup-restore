const dbOptions = {
    host: 'localhost',
    port: 27017,
    database: '<database_name>',
    autoBackup: true,
    removeOldBackup: true,
    keepLastDaysBackup: 1,
    autoBackupPath: '<backup path>',
    logFilePath: '<logfile path>'
};

module.exports = { dbOptions };