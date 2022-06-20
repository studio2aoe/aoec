pub struct OSC {
    sample_rate: u32,
    wavelength: u32,
    freq: f32,
    repeat: u32,
    period: f32,
    offset: f32
}
impl OSC
{
    pub fn new(sample_rate: u32, wavelength: u32) -> OSC {
        let mut new = OSC {
            sample_rate,
            wavelength,
            freq: 440_f32,
            period: 0_f32,
            repeat: 0_u32,
            offset: 0_f32,
        };
        new.init();
        new
    }
    pub fn init(&mut self) {
        self.refresh_freq();
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

    pub fn set_sample_rate(&mut self, sample_rate: u32) {
        self.sample_rate = match sample_rate {
            sample_rate if sample_rate == 0u32 => panic!("sample_rate value must not be 0"),
            _ => sample_rate
        };
        self.refresh_freq();
    }

    pub fn set_wavelength(&mut self, wavelength: u32) {
        self.wavelength = match wavelength {
            wavelength if wavelength == 0u32 => panic!("wavelength value must not be 0"),
            _ => wavelength
        };
        self.refresh_freq();
    }

    pub fn set_freq(&mut self, freq: u32) {
        let freq: f32 = f32::from_bits(freq);
        self.freq = match freq {
            freq if freq  < 0f32 => freq * -1f32, // use absolute value
            freq if freq == 0f32 => panic!("freq value must not be 0.0"),
            _ => freq,
        };
        self.refresh_freq();
    }

    fn refresh_freq(&mut self) {
        let clock_freq = self.freq * self.wavelength as f32;
        let ratio = clock_freq / (self.sample_rate as f32);

        self.repeat = ratio.trunc() as u32;
        self.period = 1.0 / ratio.fract();
    }
}
