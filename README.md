# aoec (AOE Chipsound)
- Web-audio-based chiptune sound engine. 
- This project is part of aoetracker.

## GOAL
### PSG-like chip sound
- GB, NES style 4-bit quantized sound.
- It doesn't emulate any soundchip but works just similar way.

## Implemented
- Processor:
  - ScriptProcessorNode based. mix waveforms from each channel and send to output.
- Waveform Generator:
  - Generates waveform to send processor.
  - Built-in waveform (pulse, triangle, sawtooth)
  - Custom waveform (stored in memory)
  - White noise (LFSR based)
- Mixer: Control volumes of each channels.
- Scheduler: Execute event when processor reads each sample. For example, it is used for execute events that change properties of waveform generator such as frequency, waveform, volume.

## TO DO
- PCM Sampler(Waveform Generator)
  - Generates waveform from PCM sample such as wav file.