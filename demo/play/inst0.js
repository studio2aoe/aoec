const aoec = require('../../src')

const testInst0 = () => {
  const inst0 = aoec.Instrument.getInst(0)
  inst0.setNote('A 4')
  inst0.setVol(15, 15)
  inst0.setAutomation('W', 1)
  inst0.setAutomation('A', 1)
  inst0.setAutomation('E', 0)
}

module.exports = testInst0
