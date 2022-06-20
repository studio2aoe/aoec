use super::lfsr::LFSR;

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

pub const W_LENGTH: u32 = 32;

enum WaveType {
    Mute,       // 0
    Pulse,      // 1
    Triangle,   // 2
    Sawtooth,   // 3
    Noise,      // 4
}

pub struct HEX {
    lfsr: LFSR,
    offset: usize,
    wtype: WaveType,
    wparam: u32,
}

impl HEX {
    pub fn new() -> HEX {
        let mut new = HEX {
            lfsr: LFSR::new(),
            offset: 0,
            wtype: WaveType::Pulse,
            wparam: 0
        };
        new.reset();
        new
    }

    pub fn reset(&mut self) {
        self.lfsr.reset();
        self.offset = 0;
        self.wtype = WaveType::Pulse;
        self.wparam = 0;
    }

    pub fn clock(&mut self) {
        match self.wtype {
            WaveType::Mute => (),
            WaveType::Noise => self.lfsr.clock(),
            _ => {
                self.offset += 1;
                self.offset %= 32;
            }
        }
    }

    pub fn is_muted(&self) -> bool {
        match self.wtype {
            WaveType::Mute => true,
            WaveType::Pulse => match self.wparam {
                0 => true,
                _ => false,
            },
            _ => false,
        }
    }

    pub fn read_hex(&self) -> u8 {
        match self.wtype {
            WaveType::Mute => 0,
            WaveType::Pulse => hex_pulse!(
                self.wparam as usize * 2,
                self.offset
            ),
            WaveType::Triangle => hex_triangle!(self.offset),
            WaveType::Sawtooth => match self.wparam % 2 {
                0 => hex_sawtooth_negative!(self.offset),
                1 => hex_sawtooth_positive!(self.offset),
                _ => unreachable!()
            },
            WaveType::Noise => self.lfsr.read_hex(),
        }
    }

    pub fn set_wtype(&mut self, value: u32) {
        self.wtype = match value {
            0 => WaveType::Mute,
            1 => WaveType::Pulse,
            2 => WaveType::Triangle,
            3 => WaveType::Sawtooth,
            4 => WaveType::Noise,
            _ => WaveType::Mute
        }
    }

    pub fn set_wparam(&mut self, value: u32) {
        self.wparam = value;
        self.lfsr.set_noise_type(self.wparam);
    }
}
