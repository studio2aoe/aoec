mod hex;
mod lfsr;

use crate::subchips::DAC;
use crate::subchips::OSC;
use crate::subchips::Metronome;
use hex::HEX;

use crate::traits::Play;
use crate::traits::Control;

pub struct BuiltIn {
    hex: HEX,
    osc: OSC,
    dac: DAC,
    metronome: Metronome,
    param: [u32; 2]
}

impl BuiltIn {
    pub fn new(sample_rate: f32) -> BuiltIn {
        let mut new = BuiltIn {
            hex: HEX::new(),
            osc: OSC::new(sample_rate, hex::W_LENGTH),
            dac: DAC::new(),
            metronome: Metronome::new(sample_rate, 125_f32),
            param: [0_u32; 2],
        };
        new.reset();
        new
    }

    pub fn reset(&mut self) {
        self.hex.reset();
        self.osc.init();
        self.osc.set_wavelength(hex::W_LENGTH);
        self.osc.set_freq(440_f32);
        self.dac.reset();
        self.param[0] = 0;
        self.param[1] = 0;
    }
}


impl Play for BuiltIn {
    fn clock(&mut self) {
        (0..self.osc.count_repeat()).for_each(|_| self.hex.clock());

        if self.metronome.tick() {
            /* TODO: The scheduler clocks every 1 tick */
        }

        self.osc.clock();
        self.metronome.clock();
    }

    fn read_sample(&self, ch: usize) -> f32 {
        match self.hex.is_muted() {
            true => 0.0,
            false => self.dac.mix(ch, self.hex.read_hex()),
        }
    }
}

impl Control for BuiltIn {
    fn set_sample_rate(&mut self, sample_rate: f32) {
        self.osc.set_sample_rate(sample_rate);
        self.metronome.set_sample_rate(sample_rate);
    }
    fn set_tempo(&mut self, tempo: f32) {
        self.metronome.set_tempo(tempo)
    }
    fn set_freq(&mut self, freq: f32) {
        self.osc.set_wavelength(hex::W_LENGTH);
        self.osc.set_freq(freq);
    }
    fn set_env(&mut self, env: u8) {
        self.dac.set_vol(env)
    }
    fn set_pan(&mut self, pan: u8) {
        self.dac.set_pan(pan)
    }
    fn set_mute(&mut self, mute: bool) {
        self.dac.set_mute(mute)
    }
    fn set_param(&mut self, key: usize, value: u32) {
        match key {
            0 => self.hex.set_wtype(value),
            1 => self.hex.set_param(value),
            _ => (),
        };
        self.param[key] = value;
    }
}

