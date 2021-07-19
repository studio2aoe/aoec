pub struct OSC {
    sample_rate: u32,
    repeat: u32,
    period: f32,
    offset: f32
}
impl OSC
{
    pub fn new(sample_rate: u32) -> OSC {
        let mut new = OSC {
            sample_rate,
            period: 0_f32,
            repeat: 0_u32,
            offset: 0_f32,
        };
        new.init();
        new
    }
    pub fn init(&mut self) {
        self.set_freq(440f32, 32);
        self.reset_offset();
    }

    pub fn reset_offset(&mut self) {
        self.offset = 0_f32;
    }

    pub fn count_repeat(&mut self) -> u32
    {
        match self.offset >= self.period {
            true => {
                self.offset -= self.period;
                self.repeat + 1
            },
            false => self.repeat
        }
    }

    pub fn clock(&mut self) {
        self.offset += 1.0;
    }

    pub fn set_freq(&mut self, freq: f32, wavelength: u32) {
        let freq = match freq {
            freq if freq  < 0f32 => freq * -1f32, // use absolute value
            freq if freq == 0f32 => panic!("freq value must not be 0.0"),
            _ => freq,
        };

        let clock_freq = freq * wavelength as f32;
        let ratio = clock_freq / (self.sample_rate as f32);

        self.repeat = ratio.trunc() as u32;
        self.period = 1.0 / ratio.fract();
    }

    pub fn get_freq(&self, wavelength: u32) -> f32 {
        let ratio = self.repeat as f32 + 1.0 / self.period;
        let clock_freq = ratio * self.sample_rate as f32;
        let freq = clock_freq / wavelength as f32;
        freq
    }
}
