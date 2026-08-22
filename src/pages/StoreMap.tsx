import { useState } from "react";
import type { Langs } from "../App";
import { LANGS } from "../data/langs";
import { ZONES, ZONE_CHIPS, STORE_PATH, ENTRANCE, EXIT } from "../data/zones";

interface IStoreMapProps {
  language: Langs;
  backToPhrases: () => void;
  showMapToCustomer: (zoneId: string | null, here: { x: number; y: number } | null) => void;
}

function StoreMap({ language, backToPhrases, showMapToCustomer }: IStoreMapProps) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [here, setHere] = useState<{ x: number; y: number } | null>(null);
  const [pinMode, setPinMode] = useState(false);

  if (language === null) return null;
  const currentLang = LANGS.find((l) => l.code === language);

  // 화면 클릭 좌표 → SVG 좌표 변환
  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!pinMode) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 680;
    const y = ((e.clientY - rect.top) / rect.height) * 300;
    setHere({ x, y });
    setPinMode(false);
  };

  return (
    <div className="a-screen min-h-screen bg-white max-w-md sm:max-w-3xl mx-auto px-5 pt-4 pb-28">
      {/* 헤더 */}
      <div className="relative flex items-center justify-center mb-5 h-11">
        <button
          onClick={backToPhrases}
          aria-label="뒤로"
          className="absolute left-0 w-11 h-11 flex items-center justify-center rounded-full bg-[#F5F6F2] text-[#191B17] text-[20px] transition-transform active:scale-90"
        >
          ←
        </button>
        <span className="text-[15.5px] font-extrabold text-[#191B17]">매장 지도</span>
        <span className="absolute right-0 text-[11px] font-extrabold tracking-widest text-[#4C5940] bg-[#F2F4EC] px-2.5 py-1 rounded-md">
          {currentLang?.badge}
        </span>
      </div>

      {/* 현위치 버튼 */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setPinMode((prev) => !prev)}
          className={
            (pinMode
              ? "bg-[#8ED320] text-[#16250B] shadow-[0_2px_10px_rgba(142,211,32,0.45)] "
              : "bg-white text-[#5A5D53] shadow-[inset_0_0_0_1.2px_#DDE0D5] ") +
            "flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12.5px] font-extrabold transition-all duration-200 active:scale-95"
          }
        >
          📍 {pinMode ? "지도를 탭하세요" : "We are here"}
        </button>
        {here && (
          <button
            onClick={() => setHere(null)}
            className="text-[11.5px] font-bold text-[#A9ACA1] px-1 transition-opacity active:opacity-50"
          >
            현위치 지우기
          </button>
        )}
      </div>

      {/* 지도 */}
      <div className="-mx-5 px-5 overflow-x-auto no-scrollbar">
        <svg
          viewBox="0 0 680 300"
          onClick={handleMapClick}
          className={
            (pinMode ? "cursor-crosshair " : "") +
            "min-w-[560px] w-full bg-[#FBFCF9] rounded-2xl shadow-[inset_0_0_0_1.2px_#E9EBE1]"
          }
        >
          <path d={STORE_PATH} fill="none" stroke="#C9CDBF" strokeWidth="1.6" />

          {ZONES.map((z) => {
            const active = selectedZone === z.id;
            return (
              <g
                key={z.id}
                onClick={(e) => {
                  if (pinMode) return;
                  e.stopPropagation();
                  setSelectedZone(active ? null : z.id);
                }}
                className="cursor-pointer"
              >
                <rect
                  x={z.x}
                  y={z.y}
                  width={z.w}
                  height={z.h}
                  rx="4"
                  fill={active ? "#8ED320" : "#EFF1EA"}
                  stroke={active ? "#16250B" : "#DDE0D5"}
                  strokeWidth={active ? 1.8 : 1}
                  className="transition-all duration-200"
                />
              </g>
            );
          })}

          <text x={ENTRANCE.x} y={ENTRANCE.y + 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#8A8D83">
            입구
          </text>
          <text x={EXIT.x} y={EXIT.y + 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#8A8D83">
            출구
          </text>

          {here && (
            <g>
              <circle cx={here.x} cy={here.y} r="9" fill="#191B17" opacity="0.15" />
              <circle cx={here.x} cy={here.y} r="5" fill="#191B17" />
            </g>
          )}
        </svg>
      </div>

      {/* 품목 칩 */}
      <div className="text-[10.5px] font-extrabold text-[#A9ACA1] tracking-[0.14em] uppercase mt-5 mb-2">
        구역 선택
      </div>
      <div className="flex flex-wrap gap-1.5">
        {ZONE_CHIPS.map((z) => (
          <button
            key={z.id}
            onClick={() => setSelectedZone(selectedZone === z.id ? null : z.id)}
            className={
              (selectedZone === z.id
                ? "bg-[#191B17] text-white "
                : "bg-white text-[#5A5D53] shadow-[inset_0_0_0_1.2px_#DDE0D5] ") +
              "px-3 py-[7px] rounded-full text-[12.5px] font-bold transition-all duration-200 active:scale-95"
            }
          >
            {z.kr}
          </button>
        ))}
      </div>

      {/* 고객에게 보여주기 */}
      <button
        onClick={() => showMapToCustomer(selectedZone, here)}
        disabled={!selectedZone && !here}
        className="w-full mt-6 py-3.5 rounded-xl bg-[#8ED320] text-[#16250B] text-[15px] font-extrabold transition-all duration-150 active:scale-[0.98] disabled:opacity-30 shadow-[0_4px_14px_rgba(142,211,32,0.35)]"
      >
        고객에게 크게 보여주기
      </button>
    </div>
  );
}

export default StoreMap;