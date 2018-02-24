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
aoec.setMasterVolume(0.5)

const pulseKick = {
  isLoop: true,
  frameList: [
    [220, 4, 0, 12, 12], [165, 4, 0, 12, 12], [139, 4, 0, 12, 12], [110, 4, 0, 12, 12], [83, 4, 0, 12, 12], [55, 4, 0, 12, 12],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [220, 4, 0, 12, 12], [165, 4, 0, 12, 12], [139, 4, 0, 12, 12], [110, 4, 0, 12, 12], [83, 4, 0, 12, 12], [55, 4, 0, 12, 12],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [220, 4, 0, 12, 12], [165, 4, 0, 12, 12], [139, 4, 0, 12, 12], [110, 4, 0, 12, 12], [83, 4, 0, 12, 12], [55, 4, 0, 12, 12],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]
  ]
}

const noiseBeat = {
  isLoop: true,
  frameList: [
    [22050, 0, 0, 15, 15],
    [22050, 0, 0, 12, 12],
    [22050, 0, 0, 9, 9],
    [22050, 0, 0, 6, 6],
    [22050, 0, 0, 4, 4],
    [22050, 0, 0, 2, 2],
    [22050, 0, 0, 15, 15],
    [22050, 0, 0, 12, 12],
    [22050, 0, 0, 9, 9],
    [22050, 0, 0, 6, 6],
    [22050, 0, 0, 4, 4],
    [22050, 0, 0, 2, 2],
    [22050, 0, 0, 15, 15],
    [22050, 0, 0, 15, 15],
    [22050, 0, 0, 15, 15],
    [22050, 0, 0, 15, 15],
    [22050, 0, 0, 12, 12],
    [22050, 0, 0, 9, 9],
    [22050, 0, 0, 15, 15],
    [22050, 0, 0, 12, 12],
    [22050, 0, 0, 9, 9],
    [22050, 0, 0, 6, 6],
    [22050, 0, 0, 4, 4],
    [22050, 0, 0, 2, 2],
    [7000, 0, 0, 15, 15],
    [7000, 0, 0, 15, 15],
    [7000, 0, 0, 15, 15],
    [7000, 0, 0, 15, 15],
    [7000, 0, 0, 12, 12],
    [7000, 0, 0, 9, 9],
    [22050, 0, 0, 15, 15],
    [22050, 0, 0, 15, 15],
    [22050, 0, 0, 15, 15],
    [22050, 0, 0, 15, 15],
    [22050, 0, 0, 12, 12],
    [22050, 0, 0, 9, 9],
    [22050, 0, 0, 15, 15],
    [22050, 0, 0, 12, 12],
    [22050, 0, 0, 9, 9],
    [22050, 0, 0, 6, 6],
    [22050, 0, 0, 4, 4],
    [22050, 0, 0, 2, 2],
    [22050, 0, 0, 15, 15],
    [22050, 0, 0, 12, 12],
    [22050, 0, 0, 9, 9],
    [22050, 0, 0, 6, 6],
    [22050, 0, 0, 4, 4],
    [22050, 0, 0, 2, 2]
  ]
}
aoec.WaveMemory.write(0, 'FFFFFFFF0000F0000000000000000000')
const waveBass = {
  isLoop: true,
  frameList: [
    [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15],
    [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15],
    [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15],
    [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15],
    [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15],
    [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15],
    [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15],
    [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15],
    [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15],
    [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15],
    [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15],
    [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15], [55, 0, 0, 15, 15],
    [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15],
    [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15], [110, 0, 0, 15, 15],
  ]
}

aoec.generator[3].setStep(noiseBeat)
aoec.generator[1].setStep(pulseKick)
aoec.generator[2].setStep(waveBass)

aoec.connect()