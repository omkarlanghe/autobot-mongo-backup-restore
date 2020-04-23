const schedule = require('node-schedule');
const time = require('./src/scheduler-config').Time;

/**
 * RULE TO BACKUP DATABASE
 */
let backup_rule = new schedule.RecurrenceRule();
backup_rule.dayOfWeek = new schedule.Range(0, 6);
backup_rule.hour = time.backup.hour;
backup_rule.minute = time.backup.min;
backup_rule.second = time.backup.sec;

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
restore_rule.hour = time.db_restore.hour;
restore_rule.minute = time.db_restore.min;
restore_rule.second = time.db_restore.sec;

let auto_bot_restore = schedule.scheduleJob(restore_rule, () => {
    const x = require('./src/db-restore');
    x.dbRestore();
    console.info(`restore scheduler initiated at ${new Date()}`);
});

/**
 * RULE TO RESTORE COLLECTION
 */
let coll_restore_rule = new schedule.RecurrenceRule();
coll_restore_rule.dayOfWeek = new schedule.Range(0, 6);
coll_restore_rule.hour = time.coll_restore.hour;
coll_restore_rule.minute = time.coll_restore.min;
coll_restore_rule.second = time.coll_restore.sec;

let auto_bot_coll_restore = schedule.scheduleJob(coll_restore_rule, async () => {
    const x = require('./src/collection-restore');
    await x.collectionRestore();
    console.info(`collection restore scheduler initiated at ${new Date()}`);
});

// TEST CODE
// const backup = require('./src/backup');
// backup.dbAutoBackUp();
// const x = require('./src/db-restore');
// x.dbRestore();
// (async () => {
//     const x = require('./src/collection-restore');
//     console.log(await x.collectionRestore());
// })();
