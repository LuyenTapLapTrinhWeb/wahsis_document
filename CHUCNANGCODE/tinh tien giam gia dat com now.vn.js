

let tong_tien_dat_com = 35000,
    dat_toi_thieu = 70000,
    giam_gia = 25 / 100;
giam_toi_da = 50000;
so_luong = 2;
let tien_duoc_giam_cho_mot_nguoi = tong_tien_dat_com - ((dat_toi_thieu - (giam_gia * dat_toi_thieu)) / so_luong);
check_dieu_kien_giam_toi_da(giam_toi_da, tien_duoc_giam_cho_mot_nguoi){
    if (tien_duoc_giam_cho_mot_nguoi < giam_toi_da) { return true; } else { return false; }
}

function get_tien_duoc_giam(tong_tien_dat_com_input, dat_toi_thieu_input, giam_gia_input, giam_toi_da_input, so_luong_input) {
    let tong_tien_dat_com = tong_tien_dat_com_input,
        dat_toi_thieu = dat_toi_thieu_input,
        giam_gia = giam_gia_input / 100,
        giam_toi_da = giam_toi_da_input,
        so_luong = so_luong_input;
    let tien_duoc_giam_cho_mot_nguoi = tong_tien_dat_com - ((dat_toi_thieu - (giam_gia * dat_toi_thieu)) / so_luong);
    return tien_duoc_giam_cho_mot_nguoi;
}
let tien_duoc_giam_cho_mot_nguoi = get_tien_duoc_giam(35000, 70000, 25, 50000, 2)
console.log("tien_duoc_giam_cho_mot_nguoi", tien_duoc_giam_cho_mot_nguoi)