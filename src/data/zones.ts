export interface Zone {
  id: string;
  kr: string;
  labels: { [key: string]: string };
  x: number;
  y: number;
  w: number;
  h: number;
}

export const STORE_PATH = "M260 50 H640 V260 H40 V130 H260 Z";

const Z = (
  id: string, kr: string, x: number, y: number, w: number, h: number,
  en: string, zh: string, ja: string, vi: string, th: string, ru: string, uz: string,
  fr: string, it: string, es: string, idn: string, ms: string, tr: string, mn: string
): Zone => ({
  id, kr, x, y, w, h,
  labels: { en, "zh-Hans": zh, ja, vi, th, ru, uz, fr, it, es, id: idn, ms, tr, mn },
});

export const ZONES: Zone[] = [
  Z("skincare-side", "스킨케어", 46, 136, 36, 80, "Skincare", "护肤", "スキンケア", "Chăm sóc da", "สกินแคร์", "Уход за кожей", "Teri parvarishi", "Soin visage", "Skincare", "Cuidado facial", "Perawatan kulit", "Penjagaan kulit", "Cilt bakımı", "Арьс арчилгаа"),
  Z("maskpack", "마스크팩", 90, 136, 164, 26, "Mask Pack", "面膜", "マスクパック", "Mặt nạ", "มาส์ก", "Маски", "Niqoblar", "Masques", "Maschere", "Mascarillas", "Masker", "Mask muka", "Maske", "Маск"),
  Z("skincare", "스킨케어", 46, 228, 140, 26, "Skincare", "护肤", "スキンケア", "Chăm sóc da", "สกินแคร์", "Уход за кожей", "Teri parvarishi", "Soin visage", "Skincare", "Cuidado facial", "Perawatan kulit", "Penjagaan kulit", "Cilt bakımı", "Арьс арчилгаа"),
  Z("cleansing", "클렌징", 190, 228, 64, 26, "Cleansing", "洁面", "クレンジング", "Tẩy trang", "คลีนซิ่ง", "Очищение", "Tozalash", "Nettoyage", "Detersione", "Limpieza", "Pembersih", "Pembersih", "Temizleme", "Цэвэрлэгээ"),
  Z("suncare", "썬케어", 264, 56, 30, 68, "Suncare", "防晒", "日焼け止め", "Chống nắng", "กันแดด", "Санскрин", "Quyoshdan himoya", "Solaire", "Solari", "Protección solar", "Tabir surya", "Pelindung matahari", "Güneş ürünleri", "Нарнаас хамгаалах"),
  Z("special", "스페셜케어", 302, 56, 27, 30, "Special Care", "特护", "スペシャルケア", "Chăm sóc đặc biệt", "สเปเชียลแคร์", "Спец. уход", "Maxsus parvarish", "Soin spécial", "Cura speciale", "Cuidado especial", "Perawatan khusus", "Penjagaan khas", "Özel bakım", "Тусгай арчилгаа"),
  Z("nail", "네일", 332, 56, 27, 30, "Nail", "美甲", "ネイル", "Sơn móng", "เล็บ", "Ногти", "Tirnoq", "Ongles", "Unghie", "Uñas", "Kuku", "Kuku", "Tırnak", "Хумс"),
  Z("perfume", "퍼퓸", 362, 56, 27, 30, "Perfume", "香水", "香水", "Nước hoa", "น้ำหอม", "Парфюм", "Atir", "Parfum", "Profumi", "Perfume", "Parfum", "Minyak wangi", "Parfüm", "Үнэртэн"),
  Z("home-fragrance", "홈프레그런스", 392, 56, 27, 30, "Home Fragrance", "家居香氛", "ホームフレグランス", "Hương thơm nhà", "น้ำหอมบ้าน", "Ароматы для дома", "Uy atirlari", "Parfum d'intérieur", "Profumi casa", "Ambientadores", "Pengharum ruangan", "Pewangi rumah", "Ev kokuları", "Гэрийн үнэртэн"),
  Z("accessories", "화장소품", 422, 56, 27, 30, "Beauty Tools", "美妆工具", "メイク小物", "Dụng cụ trang điểm", "อุปกรณ์แต่งหน้า", "Аксессуары", "Bezak vositalari", "Accessoires", "Accessori", "Accesorios", "Alat rias", "Alat solek", "Makyaj aletleri", "Гоо сайхны хэрэгсэл"),
  Z("beauty-to-go", "뷰티투고", 452, 56, 27, 30, "Beauty To Go", "旅行装", "ビューティートゥーゴー", "Đồ du lịch", "ชุดพกพา", "Мини-формат", "Sayohat to'plami", "Format voyage", "Formato viaggio", "Tamaño viaje", "Ukuran travel", "Saiz perjalanan", "Seyahat boyu", "Аяллын багц"),
  Z("supplements", "건강식품", 482, 56, 27, 30, "Supplements", "保健食品", "健康食品", "Thực phẩm chức năng", "อาหารเสริม", "БАДы", "Qo'shimchalar", "Compléments", "Integratori", "Suplementos", "Suplemen", "Suplemen", "Takviyeler", "Хүнсний нэмэлт"),
  Z("snacks", "과자류", 512, 56, 27, 30, "Snacks", "零食", "お菓子", "Bánh kẹo", "ขนม", "Снеки", "Gazaklar", "Snacks", "Snack", "Snacks", "Camilan", "Snek", "Atıştırmalık", "Хөнгөн хүнс"),
  Z("pb-snacks", "PB과자", 542, 56, 27, 30, "OY Snacks", "自有零食", "PBお菓子", "Bánh kẹo PB", "ขนม PB", "Снеки OY", "OY gazaklari", "Snacks OY", "Snack OY", "Snacks OY", "Camilan OY", "Snek OY", "OY atıştırmalık", "OY хөнгөн хүнс"),
  Z("pos", "계산대", 572, 56, 62, 30, "Checkout", "收银台", "レジ", "Quầy thu ngân", "แคชเชียร์", "Касса", "Kassa", "Caisse", "Cassa", "Caja", "Kasir", "Kaunter bayaran", "Kasa", "Касс"),
  Z("makeup-1", "색조 1", 340, 112, 24, 62, "Makeup 1", "彩妆 1", "メイク 1", "Trang điểm 1", "เมคอัพ 1", "Макияж 1", "Bo'yanish 1", "Maquillage 1", "Makeup 1", "Maquillaje 1", "Makeup 1", "Solek 1", "Makyaj 1", "Будалт 1"),
  Z("makeup-2", "색조 2", 384, 112, 24, 62, "Makeup 2", "彩妆 2", "メイク 2", "Trang điểm 2", "เมคอัพ 2", "Макияж 2", "Bo'yanish 2", "Maquillage 2", "Makeup 2", "Maquillaje 2", "Makeup 2", "Solek 2", "Makyaj 2", "Будалт 2"),
  Z("makeup-3", "색조 3", 428, 112, 24, 62, "Makeup 3", "彩妆 3", "メイク 3", "Trang điểm 3", "เมคอัพ 3", "Макияж 3", "Bo'yanish 3", "Maquillage 3", "Makeup 3", "Maquillaje 3", "Makeup 3", "Solek 3", "Makyaj 3", "Будалт 3"),
  Z("patch", "패치", 466, 112, 18, 62, "Patches", "贴片", "パッチ", "Miếng dán", "แผ่นแปะ", "Патчи", "Patchlar", "Patchs", "Patch", "Parches", "Patch", "Patch", "Bantlar", "Наалт"),
  Z("household", "가정용품", 484, 112, 18, 62, "Household", "生活用品", "生活用品", "Đồ gia dụng", "ของใช้ในบ้าน", "Товары для дома", "Uy buyumlari", "Maison", "Casa", "Hogar", "Kebutuhan rumah", "Barangan rumah", "Ev ürünleri", "Гэр ахуй"),
  Z("feminine", "위생용품", 510, 112, 18, 62, "Feminine Care", "卫生用品", "生理用品", "Vệ sinh phụ nữ", "ผ้าอนามัย", "Гигиена", "Gigiena", "Hygiène féminine", "Igiene femminile", "Higiene femenina", "Kewanitaan", "Kewanitaan", "Hijyen", "Эмэгтэйчүүдийн ариун цэвэр"),
  Z("oral", "구강", 528, 112, 18, 62, "Oral Care", "口腔护理", "オーラルケア", "Chăm sóc răng miệng", "ดูแลช่องปาก", "Уход за полостью рта", "Og'iz parvarishi", "Soin bucco-dentaire", "Igiene orale", "Cuidado bucal", "Perawatan mulut", "Penjagaan mulut", "Ağız bakımı", "Амны хөндий"),
  Z("lip", "립케어", 554, 112, 18, 62, "Lip Care", "唇部护理", "リップケア", "Chăm sóc môi", "ดูแลริมฝีปาก", "Уход за губами", "Lab parvarishi", "Soin des lèvres", "Cura labbra", "Cuidado labial", "Perawatan bibir", "Penjagaan bibir", "Dudak bakımı", "Уруулын арчилгаа"),
  Z("packaged-food", "가공식품", 572, 112, 18, 62, "Packaged Food", "加工食品", "加工食品", "Thực phẩm đóng gói", "อาหารแปรรูป", "Продукты", "Oziq-ovqat", "Épicerie", "Alimentari", "Alimentos", "Makanan kemasan", "Makanan berbungkus", "Paketli gıda", "Савласан хүнс"),
  Z("mens", "남성", 340, 228, 81, 26, "Men's Care", "男士", "メンズ", "Nam giới", "ผู้ชาย", "Мужское", "Erkaklar uchun", "Homme", "Uomo", "Hombre", "Pria", "Lelaki", "Erkek", "Эрэгтэй"),
  Z("body", "바디케어", 425, 228, 81, 26, "Body Care", "身体护理", "ボディケア", "Chăm sóc cơ thể", "ดูแลผิวกาย", "Уход за телом", "Tana parvarishi", "Soin du corps", "Corpo", "Cuidado corporal", "Perawatan tubuh", "Penjagaan badan", "Vücut bakımı", "Биеийн арчилгаа"),
  Z("hair", "헤어", 510, 228, 80, 26, "Hair Care", "美发", "ヘアケア", "Chăm sóc tóc", "ดูแลเส้นผม", "Уход за волосами", "Soch parvarishi", "Soin cheveux", "Capelli", "Cuidado capilar", "Perawatan rambut", "Penjagaan rambut", "Saç bakımı", "Үс арчилгаа"),
];

export const ZONE_CHIPS = ZONES.filter((z) => z.id !== "skincare-side");

export const ENTRANCE = { x: 298, y: 272 };
export const EXIT = { x: 612, y: 272 };