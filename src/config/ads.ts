export interface AdPlacementConfig {
  slotId: string;
  format: 'horizontal-banner' | 'rectangle' | 'responsive';
  minHeight: number;
  label: string;
}

export interface AdSystemConfig {
  enabled: boolean;
  publisherId: string;
  autoAdsEnabled: boolean;
  slots: Record<string, AdPlacementConfig>;
}

const rawPubId = (import.meta.env.VITE_ADSENSE_PUB_ID || '').trim();
const rawEnabled = import.meta.env.VITE_ADS_ENABLED !== 'false';

export const ADS_CONFIG: AdSystemConfig = {
  enabled: rawEnabled,
  publisherId: rawPubId,
  autoAdsEnabled: import.meta.env.VITE_ADSENSE_AUTO_ADS === 'true',
  
  slots: {
    dashboard_banner: {
      slotId: (import.meta.env.VITE_AD_SLOT_DASHBOARD || '').trim(),
      format: 'horizontal-banner',
      minHeight: 90,
      label: 'Advertisement'
    },
    library_banner: {
      slotId: (import.meta.env.VITE_AD_SLOT_LIBRARY || '').trim(),
      format: 'horizontal-banner',
      minHeight: 90,
      label: 'Advertisement'
    },
    workout_detail_bottom: {
      slotId: (import.meta.env.VITE_AD_SLOT_WORKOUT_DETAIL || '').trim(),
      format: 'responsive',
      minHeight: 120,
      label: 'Sponsored'
    },
    educational_incontent: {
      slotId: (import.meta.env.VITE_AD_SLOT_EDUCATIONAL || '').trim(),
      format: 'rectangle',
      minHeight: 200,
      label: 'Advertisement'
    }
  }
};

export const isAdSenseReady = (): boolean => {
  return (
    ADS_CONFIG.enabled &&
    Boolean(ADS_CONFIG.publisherId) &&
    /^ca-pub-\d{16}$/.test(ADS_CONFIG.publisherId)
  );
};
