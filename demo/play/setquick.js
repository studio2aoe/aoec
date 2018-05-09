const aoec = require('../../src')

const testquick = () => {
  const inst0 = aoec.Instrument.getInst(0)
  inst0.setNote('C 4')
  inst0.setVol(15, 15)
  inst0.setQuickW({
    list: [16],
    loopstart: -1,
    loopend: -1
  })
  inst0.setQuickA({
    list: [0, 7, 10],
    loopstart: 0,
    loopend: 2
  })
  inst0.setQuickE({
    list: [0xFF, 0xEE, 0xDD, 0xCC,
      0xBB, 0xAA, 0x99, 0x88,
      0x77, 0x66, 0x55, 0x44,
      0x33, 0x22, 0x11, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00],
    loopstart: 0,
    loopend: 23
  })
}

module.exports = testquick
