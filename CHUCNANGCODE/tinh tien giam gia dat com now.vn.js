

let tong_tien_dat_com = 35000,
    dat_toi_thieu = 70000,
    giam_gia = 25 / 100;
giam_toi_da = 50000;
so_luong = 2;
let tien_duoc_giam_cho_mot_nguoi = tong_tien_dat_com - ((dat_toi_thieu - (giam_gia * dat_toi_thieu)) / so_luong);
check_dieu_kien_giam_toi_da(giam_toi_da, tien_duoc_giam_cho_mot_nguoi){
    if (tien_duoc_giam_cho_mot_nguoi < giam_toi_da) { return true; } else { return false; }
}