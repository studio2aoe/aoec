const aoec = require('../../src')

const testInst1 = () => {
  const inst1 = aoec.Instrument.getInst(1)
  inst1.setNote('E 4')
  inst1.setVol(15, 15)
  inst1.setAutomation('W', 1)
  inst1.setAutomation('A', 1)
  inst1.setAutomation('E', 0)
}

module.exports = testInst1
