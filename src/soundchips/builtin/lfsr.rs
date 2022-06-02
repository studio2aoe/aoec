pub struct LFSR {
    tap_b: u8,
    lfsr: u16
}

impl LFSR {
    pub fn new() -> LFSR {
        LFSR {
            tap_b: 1,
            lfsr: 1,
        }
    }

    pub fn reset(&mut self) {
        self.tap_b = 1;
        self.lfsr = 1;
    }

    pub fn clock(&mut self) {
        let bit_a = self.lfsr & 1;
        let bit_b = (self.lfsr >> self.tap_b) & 1;
        let feedback = (bit_a ^ bit_b) << 14;
        self.lfsr >>=1;
        self.lfsr |= feedback;
    }

    pub fn read_hex(&self) -> u8 {
        (self.lfsr & 0xF) as u8
    }

    pub fn set_noise_type(&mut self, noise_type: u32) {
        self.tap_b = match noise_type % 2 {
            0 => 1,
            1 => 6,
            _ => unreachable!()
        };
    }
}
