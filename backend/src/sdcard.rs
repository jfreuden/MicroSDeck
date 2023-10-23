use std::fs::read_to_string;

pub fn is_card_inserted() -> bool {
    std::fs::metadata("/sys/block/mmcblk0").is_ok()
}

// Based on https://www.cameramemoryspeed.com/sd-memory-card-faq/reading-sd-card-cid-serial-psn-internal-numbers/
pub fn get_card_cid() -> Option<String> {
    read_to_string("/sys/block/mmcblk0/device/cid").map(|v| v.trim().to_string()).ok()
}

pub fn is_card_steam_formatted() -> bool {
    std::fs::metadata("/run/media/mmcblk0p1/libraryfolder.vdf").is_ok()
}