/**
 * @desc NES style volume mixing table.
 */
class VolumeTable {
  constructor () {
    const length = 16
    this.__table = new Array(length)
    for (let i = 0; i < length; i++) {
      this.__table[i] = new Uint8Array(length)
      for (let j = 0; j < length; j++) {
        if (i === 0 || j === 0) this.__table[i][j] = 0
        else if (i >= length) this.__table[i][j] = this.__table[15][j]
        else if (j >= length) this.__table[i][j] = this.__table[i][15]
        else {
          const __mixed = Math.floor(i * j / 15)
          this.__table[i][j] = (__mixed > 1) ? __mixed : 1
        }
      }
    }
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
    return this.__table[volumeA][volumeB]
  }
}

const VOLUME_TABLE = new VolumeTable()

/**
 * @public
 * @desc Instance of class VolumeTable
 */
export default VOLUME_TABLE
