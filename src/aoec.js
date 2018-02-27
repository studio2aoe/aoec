const GeneratorSet = require('./generatorset')
const WaveMemory = require('./wavememory')
const Mixer = require('./mixer')
const Scheduler = require('./scheduler')

let master
let processor

const init = (audioContext, buffsize = 4096, generatorString = 'BBCNS') => {
  generatorInit(generatorString)
  master = audioContext.createGain()
  master.connect(audioContext.destination)
  processor = audioContext.createScriptProcessor(buffsize, 2, 2)
  processor.connect(master)
}

const generatorInit = (generatorString = 'BBCNS') => {
  if (!(processor === undefined)) disconnect()
  GeneratorSet.init(generatorString)
}

const setMasterVolume = (vol) => {
  master.gain.setValueAtTime(vol, master.context.currentTime)
}

const connect = () => {
  let clock = 0
  let buffsize = processor.bufferSize
  processor.onaudioprocess = (audioEvent) => {
    let output = [
      audioEvent.outputBuffer.getChannelData(0),
      audioEvent.outputBuffer.getChannelData(1)
    ]
    for (let i = 0; i < buffsize; i++) {
      let value = GeneratorSet.getVoltage(clock)
      output[0][i] = value[0]
      output[1][i] = value[1]
      Scheduler.execute(clock)
      clock++
    }
  }
}

const disconnect = () => {
  let buffsize = processor.bufferSize
  processor.onaudioprocess = (audioEvent) => {
    let output = [
      audioEvent.outputBuffer.getChannelData(0),
      audioEvent.outputBuffer.getChannelData(1)
    ]
    for (let i = 0; i < buffsize; i++) {
      output[0][i] = 0.0
      output[1][i] = 0.0
    }
  }
}

module.exports = {
  /* Aoec functions */
  init: init,
  setMasterVolume: setMasterVolume,
  connect: connect,
  disconnect: disconnect,

  /* Sub namespace */
  GeneratorSet: {
    init: generatorInit,
    send: GeneratorSet.send,
    setMute: GeneratorSet.setMute
  },
  WaveMemory: WaveMemory,
  Mixer: {
    reset: Mixer.reset,
    getGain: Mixer.getGain,
    setGain: Mixer.setGain,
    setDecibel: Mixer.setDecibel
  },
  Scheduler: Scheduler
}
