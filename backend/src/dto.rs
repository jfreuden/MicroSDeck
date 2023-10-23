use serde::{Deserialize, Serialize};
use crate::err::Error;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Name {
    pub name: String,
}

impl From<&str> for Name {
    fn from(value: &str) -> Self {
        return Name {
            name: value.to_string(),
        };
    }
}

impl From<String> for Name {
    fn from(value: String) -> Self {
        return Name {
            name: value.to_string(),
        };
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct MicroSDCard {
    pub uid: String,
    pub libid: String,
	
    pub name: String,
	#[serde(default)]
	pub position: u32,
	#[serde(default)]
	pub hidden: bool
}

impl MicroSDCard {
	pub fn merge(&mut self, other: MicroSDCard) -> Result<(), Error> {
		if self.uid != other.uid {
			return Error::new_res("uid's did not match");
		}
	
		if self.libid != other.libid {
			return Error::new_res("libid's did not match");
		}

		self.name = other.name;
		self.position = other.position;
		self.hidden = other.hidden;

		Ok(())
	}
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Game {
    pub uid: String,
    pub name: String,
    pub size: u64,
}
