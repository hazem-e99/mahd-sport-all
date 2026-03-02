import { MOCK_SURVEYS, fakeDelay, paginate } from '@shared/mockData/mockDb';

// Types matching the survey payload shape (no backend)
type CreateSurveyPayload = Record<string, any>;
type UpdateSurveyPayloadBody = Record<string, any>;

let surveys = [...MOCK_SURVEYS];

export const SurveyService = {
  getAllUserSurveys: async (params?: any) => {
    await fakeDelay();
    let items = [...surveys];
    if (params?.searchTerm) items = items.filter(s => s.name.includes(params.searchTerm));
    if (params?.status !== undefined) items = items.filter(s => s.status === params.status);
    const p = paginate(items, params?.pageNumber ?? 1, params?.pageSize ?? 10);
    return {
      data: p.items,
      totalCount: p.totalCount,
      currentPage: p.pageNumber,
      totalPages: p.totalPages,
      hasNextPage: p.hasNextPage,
      hasPreviousPage: p.hasPreviousPage,
    };
  },

  createSurvey: async (payload: CreateSurveyPayload) => {
    await fakeDelay();
    const newItem = { ...payload, id: Date.now(), status: 1, statusName: 'نشط', responses: 0, totalResponses: 0 };
    surveys.push(newItem as any);
    return { success: true, data: newItem, message: null, errors: [] };
  },

  updateSurvey: async (id: number, payload: UpdateSurveyPayloadBody) => {
    await fakeDelay();
    surveys = surveys.map(s => s.id === id ? { ...s, ...payload } : s);
    return { success: true, data: surveys.find(s => s.id === id), message: null, errors: [] };
  },

  getSurveyDetails: async (id: string) => {
    await fakeDelay();
    const s = surveys.find(x => x.id === Number(id));
    return { success: true, data: s, message: null, errors: [] };
  },

  deleteSurvey: async (id: string) => {
    await fakeDelay();
    surveys = surveys.filter(s => s.id !== Number(id));
    return { success: true, data: null, message: null, errors: [] };
  },

  getSurveyCount: async () => {
    await fakeDelay();
    return surveys.length;
  },

  exportSurveys: async (_params?: any) => {
    await fakeDelay();
    return surveys;
  },

  exportSurveyResponses: async (_params: any) => {
    await fakeDelay();
    return [];
  },
};
