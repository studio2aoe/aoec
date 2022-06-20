mod hex;
mod lfsr;

use crate::subchips::DAC;
use crate::subchips::OSC;
use hex::HEX;

use crate::traits::Play;
use crate::traits::Control;

pub struct BuiltIn {
    hex: HEX,
    osc: OSC,
    dac: DAC,
}

impl BuiltIn {
    pub fn new(sample_rate: u32) -> BuiltIn {
        let mut new = BuiltIn {
            hex: HEX::new(),
            osc: OSC::new(sample_rate, hex::W_LENGTH),
            dac: DAC::new(),
        };
        new.reset();
        new
    }

    pub fn reset(&mut self) {
        self.hex.reset();
        self.osc.init();
        self.osc.set_wavelength(hex::W_LENGTH);
        self.osc.set_freq(440_f32.to_bits());
        self.dac.reset();
    }
}


impl Play for BuiltIn {
    fn clock(&mut self) {
        (0..self.osc.count_repeat()).for_each(|_| self.hex.clock());
        self.osc.clock();
    }

    fn read_sample(&self, ch: usize) -> f32 {
        match self.hex.is_muted() {
            true => 0.0,
            false => self.dac.mix(ch, self.hex.read_hex()),
        }
    }
}

impl Control for BuiltIn {
    fn setparam(&mut self, key: u32, value: u32) {
        match key {
            0x00 => (),
            0x11 => self.osc.set_sample_rate(value),
            0x12 => self.osc.set_freq(value),
            0x21 => self.dac.set_vol(value),
            0x22 => self.dac.set_pan(value),
            0x23 => self.dac.set_mute(value),
            0x31 => self.hex.set_wtype(value),
            0x32 => self.hex.set_wparam(value),
            _ => (),
        }
    }
}

