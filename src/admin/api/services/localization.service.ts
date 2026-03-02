import { MOCK_LOCALIZATION_ITEMS, fakeDelay } from '@shared/mockData/mockDb';

export interface LocalizationItem { key: string; value: string; culture: string; }
export interface LocalizationFilter { culture: string; }
export interface LocalizationEntry { value: string; culture: string; }
export interface CreateLocalizationRequest { key: string; localizationEntries: LocalizationEntry[]; }
export interface CreateLocalizationResponse { data: any; success: boolean; message: string; }
export interface UpdateLocalizationRequest { key: string; localizationEntries: LocalizationEntry[]; }
export interface UpdateLocalizationResponse { data: any; success: boolean; message: string; }

let locItems = [...MOCK_LOCALIZATION_ITEMS];

export const LocalizationService = {
  getAll: async (filter?: LocalizationFilter): Promise<LocalizationItem[]> => {
    await fakeDelay();
    if (filter?.culture) return locItems.filter(i => i.culture === filter.culture);
    return [...locItems];
  },

  getAllGrouped: async (): Promise<Record<string, LocalizationItem[]>> => {
    await fakeDelay();
    const grouped: Record<string, LocalizationItem[]> = {};
    locItems.forEach(item => {
      if (!grouped[item.key]) grouped[item.key] = [];
      grouped[item.key].push(item);
    });
    return grouped;
  },

  create: async (data: CreateLocalizationRequest): Promise<CreateLocalizationResponse> => {
    await fakeDelay();
    data.localizationEntries.forEach(e => {
      locItems.push({ key: data.key, value: e.value, culture: e.culture });
    });
    return { data: null, success: true, message: 'تم الإنشاء بنجاح' };
  },

  update: async (data: UpdateLocalizationRequest): Promise<UpdateLocalizationResponse> => {
    await fakeDelay();
    locItems = locItems.filter(i => i.key !== data.key);
    data.localizationEntries.forEach(e => {
      locItems.push({ key: data.key, value: e.value, culture: e.culture });
    });
    return { data: null, success: true, message: 'تم التحديث بنجاح' };
  },
};
