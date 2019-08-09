const aoec = require('../../src')

const testInst1 = () => {
  const inst1 = aoec.TrackList.getTrack(1)
  inst1.setNote('E 4')
  inst1.setVol(15, 15)
  inst1.setW(1)
  inst1.setA(1)
  inst1.setE(0)
}

module.exports = testInst1
