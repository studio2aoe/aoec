const BuiltInGenerator = require('./builtin')
const NoiseGenerator = require('./noise')
const CustomGenerator = require('./custom')
const Mixer = require('./mixer')

let generatorSet = []

const init = (str = 'BBCNS') => {
  generatorSet = []
  str.split('').forEach(elem => addGenerator(elem))
  Mixer.init(generatorSet.length)
}

const addGenerator = (chr = '') => {
  switch (chr) {
    case 'B':
      generatorSet.push(new BuiltInGenerator())
      break
    case 'C':
      generatorSet.push(new CustomGenerator())
      break
    case 'N':
      generatorSet.push(new NoiseGenerator())
      break
    case 'S':
      // generatorSet.push(new Sampler())
      break
  }
}

const getVoltage = (phase) => {
  let voltageL = 0
  let voltageR = 0
  generatorSet.forEach((elem, idx) => {
    let gain = Mixer.getGain(idx)
    voltageL += ((elem.getHexSignal(phase)[0]) / 15) * gain
    voltageR += ((elem.getHexSignal(phase)[1]) / 15) * gain
  })

  return [voltageL, voltageR]
}

const send = (idx, freq, num, inv, volL, volR) => {
  generatorSet[idx].setFreq(freq)
  generatorSet[idx].setWaveform(num)
  generatorSet[idx].setInv(inv)
  generatorSet[idx].setVol(volL, volR)
}

const getGenerator = () => {
  return generatorSet
}

module.exports = {
  init: init,
  send: send,
  addGenerator: addGenerator,
  getVoltage: getVoltage,
  getGenerator: getGenerator
}
