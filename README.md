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
- Custom waveform generator

## TO DO
- Sampler
- Demo application
- Solve bad performance problem on nodejs


## How to use

### Load Library
- Bundle scripts by `npm build run`.
- Bundled script is placed on `./dist/aoec.bundle.js`
- **Install from npm is not supported yet**

#### In Browser
- Load `aoec.bundle.js` by script tag.
```html
<script src="./aoec.bundle.js"></script>
```

- Set audio context.
```js
const AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)()
```

#### In NodeJs (Experimental)
- **Using on nodejs has BAD BUFFER WRITTING PERFORMANCE.**
- Load `aoec.bundle.js` as NodeJs module.
```js
const Aoec = require('./aoec.bundle')
```

- Set audio context and output. (see [web-audio-api](https://www.npmjs.com/package/web-audio-api))

```js
const WebAudioAPI = require('web-audio-api')
const Speaker = require('speaker')

const AUDIO_CONTEXT = new WebAudioAPI.AudioContext()

AUDIO_CONTEXT.outStream = new Speaker({
  channels: AUDIO_CONTEXT.format.numberOfChannels,
  bitDepth: AUDIO_CONTEXT.format.bitDepth,
  sampleRate: AUDIO_CONTEXT.sampleRate
})
```

### Construct aoec and set generators
- Constructor Aoec() needs three arguments: `audioContext`, `buffsize`, and `generatorSet`
- `audioContext` is audio context of target environment. (see [Load Library](#load-library) again)
- `buffsize` is buffer size of sound processor.
  - It must be a power of 2 between 256 and 16384, that is 256, 512, 1024, 2048, 4096, 8192, 16384.
- `generatorSet` is string determines type and number of generator.
  - `B`: Built-in waveform generator
  - `C`: Custom waveform generator
  - `N`: Noise generator
  - `S`: Sampler (Not implemented)
  - For example, `'BBCNS'`, it will be create 2 Built-in, 1 Custom, 1 Noise, 1 Sampler.

```js
const aoec = new Aoec('BBCNS', 4096, AUDIO_CONTEXT)
```

### Control generator
- `Aoec.sendGenerator()` method sends command for control generator by 6 integer arguments.
- `id`: ID of target. generator ID is determined by generator creating order.
- `freq`: Frequency value of generator.
  - When frequency value is 0, generator will stop
  - Defaultly, 440 is standard A4 and 1 to 22050 (half of sample rate) are allowed.
  - On Noise generator, 44100 is default white noise and 1 to 88200 (4x) are allowed.
- `type`: Type of generator.
  - On Built-in generator
    - `0` or Others: Flatline (generator will be stop)
    - `1`, `2`, `3`, `4`: Pulse wave of n/8 duty cycle. (12.5%, 25%, 37.5%, 50%)
    - `5`: Triangle wave
    - `6`: Sawtooth wave
  - On Noise generator
    - `0` or Others: Long period (32767-bit) noise. it has smooth and non-tonal sound.
    - `1`: Short period (93-bit) noise. it has metalic and tonal sound.
  - On Custom generator (Not implemented)
    - `0` to `1024`: address of waveform. all generators share waveform memory.
    - Empty address : Flatline
    - Others : Generator type will not be changed.
- `inv`: Waveform will be inversed
- `volL`: Left volume of generator. aoec use 2 channels.
- `volR`: Right volume.