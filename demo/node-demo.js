const aoec = require('../src/index.js')
const WebAudioAPI = require('web-audio-api')
const Speaker = require('speaker')

const AUDIO_CONTEXT = new WebAudioAPI.AudioContext()
AUDIO_CONTEXT.outStream = new Speaker({
  channels: AUDIO_CONTEXT.format.numberOfChannels,
  bitDepth: AUDIO_CONTEXT.format.bitDepth,
  sampleRate: AUDIO_CONTEXT.sampleRate
})

/* Setup Master */
const master = AUDIO_CONTEXT.createGain()
master.connect(AUDIO_CONTEXT.destination)
master.gain.setValueAtTime(0.5, master.context.currentTime)

/* Setup AOEC Processor */
aoec.Processor.init(AUDIO_CONTEXT, 4096)
aoec.Processor.connect(master)

/* Setup Waveform generator */
aoec.WaveGenerator.init('OOCN')
aoec.OscillatorMemory.init()
aoec.WaveformMemory.init()


const tempo = 120
const beatperiod = 60 / tempo
const frameperiod = (beatperiod / 24) * 44100
let fcount = 0
const gen0 = aoec.WaveGenerator.list()[0]
gen0.setFreq(440)
gen0.setWaveform(48)
gen0.setInv(false)
gen0.setVolL(15)
gen0.setVolR(15)
aoec.Scheduler.setFunc((clock) => {
  if (clock % frameperiod < 1) {
    if (fcount % 3 === 0) gen0.setFreq(440)
    else if (fcount % 3 === 1) gen0.setFreq(660)
    else if (fcount % 3 === 2) gen0.setFreq(880)
    fcount++
  }
})

/* Play */
aoec.Processor.play()
