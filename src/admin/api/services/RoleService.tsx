import { MOCK_ROLES, MOCK_ROLES_DICTIONARY, fakeDelay, paginate } from '@shared/mockData/mockDb';
import type { DictionaryItem } from '../api-type/api-type';

export type ApiError = { message: string; statusCode?: number; error?: string };

export const RoleService = {
  getAppRoles: async (): Promise<DictionaryItem[]> => {
    await fakeDelay();
    return MOCK_ROLES_DICTIONARY as unknown as DictionaryItem[];
  },

  getAllRoles: async (pageNumber = 1, pageSize = 10, searchTerm?: string) => {
    await fakeDelay();
    let items = [...MOCK_ROLES];
    if (searchTerm) items = items.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const p = paginate(items, pageNumber, pageSize);
    return {
      success: true,
      data: { items: p.items, ...p, pageNumber: p.pageNumber },
      message: null,
      errors: [],
    };
  },

  getRoleDetails: async (roleId: number | string) => {
    await fakeDelay();
    const role = MOCK_ROLES.find(r => r.id === Number(roleId));
    return { success: true, data: role, message: null, errors: [] };
  },

  assignActionsToRole: async (_roleId: number | string, _actionIds: string[]) => {
    await fakeDelay();
    return { success: true, message: 'تم التعيين بنجاح', data: null, errors: [] };
  },
};
