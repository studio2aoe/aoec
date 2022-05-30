# aoec: chiptune style soundchip

---

# Traits (`aoec::traits`)
All of the aoec soundchips must implement `aoec::traits::Play`,
and should implement `aoec::traits::Control`

## `aoec::traits::Play` (public)
- `clock(&mut self)`: Clock the soundchip to generate the next sample
- `read_sample(&self, ch: usize) -> f32`: Read the current sample of given channel

## `aoec::traits::Control` (public)
The setters and getters of these parameters:
  - Sample Rate (sample_rate)
  - Tempo (tempo): determine the clock period of scheduler. it needs to implement automation for chip control.
  - Frequency (freq): the pitch of sound, determine clock speed
  - Volume (vol): the volume of sound
  - Muting (mute): If the soundchip is mute
  - Custom parameters (param): Usually used to change the timbre

- `set_sample_rate(&mut self, sample_rate: f32)`
- `set_tempo(&mut self, tempo: f32)`
- `set_freq(&mut self, freq: f32)`
- `set_vol(&mut self, ch: usize, vol: u8)`
- `set_mute(&mut self, mute: bool)`
- `set_param(&mut self, key: usize, value: u32)`

- `get_sample_rate(&self) -> f32`
- `get_tempo(&self) -> f32`
- `get_freq(&self) -> f32`
- `get_vol(&self, ch: usize) -> u8`
- `get_mute(&self) -> bool`
- `get_param(&self, key: usize) -> u32`

---

# Soundchip module (`aoec::soundchips`)
Actual soundchip structs implementing above traits.

## `aoec::soundchips::BuiltIn` (public)
- Generating mathmatically oscillated, built-in waveform
- BuiltIn waveform types by the first parameter
  - `0`: Mute
  - `1`: Pulse
    - The second param means the duty cycle is `n/16`.
    - example) `0x08` means `8/16`, it is 50% (square wave)
  - `2`: Triangle
  - `3`: Sawtooth
    - The second param means the sawtooth directions.
    - Even number: Decreasing sawtooth
    - Odd number: Increasing sawtooth
  - `4`: Noise
    - The second param means the noise length
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

## `aoec::subchips::Metronome` (private)
Determines if the scheduler clocks at a given tempo.

## `aoec::subchips::OSC`  (private)
Determines if the hex generator clocks at a given frequency.

## `aoec::subchips::DAC`  (private)
Convert the sound sample from hex to f32

## `aoec::subchips::LFSR` (private)
Generates the random number for noise waveform
