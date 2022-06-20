/* traits.rs
 * All of the aoec soundchips must implement `aoec::Play`,
 * and should implement `aoec::Control`.
 */

pub trait Play {
    fn clock(&mut self);
    fn read_sample(&self, ch: usize) -> f32;
}

pub trait Control {
    fn setparam(&mut self, key: u32, value: u32);
}

// vim:ft=rust
// vim:wrap!
