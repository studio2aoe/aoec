const Processor = require('./processor')
const GeneratorSet = require('./wavegenerator')
const WaveformMemory = require('./waveform')
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
    send: GeneratorSet.send,
    sendFreq: GeneratorSet.sendFreq,
    sendNum: GeneratorSet.sendNum,
    sendInv: GeneratorSet.sendInv,
    sendVolL: GeneratorSet.sendVolL,
    sendVolR: GeneratorSet.sendVolR,
    sendMute: GeneratorSet.sendMute,
    getFreq: GeneratorSet.getFreq,
    getNum: GeneratorSet.getNum,
    getInv: GeneratorSet.getInv,
    getVolL: GeneratorSet.getVolL,
    getVolR: GeneratorSet.getVolR,
    getMute: GeneratorSet.getMute
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
