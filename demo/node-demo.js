const Aoec = require('../dist/aoec.bundle').Aoec
const AudioContext = require('web-audio-api').AudioContext
const Speaker = require('speaker')

const AUDIO_CTX = new AudioContext

AUDIO_CTX.outStream = new Speaker({
  channels: AUDIO_CTX.format.numberOfChannels,
  bitDepth: AUDIO_CTX.format.bitDepth,
  sampleRate: AUDIO_CTX.sampleRate
})

const aoec = new Aoec('BBCNS', 4096, AUDIO_CTX)

aoec.sendGenerator(0, 440, 5, 0, 0xF, 0xF)
aoec.sendGenerator(1, 660, 5, 0, 0xF, 0xF)
aoec.sendGenerator(2, 880, 5, 0, 0xF, 0xF)
aoec.generator[2].__wave.write(5, '0123456789ABCDEFFEDCBA9876543210')

aoec.connect()