import {
  MOCK_CONFLICT_DECLARATIONS,
  fakeDelay,
  paginate,
} from '@shared/mockData/mockDb';
import type { PaginatedApiResponse } from '@admin/types/api-response';
import type { ConflictDeclaration } from '@admin/types/ConflictDeclaration.type';

let declarations = [...MOCK_CONFLICT_DECLARATIONS];

export const ConflictDeclarationService = {
  getAllConflictDeclarations: async (params?: any): Promise<PaginatedApiResponse<ConflictDeclaration>> => {
    await fakeDelay();
    let items = [...declarations];
    if (params?.descriptionText) {
      items = items.filter(d => d.descriptionText.includes(params.descriptionText));
    }
    const p = paginate(items, params?.pageNumber ?? 1, params?.pageSize ?? 10);
    return {
      success: true,
      data: { items: p.items as ConflictDeclaration[], ...p, pageNumber: p.pageNumber },
      message: null,
      errors: [],
    };
  },

  createConflictDeclaration: async (data: Omit<ConflictDeclaration, 'id'>): Promise<ConflictDeclaration> => {
    await fakeDelay();
    const newItem = { ...data, id: Date.now() } as ConflictDeclaration;
    declarations.push(newItem as any);
    return newItem;
  },

  deleteConflictDeclaration: async (id: string | number): Promise<void> => {
    await fakeDelay();
    declarations = declarations.filter(d => d.id !== Number(id));
  },

  exportConflictDeclarations: async () => {
    await fakeDelay();
    return declarations;
  },

  exportViewers: async (_id: string | number) => {
    await fakeDelay();
    return [];
  },
};