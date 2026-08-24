import { useState } from "react";
import type { Langs } from "../App";
import { LANGS } from "../data/langs";
import { ZONES, ZONE_CHIPS, STORE_PATH, ENTRANCE, EXIT, getHighlightIds } from "../data/zones";

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
  const zone = ZONES.find((z) => z.id === selectedZone);
  const highlightIds = getHighlightIds(selectedZone);

  // 화면 좌표 → SVG 좌표 (마우스·터치 공통)
  const toSvgPoint = (clientX: number, clientY: number, el: SVGSVGElement) => {
    const rect = el.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * 680,
      y: ((clientY - rect.top) / rect.height) * 300,
    };
  };

  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!pinMode) return;
    setHere(toSvgPoint(e.clientX, e.clientY, e.currentTarget));
    setPinMode(false);
  };

  const selectZone = (id: string) => {
    setSelectedZone((prev) => (prev === id ? null : id));
    setPinMode(false);
  };

  return (
    <div className="a-screen min-h-screen bg-white max-w-md sm:max-w-3xl landscape:max-w-none mx-auto px-5 pt-4 pb-24">
      {/* 헤더 — 가로 모드에서는 높이를 줄여 지도 공간 확보 */}
      <div className="relative flex items-center justify-center mb-4 h-11 landscape:h-9 landscape:mb-2">
        <button
          onClick={backToPhrases}
          aria-label="뒤로"
          className="absolute left-0 w-11 h-11 landscape:w-9 landscape:h-9 flex items-center justify-center rounded-full bg-[#F5F6F2] text-[#191B17] text-[20px] transition-transform active:scale-90"
        >
          ←
        </button>
        <span className="text-[15.5px] font-extrabold text-[#191B17]">매장 지도</span>
        <span className="absolute right-0 text-[11px] font-extrabold tracking-widest text-[#4C5940] bg-[#F2F4EC] px-2.5 py-1 rounded-md">
          {currentLang?.badge}
        </span>
      </div>

      {/* 현위치 버튼 */}
      <div className="flex items-center gap-2 mb-3 landscape:mb-2">
        <button
          onClick={() => setPinMode((prev) => !prev)}
          className={
            (pinMode
              ? "bg-[#E23B2E] text-white shadow-[0_2px_10px_rgba(226,59,46,0.4)] "
              : "bg-white text-[#5A5D53] shadow-[inset_0_0_0_1.2px_#DDE0D5] ") +
            "flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12.5px] font-extrabold transition-all duration-200 active:scale-95"
          }
        >
          {pinMode ? "지도를 탭하세요" : "현위치 표시"}
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
      <div className="-mx-5 px-5 overflow-x-auto no-scrollbar landscape:mx-0 landscape:px-0 landscape:overflow-visible">
        <svg
          viewBox="0 0 680 300"
          onClick={handleMapClick}
          className={
            (pinMode ? "cursor-crosshair " : "") +
            "min-w-[600px] landscape:min-w-0 w-full bg-[#FBFCF9] rounded-2xl shadow-[inset_0_0_0_1.2px_#E9EBE1]"
          }
        >
          <path d={STORE_PATH} fill="none" stroke="#C9CDBF" strokeWidth="1.6" />

          {ZONES.map((z) => {
            const active = highlightIds.includes(z.id);
            return (
              <rect
                key={z.id}
                x={z.x}
                y={z.y}
                width={z.w}
                height={z.h}
                rx="4"
                onClick={(e) => {
                  if (pinMode) return;
                  e.stopPropagation();
                  selectZone(z.id);
                }}
                fill={active ? "#FF8A00" : "#EFF1EA"}
                stroke={active ? "#B35F00" : "#DDE0D5"}
                strokeWidth={active ? 2 : 1}
                className="cursor-pointer transition-all duration-200"
              />
            );
          })}

          <text x={ENTRANCE.x} y={ENTRANCE.y + 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#8A8D83">
            IN
          </text>
          <text x={EXIT.x} y={EXIT.y + 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#8A8D83">
            OUT
          </text>

          {/* 선택 구역 라벨 — 대표 구역 하나에만 표시 */}
          {zone && (
            <text
              x={zone.x + zone.w / 2}
              y={zone.y - 7}
              textAnchor="middle"
              fontSize="13"
              fontWeight="800"
              fill="#B35F00"
            >
              {zone.labels[language]}
            </text>
          )}

          {/* 현위치 깃발 */}
          {here && (
            <g>
              <line
                x1={here.x}
                y1={here.y}
                x2={here.x}
                y2={here.y - 26}
                stroke="#E23B2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d={`M${here.x} ${here.y - 26} L${here.x + 20} ${here.y - 20} L${here.x} ${here.y - 14} Z`}
                fill="#E23B2E"
              />
              <circle cx={here.x} cy={here.y} r="4" fill="#E23B2E" />
            </g>
          )}
        </svg>
      </div>

      {/* 범례 */}
      {(here || zone) && (
        <div className="a-fade flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-[12px] font-bold text-[#5A5D53]">
          {here && (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#E23B2E]" />
              You are here
            </span>
          )}
          {zone && (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF8A00] border-2 border-[#B35F00]" />
              {zone.labels[language]}
            </span>
          )}
        </div>
      )}

      {/* 구역 칩 */}
      <div className="text-[10.5px] font-extrabold text-[#A9ACA1] tracking-[0.14em] uppercase mt-5 landscape:mt-3 mb-2">
        구역 선택
      </div>
      <div className="flex flex-wrap gap-1.5">
        {ZONE_CHIPS.map((z) => (
          <button
            key={z.id}
            onClick={() => selectZone(z.id)}
            className={
              (highlightIds.includes(z.id)
                ? "bg-[#FF8A00] text-white "
                : "bg-white text-[#5A5D53] shadow-[inset_0_0_0_1.2px_#DDE0D5] ") +
              "flex flex-col items-start px-3 py-[6px] rounded-xl transition-all duration-200 active:scale-95"
            }
          >
            <span className="text-[12.5px] font-bold leading-tight">{z.kr}</span>
            <span
              className={
                (highlightIds.includes(z.id) ? "text-white/80 " : "text-[#A9ACA1] ") +
                "text-[10px] font-semibold leading-tight"
              }
            >
              {z.labels[language]}
            </span>
          </button>
        ))}
      </div>

      {/* 고객에게 보여주기 — 구역 선택이 반드시 필요 */}
      <button
        onClick={() => showMapToCustomer(selectedZone, here)}
        disabled={!selectedZone}
        className="w-full mt-6 landscape:mt-4 py-3.5 rounded-xl bg-[#8ED320] text-[#16250B] text-[15px] font-extrabold transition-all duration-150 active:scale-[0.98] disabled:opacity-30 shadow-[0_4px_14px_rgba(142,211,32,0.35)]"
      >
        고객에게 크게 보여주기
      </button>
      {!selectedZone && (
        <p className="mt-2 text-[11.5px] text-[#A9ACA1] text-center">
          안내할 구역을 먼저 선택해 주세요
        </p>
      )}
    </div>
  );
}

export default StoreMap;