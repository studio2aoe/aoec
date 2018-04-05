const Processor = require('./processor')
const GeneratorSet = require('./wavegenerator')
const WaveformMemory = require('./waveform').Memory
const OscillatorMemory = require('./oscil').Memory
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
    getMute: GeneratorSet.getMute,
    getString: GeneratorSet.getString
  },
  WaveformMemory: {
    write: WaveformMemory.write,
    read: WaveformMemory.read,
    init: WaveformMemory.init
  },
  OscillatorMemory: {
    write: OscillatorMemory.write,
    read: OscillatorMemory.read,
    init: OscillatorMemory.init
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
