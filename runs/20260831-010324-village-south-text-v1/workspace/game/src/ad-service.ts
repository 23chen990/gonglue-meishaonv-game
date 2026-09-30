export type AdPlacement = 'ending' | 'chapter_clue';

export interface AdContext {
  firstRun: boolean;
}

export interface AdSnapshot {
  sessionImpressions: number;
  runImpressions: number;
  lastShownAt: number | null;
}

interface AdServiceOptions {
  now?: () => number;
}

const MIN_INTERVAL_MS = 6 * 60_000;
const MAX_PER_RUN = 2;
const MAX_PER_SESSION = 3;

export class AdService {
  private sessionImpressions = 0;
  private runImpressions = 0;
  private lastShownAt: number | null = null;
  private readonly now: () => number;

  constructor(options: AdServiceOptions = {}) {
    this.now = options.now ?? (() => Date.now());
  }

  canShow(placement: AdPlacement, context: AdContext): boolean {
    if (context.firstRun && placement !== 'ending') return false;
    if (this.runImpressions >= MAX_PER_RUN || this.sessionImpressions >= MAX_PER_SESSION) return false;
    if (this.lastShownAt !== null && this.now() - this.lastShownAt < MIN_INTERVAL_MS) return false;
    return true;
  }

  async showRewarded(placement: AdPlacement, context: AdContext): Promise<{ completed: boolean; provider: 'browser-mock' }> {
    if (!this.canShow(placement, context)) return { completed: false, provider: 'browser-mock' };
    this.sessionImpressions += 1;
    this.runImpressions += 1;
    this.lastShownAt = this.now();
    return { completed: true, provider: 'browser-mock' };
  }

  startRun(): void {
    this.runImpressions = 0;
  }

  getSnapshot(): AdSnapshot {
    return {
      sessionImpressions: this.sessionImpressions,
      runImpressions: this.runImpressions,
      lastShownAt: this.lastShownAt,
    };
  }
}
