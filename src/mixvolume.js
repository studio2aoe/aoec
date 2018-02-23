const TABLE_SIZE = 16
const TABLE = new Array(TABLE_SIZE)

for (let i = 0; i < TABLE_SIZE; i++) {
  TABLE[i] = new Uint8Array(TABLE_SIZE)
  for (let j = 0; j < TABLE_SIZE; j++) {
    if (i === 0 || j === 0) TABLE[i][j] = 0
    else {
      const __mixed = Math.floor(i * j / 15)
      TABLE[i][j] = (__mixed > 1) ? __mixed : 1
    }
  }
}

module.exports = (volumeA, volumeB) => { return TABLE[volumeA][volumeB] }
