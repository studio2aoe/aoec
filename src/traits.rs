/* traits.rs
 * All of the aoec soundchips must implement `aoec::Play`,
 * and should implement `aoec::Control`.
 */

pub trait Play {
    fn clock(&mut self);
    fn read_sample(&self, ch: usize) -> f32;
}

pub trait Control {
    fn set_freq(&mut self, freq: f32);
    fn set_vol(&mut self, ch: usize, vol: u8);
    fn set_mute(&mut self, mute: bool);
    fn set_param(&mut self, key: usize, value: u32);

    fn get_freq(&self) -> f32;
    fn get_vol(&self, ch: usize) -> u8;
    fn get_mute(&self) -> bool;
    fn get_param(&self, key: usize) -> u32;
}

// vim:ft=rust
// vim:wrap!
