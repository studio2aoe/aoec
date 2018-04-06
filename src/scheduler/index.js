/* Require */
const check = require('check-types').assert

/* Alias */
const SAMPLE_RATE = 44100

/* Structure */
const SCHEDULER = {
  tempo: 125,
  period: 0.02,
  count: 0,
  customfunc: (count) => null
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
  if (tempo < 30) SCHEDULER.tempo = 30
  if (tempo > 255) SCHEDULER.tempo = 255
  SCHEDULER.period = calcPeriod(SCHEDULER.tempo)
  SCHEDULER.count = 0
}
const getTempo = () => SCHEDULER.tempo
const getPeriod = () => SCHEDULER.period
const setFunc = func => { SCHEDULER.customfunc = func }
const execute = count => { SCHEDULER.customfunc(count) }

module.exports = {
  setTempo: setTempo,
  getTempo: getTempo,
  getPeriod: getPeriod,
  setFunc: setFunc,
  execute: execute
}
