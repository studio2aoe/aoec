const Aoec = require('../dist/aoec.bundle')
const WebAudioAPI = require('web-audio-api')
const Speaker = require('speaker')

const AUDIO_CONTEXT = new WebAudioAPI.AudioContext()
AUDIO_CONTEXT.outStream = new Speaker({
  channels: AUDIO_CONTEXT.format.numberOfChannels,
  bitDepth: AUDIO_CONTEXT.format.bitDepth,
  sampleRate: AUDIO_CONTEXT.sampleRate
})

Aoec.init(AUDIO_CONTEXT, 4096, 'BBCNS')
Aoec.setMasterVolume(0.5)

Aoec.connect()