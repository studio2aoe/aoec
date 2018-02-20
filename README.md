# aoec (AOE Chipsound)
- Web-audio-based chiptune sound engine. 
- This project is part of aoetracker.

## GOAL
### PSG-like chip sound
- GB, NES style 4-bit quantized sound.
- It doesn't emulate any soundchip but works just similar way.

## Implemented
- Built-in waveform generator (Pulse, Triangle, Sawtooth)
- LFSR based white noise generator

## TO DO
- Custom waveform generator
- Sampler
- Demo application


## How to use

### Load in browser
- Load `./dist/aoec.bundle.js` on browser.
```html
<script src="./dist/aoec.bundle.js"></script>
```
- `Aoec` is namespace of aoec, `Aoec.Aoec()` is constructor
- Construct `Aoec` object on `aoec` (or other object name you want)
```js
const aoec = new Aoec.Aoec()
```

### Setup waveform generator
- `Aoec.setupGenerator()` method creates waveform generator, needs 3 integer arguments, `pBuilt`, `pCustom`, `pNoise`
- `pBuilt` is number of built-in waveform generator.
- `pCustom` is number of custom waveform generator. (Not implemented)
- `pNoise` is number of noise generator.
- Generators are created in following order, Built-in -> Custom -> Noise.
```js
/* Setup 2 built-in, 1 custom, 1 noise generators. */
aoec.setupGenerator(2, 1, 1)
```
- Too many generator created, the performance may be slow...

### Control generator
- `Aoec.sendGenerator()` method sends command for control generator by 6 integer arguments.
- `id`: ID of target. generator ID is determined by generator creating order.
- `freq`: Frequency value of generator.
  - When frequency value is 0, generator will stop
  - Defaultly, 440 is standard A4 and 1 to 22050 (half of sample rate) are allowed.
  - On Noise generator, 44100 is default white noise and 1 to 88200 (4x) are allowed.
- `type`: Type of generator.
  - When type number is 0, generator will stop
  - On Built-in generator
    - `1`, `2`, `3`, `4`: Pulse wave of n/8 duty cycle. (12.5%, 25%, 37.5%, 50%)
    - `5`: Triangle wave
    - `6`: Sawtooth wave
  - On Noise generator
    - `1`: Long period (32767-bit) noise. it has smooth and non-tonal sound.
    - `2`: Short period (93-bit) noise. it has metalic and tonal sound.
  - On Custom generator (Not implemented)
    - `1` to `255`: address of waveform. each custom generator has 255 address for memorize waveforms.
- `inv`: Waveform will be inversed
- `volL`: Left volume of generator. aoec use 2 channels.
- `volR`: Right volume.