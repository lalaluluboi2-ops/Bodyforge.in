class SpeechGuidanceService {
  private isEnabled: boolean = true;

  public setEnabled(val: boolean) {
    this.isEnabled = val;
  }

  public speak(text: string) {
    if (!this.isEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = 0.85;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Fallback gracefully
    }
  }
}

export const speechService = new SpeechGuidanceService();
