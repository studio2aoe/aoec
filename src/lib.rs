/* lib.rs
 * Manage and export the public modules
 */

mod traits;
pub use traits::Play;
pub use traits::Control;

mod soundchips;
pub use soundchips::BuiltIn;
// pub use soundchips::Custom;
// pub use soundchips::Sample;

mod subchips;


#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

