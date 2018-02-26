const TABLE_SIZE = 16
const TABLE = new Array(TABLE_SIZE)

for (let signal = 0; signal < TABLE_SIZE; signal++) {
  TABLE[signal] = new Uint8Array(TABLE_SIZE)
  for (let amp = 0; amp < TABLE_SIZE; amp++) {
    if (signal === 0 || amp === 0) TABLE[signal][amp] = 0
    else {
      let value = Math.floor(signal * amp / 15)
      value = (value > 1) ? value : 1
      value += Math.floor((16 - amp) / 2)
      TABLE[signal][amp] = value
    }
  }
}

module.exports = (signal, amp) => { return TABLE[signal][amp] }
