let volumeTableInstance = null
const TABLE_SIZE = 16
const TABLE = new Array(TABLE_SIZE)

/**
 * @desc NES style volume mixing table.
 */
class VolumeTable {
  constructor () {
    if (volumeTableInstance === null) volumeTableInstance = this
    for (let i = 0; i < TABLE_SIZE; i++) {
      TABLE[i] = new Uint8Array(TABLE_SIZE)
      for (let j = 0; j < TABLE_SIZE; j++) {
        if (i === 0 || j === 0) TABLE[i][j] = 0
        else if (i >= 16) TABLE[i][j] = TABLE[15][j]
        else if (j >= 16) TABLE[i][j] = TABLE[i][15]
        else {
          const __mixed = Math.floor(i * j / 15)
          TABLE[i][j] = (__mixed > 1) ? __mixed : 1
        }
      }
    }
    return volumeTableInstance
  }
  /**
   * @public
   * Get mixed value from 2 volume value
   * @param {Number} volumeA Volume value (0 to 15)
   * @param {Number} volumeB Volume value (0 to 15)
   * @return {Number} Mixed volume value (0 to 15)
   * @example
   * ```js
   * VOLUME_TABLE.mix(15, 14) // 14
   * ```
   */
  mix (volumeA, volumeB) {
    return TABLE[volumeA][volumeB]
  }
}

module.exports = VolumeTable
