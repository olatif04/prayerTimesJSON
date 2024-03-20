const { Coordinates, CalculationMethod, PrayerTimes } = require('adhan')
const moment = require('moment-timezone');
const fs = require('fs');

const year = 8029; 
const coordinates = new Coordinates(42.27741197126971, -83.03208231925966);
const params = CalculationMethod.MoonsightingCommittee();

let prayerTimesForYear = [];

for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= moment({ year: year, month: month }).daysInMonth(); day++) {
        let date = new Date(year, month, day);
        let prayerTimes = new PrayerTimes(coordinates, date, params);

        let entry = {
            "Date": moment(date).format('D-MMM-YY'), 
            "Fajr": moment(prayerTimes.fajr).tz('America/Toronto').format('h:mm'),
            "Sunrise": moment(prayerTimes.sunrise).tz('America/Toronto').format('h:mm'),
            "Dhuhr": moment(prayerTimes.dhuhr).tz('America/Toronto').format('h:mm'),
            "Asr": moment(prayerTimes.asr).tz('America/Toronto').format('h:mm'),
            "Maghrib": moment(prayerTimes.maghrib).tz('America/Toronto').format('h:mm'),
            "Isha": moment(prayerTimes.isha).tz('America/Toronto').format('h:mm')
        };

        prayerTimesForYear.push(entry);
    }
}

const prayerTimesJson = JSON.stringify(prayerTimesForYear, null, 2);

fs.writeFile(`prayerTimesForYear${year}.json`, prayerTimesJson, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log(`Prayer times for the entire year saved to prayerTimesForYear${year}.json`);
  }
});
