let departureId = 0;
function generataDeparture() {
    let stationFrom = 0;
    let stationTo = 0;
    while (stationFrom == stationTo) {
        stationTo = Math.floor(Math.random() * 5);
        stationFrom = Math.floor(Math.random() * 5);
    }
    return {
        "idStationDepartures": departureId++,
        "time": `${String(Math.floor(Math.random()*25)).padStart(2,'0')}:${String(Math.floor(Math.random()*60)).padStart(2,'0')}`,
        "dow": Math.floor(Math.random()*8),
        "Providers_idProvider": Math.floor(Math.random()*3),
        "Stations_idStationDeparture":stationFrom,
        "Stations_idStationArrive":stationTo
    }
}
var departures = [];
for (let i =0; i<100; i++) {
    adepartures.push(generataDeparture());
}

console.log(JSON.stringify(departures));