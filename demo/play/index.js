const aoec = require('../../src')
const playOscil0 = require('./inst0')
const playOscil1 = require('./inst1')
const playCustom = require('./inst2')
const playNoise = require('./inst3')
const playPreset = require('./preset')
const playQuick = require('./setquick')

const resetAll = () => {
  const inst = [0, 1, 2, 3].map(elem => aoec.Instrument.getInst(elem))
  inst.forEach(elem => {
    elem.setNote('---')
    elem.setVol(0, 0)
    elem.setA(0)
    elem.setD(0)
    elem.setE(0)
    elem.setW(0)
    elem.setBank(0)
  })
}

const play = (num) => {
  aoec.Processor.stop()
  resetAll()
  switch (num) {
    case 0:
      playOscil0()
      break
    case 1:
      playOscil1()
      break
    case 2:
      playCustom()
      break
    case 3:
      playNoise()
      break
    case 4:
      playPreset()
      break
    case 5:
      playQuick()
  }
  aoec.Processor.play()
}

module.exports = play
