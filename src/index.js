const Processor = require('./processor.js')
const GeneratorSet = require('./generatorSet')
const WaveformMemory = require('./waveformMemory')
const Mixer = require('./mixer')
const Scheduler = require('./scheduler')

module.exports = {
  Processor: {
    init: Processor.init,
    connect: Processor.connect,
    disconnect: Processor.disconnect,
    play: Processor.play,
    stop: Processor.stop
  },
  GeneratorSet: {
    init: GeneratorSet.init,
    send: GeneratorSet.send
  },
  WaveformMemory: {
    write: WaveformMemory.write,
    read: WaveformMemory.read,
    setLock: WaveformMemory.setLock,
    isLock: WaveformMemory.isLock
  },
  Mixer: {
    reset: Mixer.reset,
    getGain: Mixer.getGain,
    setGain: Mixer.setGain,
    setDecibel: Mixer.setDecibel
  },
  Scheduler: {
    setFunc: Scheduler.setFunc
  }
}
