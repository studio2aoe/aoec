const Aoec = require('../dist/aoec.bundle')
const WebAudioAPI = require('web-audio-api')
const Speaker = require('speaker')

const AUDIO_CONTEXT = new WebAudioAPI.AudioContext()
AUDIO_CONTEXT.outStream = new Speaker({
  channels: AUDIO_CONTEXT.format.numberOfChannels,
  bitDepth: AUDIO_CONTEXT.format.bitDepth,
  sampleRate: AUDIO_CONTEXT.sampleRate
})

Aoec.init(AUDIO_CONTEXT, 4096)
Aoec.setMasterVolume(0.5)

Aoec.WaveMemory.write(1, 'FFFFFFFFFFFFFFFF0000000000000000')
Aoec.GeneratorSet.send(0, 165, 2, 0, 15, 15)
Aoec.GeneratorSet.send(1, 220, 2, 0, 15, 15)
Aoec.GeneratorSet.send(2, 55, 1, 0, 15, 15)
Aoec.GeneratorSet.send(3, 8800, 0, 0, 15, 15)