import { MOCK_TAB_WIDGET_CATEGORIES_DICT, MOCK_TAB_WIDGET_CATEGORIES_WITH_WIDGETS, fakeDelay } from '@shared/mockData/mockDb';
import type { DictionaryItem, WidgetCategoryResponse } from '../api-type/api-type';

export type ApiError = { message: string; statusCode?: number; error?: string };

export const TabWidgetCategoriesService = {
  getTabWidgetCategories: async (): Promise<DictionaryItem[]> => {
    await fakeDelay();
    return MOCK_TAB_WIDGET_CATEGORIES_DICT as unknown as DictionaryItem[];
  },

  getTabWidgetCategoriesWithWidgets: async (): Promise<WidgetCategoryResponse[]> => {
    await fakeDelay();
    return MOCK_TAB_WIDGET_CATEGORIES_WITH_WIDGETS as unknown as WidgetCategoryResponse[];
  },
};
