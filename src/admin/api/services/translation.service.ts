import { fakeDelay } from '@shared/mockData/mockDb';

export interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
}

class TranslationServiceClass {
  /**
   * MOCK: Translates text using static logic
   */
  async translateText(request: TranslationRequest): Promise<string> {
    if (!request.text.trim()) return '';
    await fakeDelay();

    // Mock logic: If it's English to Arabic, we can just return the text
    // In a real static app, we might have a dictionary, but for general use
    // we return the text as is or with a marker to show it's mocked.
    return `[MOCK-${request.targetLang}] ${request.text}`;
  }

  /**
   * Auto-translate from English to Arabic - MOCKED
   */
  async translateEnToAr(text: string): Promise<string> {
    if (!text.trim()) return '';
    await fakeDelay();
    return text; // Return as is for static demo
  }

  /**
   * Translate from Arabic to English - MOCKED
   */
  async translateArToEn(text: string): Promise<string> {
    if (!text.trim()) return '';
    await fakeDelay();
    return text; // Return as is for static demo
  }
}

export const TranslationService = new TranslationServiceClass();