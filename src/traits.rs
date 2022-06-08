/* traits.rs
 * All of the aoec soundchips must implement `aoec::Play`,
 * and should implement `aoec::Control`.
 */

pub trait Play {
    fn clock(&mut self);
    fn read_sample(&self, ch: usize) -> f32;
}

pub trait Control {
    fn set_sample_rate(&mut self, sample_rate: f32);
    fn set_tempo(&mut self, tempo: f32);
    fn set_freq(&mut self, freq: f32);
    fn set_env(&mut self, env: u8);
    fn set_pan(&mut self, pan: u8);
    fn set_mute(&mut self, mute: bool);
    fn set_param(&mut self, key: usize, value: u32);

    fn get_sample_rate(&self) -> f32;
    fn get_tempo(&self) -> f32;
    fn get_freq(&self) -> f32;
    fn get_env(&self) -> u8;
    fn get_pan(&self) -> u8;
    fn get_mute(&self) -> bool;
    fn get_param(&self, key: usize) -> u32;
}

// vim:ft=rust
// vim:wrap!