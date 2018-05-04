
/* Require */

const aoec = require('../src')
const setupMemory = require('./setup-memory')
const playInst = require('./play')

/* Setup */
const AUDIO_CONTEXT = new window.AudioContext()

const master = AUDIO_CONTEXT.createGain()

master.connect(AUDIO_CONTEXT.destination)
master.gain.setValueAtTime(0.5, master.context.currentTime)

aoec.Processor.init(AUDIO_CONTEXT, 4096)
aoec.Processor.connect(master)

setupMemory()

aoec.Instrument.init('OOWN')
aoec.Scheduler.setTempo(30)

module.exports = {
  playInst: playInst
}
