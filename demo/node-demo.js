const Aoec = require('../dist/aoec.bundle')
const WebAudioAPI = require('web-audio-api')
const Speaker = require('speaker')

const AUDIO_CONTEXT = new WebAudioAPI.AudioContext()

AUDIO_CONTEXT.outStream = new Speaker({
  channels: AUDIO_CONTEXT.format.numberOfChannels,
  bitDepth: AUDIO_CONTEXT.format.bitDepth,
  sampleRate: AUDIO_CONTEXT.sampleRate
})

const aoec = new Aoec(AUDIO_CONTEXT, 4096, 'BBCNS')

aoec.sendGenerator(0, 440, 5, 0, 0xF, 0xF)
aoec.sendGenerator(1, 660, 5, 0, 0xF, 0xF)
aoec.sendGenerator(2, 880, 5, 0, 0xF, 0xF)
aoec.generator[2].__wave.write(5, '0123456789ABCDEFFEDCBA9876543210')

aoec.connect()