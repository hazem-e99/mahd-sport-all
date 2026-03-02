import { MOCK_SURVEY_ANALYTICS, fakeDelay, paginate } from '@shared/mockData/mockDb';
import type {
  AnalyticsResponse,
  CommentsResponse,
  GetAllResponsesParams,
  GetAllResponsesResult,
  GetSurveyResponseResult,
} from '@admin/types/SurveyResults.type';

export const SurveyResultsService = {
  getOverview: async (surveyId: number) => {
    await fakeDelay();
    return {
      id: surveyId,
      name: 'استبيان رضا الرياضيين',
      nameLa: 'Athlete Satisfaction Survey',
      description: 'قياس رضا الرياضيين عن الخدمات',
      startDate: '2026-01-01',
      endDate: '2026-06-30',
      surveyMode: 1 as 0 | 1,
      responses: 42,
      totalResponses: 100,
    };
  },

  getAnalytics: async (_params: any): Promise<AnalyticsResponse> => {
    await fakeDelay();
    return MOCK_SURVEY_ANALYTICS as unknown as AnalyticsResponse;
  },

  getAllComments: async (_surveyId: number, _questionId: number, pageNumber = 1, pageSize = 10): Promise<CommentsResponse> => {
    await fakeDelay();
    const items = [
      { id: 1, userName: 'أحمد', comment: 'ممتاز جداً', createdAt: '2026-02-10' },
      { id: 2, userName: 'سارة', comment: 'جيد', createdAt: '2026-02-12' },
    ];
    const p = paginate(items, pageNumber, pageSize);
    return { items: p.items, totalCount: p.totalCount } as unknown as CommentsResponse;
  },

  async getAllSurveyResponses(params: GetAllResponsesParams): Promise<GetAllResponsesResult> {
    await fakeDelay();
    const items: any[] = [];
    const p = paginate(items, params.pageNumber, params.pageSize);
    return {
      items: p.items,
      pageNumber: p.pageNumber,
      totalPages: p.totalPages,
      totalCount: p.totalCount,
      hasPreviousPage: p.hasPreviousPage,
      hasNextPage: p.hasNextPage,
    };
  },

  async getSurveyResponse(_surveyId: number, _responseId: number): Promise<GetSurveyResponseResult> {
    await fakeDelay();
    return { answers: [] } as unknown as GetSurveyResponseResult;
  },
};
