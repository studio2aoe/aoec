/* Require */
const check = require('check-types').assert
const TrackList = require('../tracklist')

/* Alias */
const SAMPLE_RATE = 44100

/* Structure */
const SCHEDULER = {
  tempo: 125,
  period: 882,
  customfunc: (count) => null,
  executeInst: (count) => {
    if (count % (SCHEDULER.period) < 1) {
      TrackList.getList().forEach(elem => {
        elem.execute()
        elem.next()
      })
    }
  }
}

/* Private */
const calcPeriod = (tempo) => {
  const beatperiod = 60 / tempo
  const frameperiod = (beatperiod / 24) * SAMPLE_RATE
  return frameperiod
}
/* Public */
const setTempo = (tempo) => {
  check.number(tempo)
  SCHEDULER.tempo = tempo
  SCHEDULER.period = calcPeriod(SCHEDULER.tempo)
}
const getTempo = () => SCHEDULER.tempo
const getPeriod = () => SCHEDULER.period
const setFunc = func => { SCHEDULER.customfunc = func }
const execute = count => {
  SCHEDULER.customfunc(count)
  SCHEDULER.executeInst(count)
}

module.exports = {
  setTempo: setTempo,
  getTempo: getTempo,
  getPeriod: getPeriod,
  setFunc: setFunc,
  execute: execute
}
