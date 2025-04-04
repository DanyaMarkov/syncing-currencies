const express = require('express');
const cron = require('node-cron');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const router = require('./routes/index');
const { performSync } = require('./dailySyncUtils');
const { fillByPeriod } = require('./fillByPeriod');

/** конфигурация ежедневного таймера */
let timerData = JSON.parse(fs.readFileSync('dailyTimerConfig.json'));
cron.schedule(`${timerData.minute} ${timerData.hour} * * *`, () => {
    performSync();
});

//Подключение механизма CORS
app.use(cors());
app.use(express.json());
app.use('/api', router);

/** Указать даты для синхронизации */
const startDate = '03.03.2025';
const endDate = '07.03.2025';

app.listen(PORT, () => {
    console.log(`Сервер работает на порте: ${PORT}`);
    // fillByPeriod(startDate, endDate);
});
