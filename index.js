var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = new schedule.Range(0, 6);
rule.hour = 09;
rule.minute = 00;
rule.second = 00;

var auto_bot = schedule.scheduleJob(rule, function () {
    const backup = require('./src/backup');
    backup.dbAutoBackUp();
});
