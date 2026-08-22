export interface Zone {
  id: string;
  kr: string;
  en: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

// 매장 도면 좌표계 (viewBox 0 0 680 300)
export const STORE_PATH = "M260 50 H640 V260 H40 V130 H260 Z";

export const ZONES: Zone[] = [
  // 왼쪽 날개
  { id: "skincare-side", kr: "스킨케어", en: "Skincare", x: 46, y: 136, w: 36, h: 80 },
  { id: "maskpack", kr: "마스크팩", en: "Mask Pack", x: 90, y: 136, w: 164, h: 26 },
  { id: "skincare", kr: "스킨케어", en: "Skincare", x: 46, y: 228, w: 140, h: 26 },
  { id: "cleansing", kr: "클렌징", en: "Cleansing", x: 190, y: 228, w: 64, h: 26 },

  // 단차 벽면
  { id: "suncare", kr: "썬케어", en: "Suncare", x: 264, y: 56, w: 30, h: 68 },

  // 상단 벽면
  { id: "special", kr: "스페셜케어", en: "Special Care", x: 302, y: 56, w: 27, h: 30 },
  { id: "nail", kr: "네일", en: "Nail", x: 332, y: 56, w: 27, h: 30 },
  { id: "perfume", kr: "퍼퓸", en: "Perfume", x: 362, y: 56, w: 27, h: 30 },
  { id: "home-fragrance", kr: "홈프레그런스", en: "Home Fragrance", x: 392, y: 56, w: 27, h: 30 },
  { id: "accessories", kr: "화장소품", en: "Beauty Tools", x: 422, y: 56, w: 27, h: 30 },
  { id: "beauty-to-go", kr: "뷰티투고", en: "Beauty To Go", x: 452, y: 56, w: 27, h: 30 },
  { id: "supplements", kr: "건강식품", en: "Supplements", x: 482, y: 56, w: 27, h: 30 },
  { id: "snacks", kr: "과자류", en: "Snacks", x: 512, y: 56, w: 27, h: 30 },
  { id: "pb-snacks", kr: "PB과자", en: "Olive Young Snacks", x: 542, y: 56, w: 27, h: 30 },
  { id: "pos", kr: "계산대", en: "Checkout", x: 572, y: 56, w: 62, h: 30 },

  // 색조 섬 매대
  { id: "makeup-1", kr: "색조 1", en: "Makeup 1", x: 340, y: 112, w: 24, h: 62 },
  { id: "makeup-2", kr: "색조 2", en: "Makeup 2", x: 384, y: 112, w: 24, h: 62 },
  { id: "makeup-3", kr: "색조 3", en: "Makeup 3", x: 428, y: 112, w: 24, h: 62 },

  // 세로 반반 매대 3개
  { id: "patch", kr: "패치", en: "Patch & Relax", x: 466, y: 112, w: 18, h: 62 },
  { id: "household", kr: "가정용품", en: "Household", x: 484, y: 112, w: 18, h: 62 },
  { id: "feminine", kr: "위생용품", en: "Feminine Care", x: 510, y: 112, w: 18, h: 62 },
  { id: "oral", kr: "구강", en: "Oral Care", x: 528, y: 112, w: 18, h: 62 },
  { id: "lip", kr: "립케어", en: "Lip Care", x: 554, y: 112, w: 18, h: 62 },
  { id: "packaged-food", kr: "가공식품", en: "Packaged Food", x: 572, y: 112, w: 18, h: 62 },

  // 하단 벽면
  { id: "mens", kr: "남성", en: "Men's Care", x: 340, y: 228, w: 81, h: 26 },
  { id: "body", kr: "바디케어", en: "Body Care", x: 425, y: 228, w: 81, h: 26 },
  { id: "hair", kr: "헤어", en: "Hair Care", x: 510, y: 228, w: 80, h: 26 },
];

// 하단 칩 목록 — 중복 구역(스킨케어)은 하나만
export const ZONE_CHIPS = ZONES.filter((z) => z.id !== "skincare-side");

export const ENTRANCE = { x: 298, y: 272 };
export const EXIT = { x: 612, y: 272 };
