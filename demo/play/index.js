const aoec = require('../../src')
const playOscil0 = require('./inst0')
const playOscil1 = require('./inst1')
const playCustom = require('./inst2')
const playNoise = require('./inst3')

const resetAll = () => {
  const inst = [0, 1, 2, 3].map(elem => aoec.Instrument.getInst(elem))
  inst.forEach(elem => {
    elem.setNote('---')
    elem.setVol(0, 0)
    elem.setAutomation('A', 0)
    elem.setAutomation('D', 0)
    elem.setAutomation('E', 0)
    elem.setAutomation('W', 0)
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
  }
  aoec.Processor.play()
}

module.exports = play
