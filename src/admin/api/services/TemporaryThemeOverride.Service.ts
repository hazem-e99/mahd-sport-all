import { MOCK_THEME_OVERRIDES, fakeDelay, paginate } from '@shared/mockData/mockDb';
import type { PaginatedApiResponse } from '@admin/types/api-response';
import type { TemporaryThemeOverride } from '@admin/types/TemporaryThemeOverride.type';

let overrides = [...MOCK_THEME_OVERRIDES];

export const TemporaryThemeOverrideService = {
  getAllOverrides: async (params?: any) => {
    await fakeDelay();
    let items = [...overrides];
    if (params?.holidayName) items = items.filter(o => o.holidayName.includes(params.holidayName));
    const p = paginate(items, params?.pageNumber ?? 1, params?.pageSize ?? 10);
    return {
      data: p.items as TemporaryThemeOverride[],
      totalCount: p.totalCount,
      currentPage: p.pageNumber,
      totalPages: p.totalPages,
      hasNextPage: p.hasNextPage,
      hasPreviousPage: p.hasPreviousPage,
    };
  },

  createOverride: async (data: any) => {
    await fakeDelay();
    const newItem = { ...data, id: String(Date.now()) };
    overrides.push(newItem);
    return { success: true, data: newItem, message: null, errors: [] };
  },

  updateOverride: async (data: any) => {
    await fakeDelay();
    overrides = overrides.map(o => o.id === data.id ? { ...o, ...data } : o);
    return { success: true, data: overrides.find(o => o.id === data.id), message: null, errors: [] };
  },

  deleteOverride: async (id: string) => {
    await fakeDelay();
    overrides = overrides.filter(o => o.id !== id);
    return { success: true, data: null, message: null, errors: [] };
  },
};
