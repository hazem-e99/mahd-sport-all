// @ts-nocheck
import { MOCK_GENERAL_SETTINGS, MOCK_TIMEZONES, fakeDelay } from '@shared/mockData/mockDb';

export interface TimeZoneDictionary { key: string; value: string; }
export interface GeneralSettingsColor { name: string; nameLa: string; path?: string; isDefault: boolean; hexCode?: string; }
export interface GeneralSettingsData {
  defaultLanguage: string;
  defaultTimeZone: string;
  defaultMode: string;
  introVideoPath: string;
  birthdayCelebration?: boolean;
  joiningCelebration?: boolean;
  lightThemeColors: GeneralSettingsColor[];
  darkThemeColors: GeneralSettingsColor[];
  backgrounds: GeneralSettingsColor[];
}
export interface GeneralSettingsDataUpdate extends Omit<GeneralSettingsData, 'backgrounds'> {
  themeBackgrounds: GeneralSettingsColor[];
}
export interface GeneralSettings {
  success: boolean;
  data: GeneralSettingsData;
  message: null;
  errors: any[];
}
export interface ColorDictionary { key: string; value: string; }
export interface UpdateGeneralSettingsResponse { success: boolean; data: number; message: null; errors: any[]; }

let settings = { ...MOCK_GENERAL_SETTINGS };

export const GeneralSettingsService = {
  getTimeZoneDictionary: async (): Promise<TimeZoneDictionary[]> => {
    await fakeDelay();
    return MOCK_TIMEZONES;
  },

  getColorDictionary: async (): Promise<ColorDictionary[]> => {
    await fakeDelay();
    return settings.lightThemeColors.map(c => ({ key: c.hexCode ?? c.name, value: c.name }));
  },

  getGeneralSettings: async (): Promise<GeneralSettings> => {
    await fakeDelay();
    return { success: true, data: settings as unknown as GeneralSettingsData, message: null, errors: [] };
  },

  update: async (data: GeneralSettingsDataUpdate): Promise<UpdateGeneralSettingsResponse> => {
    await fakeDelay();
    settings = { ...settings, ...data, backgrounds: data.themeBackgrounds };
    return { success: true, data: 1, message: null, errors: [] };
  },
};
