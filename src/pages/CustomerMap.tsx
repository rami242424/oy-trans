import type { Langs } from "../App";
import { LANGS } from "../data/langs";
import { ZONES, STORE_PATH, ENTRANCE, EXIT, getHighlightIds } from "../data/zones";

interface ICustomerMapProps {
  language: Langs;
  zoneId: string | null;
  here: { x: number; y: number } | null;
  closeDisplay: () => void;
}

function CustomerMap({ language, zoneId, here, closeDisplay }: ICustomerMapProps) {
  if (!language) return null;

  const zone = ZONES.find((z) => z.id === zoneId);
  const highlightIds = getHighlightIds(zoneId);
  const currentLang = LANGS.find((l) => l.code === language);

  return (
    <div
      onClick={closeDisplay}
      className="a-display fixed inset-0 z-20 bg-[#8ED320] text-[#16250B] flex flex-col cursor-pointer overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 pt-7 landscape:pt-4">
        <span className="flex items-center gap-2">
          <span className="text-[13px] font-black tracking-tight text-[#16250B]">
            OY-trans
          </span>
          <span className="w-1 h-1 rounded-full bg-white" />
          <span className="text-[12px] font-bold text-[#16250B]/55">
            {currentLang?.label}
          </span>
        </span>
        <button
          onClick={closeDisplay}
          aria-label="닫기"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#16250B]/10 text-[#16250B]/70 text-[16px] transition-all duration-150 active:scale-90 active:bg-[#16250B]/20"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-4">
        {zone && (
          <h2 className="a-item text-[clamp(24px,6.5vw,38px)] landscape:text-[clamp(20px,4vw,32px)] font-black text-white text-center mb-5 landscape:mb-3 [text-shadow:0_1px_3px_rgba(22,37,11,0.2)]">
            {zone.labels[language]}
          </h2>
        )}

        <svg viewBox="0 0 680 300" className="a-item w-full max-w-[860px] landscape:max-h-[58vh]">
          <path d={STORE_PATH} fill="none" stroke="rgba(22,37,11,0.35)" strokeWidth="2" />

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
                fill={active ? "#FF8A00" : "rgba(255,255,255,0.5)"}
                stroke={active ? "#8A3D00" : "rgba(22,37,11,0.12)"}
                strokeWidth={active ? 2.5 : 1}
              />
            );
          })}

          <text x={ENTRANCE.x} y={ENTRANCE.y + 8} textAnchor="middle" fontSize="12" fontWeight="800" fill="rgba(22,37,11,0.55)">
            IN
          </text>
          <text x={EXIT.x} y={EXIT.y + 8} textAnchor="middle" fontSize="12" fontWeight="800" fill="rgba(22,37,11,0.55)">
            OUT
          </text>

          {/* 목적지 — 대표 구역 위에 파동 + 화살표 */}
          {zone && (
            <g>
              <circle cx={zone.x + zone.w / 2} cy={zone.y + zone.h / 2} r="14" fill="#FF8A00" opacity="0.35">
                <animate attributeName="r" values="14;30;14" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <path d={`M${zone.x + zone.w / 2} ${zone.y - 6} l-9 -13 h18 Z`} fill="#8A3D00">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; 0 -5; 0 0"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          )}

          {/* 현위치 깃발 */}
          {here && (
            <g>
              <line
                x1={here.x}
                y1={here.y}
                x2={here.x}
                y2={here.y - 30}
                stroke="#E23B2E"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d={`M${here.x} ${here.y - 30} L${here.x + 24} ${here.y - 23} L${here.x} ${here.y - 16} Z`}
                fill="#E23B2E"
              />
              <circle cx={here.x} cy={here.y} r="5" fill="#E23B2E" />
            </g>
          )}
        </svg>

        <div className="a-item flex flex-wrap gap-x-6 gap-y-2 justify-center mt-6 landscape:mt-3 text-[13px] font-bold text-[#16250B]/75">
          {here && (
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#E23B2E]" />
              You are here
            </span>
          )}
          {zone && (
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF8A00] border-2 border-[#8A3D00]" />
              {zone.labels[language]}
            </span>
          )}
        </div>
      </div>

      <div className="pb-8 landscape:pb-4 pt-2 text-center text-[11px] font-semibold tracking-wide text-[#16250B]/40">
        화면을 탭하면 돌아갑니다
      </div>
    </div>
  );
}

export default CustomerMap;