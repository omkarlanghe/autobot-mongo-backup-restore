const schedule = require('node-schedule');

/**
 * RULE TO BACKUP DATABASE
 */
let backup_rule = new schedule.RecurrenceRule();
backup_rule.dayOfWeek = new schedule.Range(0, 6);
backup_rule.hour = 11;
backup_rule.minute = 20;
backup_rule.second = 00;

let auto_bot_backup = schedule.scheduleJob(backup_rule, () => {
    const backup = require('./src/db-backup');
    backup.dbAutoBackUp();
    console.info(`backup scheduler initiated at ${new Date()}`);
});

/**
 * RULE TO RESTORE DATABASE
 */
let restore_rule = new schedule.RecurrenceRule();
restore_rule.dayOfWeek = new schedule.Range(0, 6);
restore_rule.hour = 11;
restore_rule.minute = 25;
restore_rule.second = 00;

let auto_bot_restore = schedule.scheduleJob(restore_rule, () => {
    const x = require('./src/db-restore');
    x.dbRestore();
    console.info(`restore scheduler initiated at ${new Date()}`);
});

// const backup = require('./src/backup');
// backup.dbAutoBackUp();
// const x = require('./src/db-restore');
// x.dbRestore();