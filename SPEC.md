# aoec: chiptune style soundchip

---

# Traits (`aoec::traits`)
All of the aoec soundchips must implement `aoec::traits::Play`,
and should implement `aoec::traits::Control`

## `aoec::traits::Play` (public)
- `clock(&mut self)`: Clock the soundchip to generate the next sample
- `read_sample(&self, ch: usize) -> f32`: Read the current sample of given channel

## `aoec::traits::Control` (public)
aoec uses the one setter, `setparam`.
- `setparam(&mut self, key: u32, value: u32)`
    - The behavior depends on the `key`.
    - key `0x00` => igonred
    - key `0x11` => set sample rate
        - the sample rate uses u32 value directly.
    - key `0x12` => set frequency
        - the frequency value is IEEE-754 representation of f32.
          for example, to change frequency to `440_f32`,
          give the `440_f32.to_bits()` or `0x43dc0000` as `value`.
    - key `0x21` => set volume
    - key `0x22` => set panning
        - vol & pan uses only last 1 hex-digit (mod 16) of `value`
    - key `0x23` => set mute the track
        - if `value` is non-zero (true), the track is muted
    - others => depends on the chip type.

---

# Soundchip module (`aoec::soundchips`)
Actual soundchip structs implementing above traits.

## `aoec::soundchips::BuiltIn` (public)
- Generating mathmatically oscillated, built-in waveform
- BuiltIn waveform types depends on key `0x31`,
  and waveform parameters depends on key `0x32`.
  - `0`: Mute
  - `1`: Pulse
    - key `0x32` means the duty cycle is `n/16`.
    - example) `0x08` means `8/16`, it is 50% (square wave)
  - `2`: Triangle
  - `3`: Sawtooth
    - key `0x32` means the sawtooth directions.
    - Even number: Decreasing sawtooth
    - Odd number: Increasing sawtooth
  - `4`: Noise
    - key `0x32` means the noise length
    - Even number: Long noise (32768-sample length)
    - Odd number: Short noise (93-sample length)

## `aoec::soundchips::Custom` (public)
- Generating the 32-sample length custom waveform (It likes the wave track of Gameboy)
- The memory limit is 65536-waveforms (ID `0x0000` \~ ID `0xFFFF`)

## `aoec::soundchips::Sample` (public)
- Generating custom length waveform (It likes the DPCM sampler of NES)

---

# Subchip module (aoec::subchips)
The structs to support the aoec soundchips

## `aoec::subchips::OSC`  (private)
Determines if the hex generator clocks at a given frequency.

## `aoec::subchips::DAC`  (private)
Convert the sound sample from hex to f32