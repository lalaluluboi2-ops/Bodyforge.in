import React, { useEffect, useRef, useState } from 'react';
import { ADS_CONFIG, isAdSenseReady } from '../config/ads';
import { ShieldCheck, Info } from 'lucide-react';

interface AdSlotProps {
  placement: keyof typeof ADS_CONFIG.slots;
  className?: string;
  customMinHeight?: number;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export const AdSlot: React.FC<AdSlotProps> = ({ placement, className = '', customMinHeight }) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  const slotConfig = ADS_CONFIG.slots[placement];
  const isReady = isAdSenseReady() && Boolean(slotConfig?.slotId);
  const minHeight = customMinHeight || slotConfig?.minHeight || 90;

  useEffect(() => {
    if (!ADS_CONFIG.enabled || !isReady || !adRef.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setAdLoaded(true);
    } catch (e) {
      console.warn(`[BODYFORGE Ads] Error initializing slot: ${placement}`, e);
      setAdError(true);
    }
  }, [isReady, placement]);

  if (!ADS_CONFIG.enabled) {
    return null;
  }

  return (
    <div 
      className={`w-full my-6 flex flex-col items-center justify-center ${className}`}
      role="region"
      aria-label="Advertisement Space"
    >
      {/* Required Publisher Policy Label */}
      <div className="w-full max-w-4xl flex items-center justify-between pb-1 px-1">
        <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 font-semibold flex items-center gap-1">
          <Info className="w-3 h-3 text-forge-lime/70" />
          {slotConfig?.label || 'Advertisement'}
        </span>
        <span className="text-[9px] font-mono text-gray-600 uppercase">
          BODYFORGE Network
        </span>
      </div>

      {/* Main Container */}
      <div 
        style={{ minHeight: `${minHeight}px` }}
        className="w-full max-w-4xl rounded-2xl bg-charcoal-900 border border-charcoal-800 p-3 flex items-center justify-center overflow-hidden transition-all relative"
      >
        {isReady && !adError ? (
          <ins
            ref={adRef}
            className="adsbygoogle w-full block"
            style={{ display: 'block', minHeight: `${minHeight}px` }}
            data-ad-client={ADS_CONFIG.publisherId}
            data-ad-slot={slotConfig.slotId}
            data-ad-format={slotConfig.format === 'rectangle' ? 'rectangle' : 'auto'}
            data-full-width-responsive="true"
          />
        ) : (
          <div className="w-full py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left rounded-xl bg-charcoal-950/60 border border-dashed border-charcoal-700/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forge-lime/10 border border-forge-lime/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-forge-lime" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Reserved Ad Placement • <span className="text-forge-lime font-mono">{placement}</span>
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Safe, policy-compliant display area. Activates when AdSense credentials are configured.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-charcoal-850 border border-charcoal-700 text-[10px] font-mono text-gray-300">
                {slotConfig?.format || 'Responsive'} ({minHeight}px)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
