/* Require */
const aoec = require('../src')
const setupMemory = require('./setup-memory')
const playInst = require('./play')

let audioContext
let master

const init = () => {
  audioContext = new window.AudioContext()
  master = audioContext.createGain()

  master.connect(audioContext.destination)
  master.gain.setValueAtTime(0.5, master.context.currentTime)

  aoec.Processor.init(audioContext, 4096)
  aoec.Processor.connect(master)

  setupMemory()

  aoec.Instrument.init('OOWN')
  aoec.Scheduler.setTempo(30)
}

module.exports = {
  init: init,
  playInst: playInst
}
