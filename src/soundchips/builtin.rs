use crate::subchips::dac::DAC;
use crate::subchips::osc::OSC;
use crate::subchips::lfsr::LFSR;

macro_rules! hex_pulse {
    ($duty: expr, $offset: expr) => {
        match $offset < $duty {
            true => 0xF,
            false => 0x0
        } as u8
    }
}

macro_rules! hex_triangle {
    ($offset: expr) => {
        match $offset <= 0xF {
            true => $offset,
            false => 31 - $offset
        } as u8
    }
}

macro_rules! hex_sawtooth_positive {
    ($offset: expr) => {
        ($offset >> 1) as u8
    }
}

macro_rules! hex_sawtooth_negative {
    ($offset: expr) => {
        (0x1F-$offset >> 1) as u8
    }
}

const BUILTIN_WAVELENGTH: u32 = 32;

enum WaveType {
    Mute, Pulse, Triangle, Sawtooth, Noise, Preserved
}

struct HEX {
    lfsr: LFSR,
    offset: usize,
    wtype: WaveType,
    param: u32,
}

impl HEX {
    fn new() -> HEX {
        let mut new = HEX {
            lfsr: LFSR::new(),
            offset: 0,
            wtype: WaveType::Pulse,
            param: 0
        };
        new.reset();
        new
    }

    fn reset(&mut self) {
        self.lfsr.reset();
        self.offset = 0;
        self.wtype = WaveType::Pulse;
        self.param = 0;
    }

    fn clock(&mut self) {
        match self.wtype {
            WaveType::Noise => self.lfsr.clock(),
            WaveType::Preserved => (),
            _ => {
                self.offset += 1;
                self.offset %= 32;
            }
        }
    }

    fn is_muted(&self) -> bool {
        match self.wtype {
            WaveType::Preserved => true,
            WaveType::Pulse => match self.param {
                0x00 => true,
                _ => false,
            },
            _ => false,
        }
    }

    fn read_hex(&self) -> u8 {
        match self.wtype {
            WaveType::Mute => 0,
            WaveType::Pulse => hex_pulse!(self.param as usize, self.offset),
            WaveType::Triangle => hex_triangle!(self.offset),
            WaveType::Sawtooth => match self.param % 2 {
                0 => hex_sawtooth_negative!(self.offset),
                1 => hex_sawtooth_positive!(self.offset),
                _ => unreachable!()
            },
            WaveType::Noise => self.lfsr.read_hex(),
            WaveType::Preserved => 0,
        }
    }

    fn set_wtype(&mut self, value: u32) {
        self.wtype = match value {
            0 => WaveType::Mute,
            1 => WaveType::Pulse,
            2 => WaveType::Triangle,
            3 => WaveType::Sawtooth,
            4 => WaveType::Noise,
            _ => WaveType::Preserved
        }
    }

    fn set_param(&mut self, value: u32) {
        self.param = value;
        self.lfsr.set_noise_type(self.param);
    }
}

pub struct BuiltIn {
    hex: HEX,
    osc: OSC,
    dac: DAC,
    param: [u32; 2]
}

impl BuiltIn {
    pub fn new(sample_rate: u32) -> BuiltIn {
        let mut new = BuiltIn {
            hex: HEX::new(),
            osc: OSC::new(sample_rate),
            dac: DAC::new(),
            param: [0_u32; 2],
        };
        new.reset();
        new
    }

    pub fn reset(&mut self) {
        self.hex.reset();
        self.osc.init();
        self.osc.set_freq(440_f32, BUILTIN_WAVELENGTH);
        self.dac.reset();
        self.param[0] = 0;
        self.param[1] = 0;
    }
}


impl crate::Play for BuiltIn {
    fn clock(&mut self) {
        (0..self.osc.count_repeat()).for_each(|_| self.hex.clock());
        self.osc.clock();
    }

    fn read_sample(&self, ch: usize) -> f32 {
        match self.dac.mute || self.hex.is_muted() {
            true => 0.0,
            false => self.dac.mix(ch, self.hex.read_hex()),
        }
    }
}

impl crate::Control for BuiltIn {
    fn set_freq(&mut self, freq: f32) {
        self.osc.set_freq(freq, BUILTIN_WAVELENGTH);
    }
    fn set_vol(&mut self, ch: usize, vol: u8) {
        self.dac.env[ch] = vol;
    }
    fn set_mute(&mut self, mute: bool) {
        self.dac.mute = mute;
    }
    fn set_param(&mut self, key: usize, value: u32) {
        match key {
            0 => self.hex.set_wtype(value),
            1 => self.hex.set_param(value),
            _ => (),
        };
        self.param[key] = value;
    }

    fn get_freq(&self) -> f32 {
        self.osc.get_freq(BUILTIN_WAVELENGTH)
    }
    fn get_vol(&self, ch: usize) -> u8 {
        self.dac.env[ch]
    }
    fn get_mute(&self) -> bool {
        self.dac.mute
    }
    fn get_param(&self, key: usize) -> u32 {
        self.param[key]
    }
}

