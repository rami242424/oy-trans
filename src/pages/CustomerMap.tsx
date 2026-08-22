import type { Langs } from "../App";
import { ZONES, STORE_PATH, ENTRANCE, EXIT } from "../data/zones";

interface ICustomerMapProps {
  language: Langs;
  zoneId: string | null;
  here: { x: number; y: number } | null;
  closeDisplay: () => void;
}

function CustomerMap({ language, zoneId, here, closeDisplay }: ICustomerMapProps) {
  if (!language) return null;

  const zone = ZONES.find((z) => z.id === zoneId);

  return (
    <div
      onClick={closeDisplay}
      className="a-display fixed inset-0 z-20 bg-[#8ED320] text-[#16250B] flex flex-col cursor-pointer overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 pt-7">
        <span className="flex items-center gap-2">
          <span className="text-[13px] font-black tracking-tight text-[#16250B]">OY-trans</span>
          <span className="w-1 h-1 rounded-full bg-white" />
          <span className="text-[10.5px] font-extrabold tracking-[0.18em] uppercase text-[#16250B]/50">
            {language}
          </span>
        </span>
        <button
          onClick={closeDisplay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#16250B]/10 text-[#16250B]/70 text-[16px] transition-all duration-150 active:scale-90 active:bg-[#16250B]/20"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-4">
        {zone && (
          <h2 className="a-item text-[clamp(22px,6vw,34px)] font-black text-white text-center mb-5 [text-shadow:0_1px_2px_rgba(22,37,11,0.14)]">
            {zone.en}
          </h2>
        )}

        <svg viewBox="0 0 680 300" className="a-item w-full max-w-[820px]">
          <path d={STORE_PATH} fill="none" stroke="rgba(22,37,11,0.3)" strokeWidth="2" />

          {ZONES.map((z) => {
            const active = z.id === zoneId;
            return (
              <rect
                key={z.id}
                x={z.x}
                y={z.y}
                width={z.w}
                height={z.h}
                rx="4"
                fill={active ? "#16250B" : "rgba(255,255,255,0.45)"}
                stroke={active ? "#16250B" : "rgba(22,37,11,0.15)"}
                strokeWidth="1"
              />
            );
          })}

          <text x={ENTRANCE.x} y={ENTRANCE.y + 8} textAnchor="middle" fontSize="12" fontWeight="800" fill="rgba(22,37,11,0.55)">
            IN
          </text>
          <text x={EXIT.x} y={EXIT.y + 8} textAnchor="middle" fontSize="12" fontWeight="800" fill="rgba(22,37,11,0.55)">
            OUT
          </text>

          {/* 목적지 핀 */}
          {zone && (
            <g>
              <circle cx={zone.x + zone.w / 2} cy={zone.y + zone.h / 2} r="16" fill="#16250B" opacity="0.18">
                <animate attributeName="r" values="14;22;14" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.25;0;0.25" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle cx={zone.x + zone.w / 2} cy={zone.y + zone.h / 2} r="7" fill="#FFFFFF" stroke="#16250B" strokeWidth="2.5" />
            </g>
          )}

          {/* 현위치 핀 */}
          {here && (
            <g>
              <circle cx={here.x} cy={here.y} r="11" fill="#16250B" opacity="0.2" />
              <circle cx={here.x} cy={here.y} r="6" fill="#16250B" />
              <text x={here.x} y={here.y - 16} textAnchor="middle" fontSize="13" fontWeight="800" fill="#16250B">
                YOU
              </text>
            </g>
          )}
        </svg>

        <div className="a-item flex gap-5 mt-6 text-[12.5px] font-bold text-[#16250B]/70">
          {here && (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#16250B]" />
              You are here
            </span>
          )}
          {zone && (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-white border-2 border-[#16250B]" />
              {zone.en}
            </span>
          )}
        </div>
      </div>

      <div className="pb-8 pt-2 text-center text-[11px] font-semibold tracking-wide text-[#16250B]/40">
        화면을 탭하면 돌아갑니다
      </div>
    </div>
  );
}

export default CustomerMap;