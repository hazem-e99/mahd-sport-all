import {
  MOCK_FEEDBACKS,
  MOCK_FEEDBACK_RATINGS,
  MOCK_DEPARTMENTS,
  fakeDelay,
  paginate,
} from '@shared/mockData/mockDb';
import type {
  ApiResponse,
  FeedbackDetailsResponse,
  FeedbackListRequest,
  FeedbackListResponse,
  FeedbackRatingsRequest,
  FeedbackRatingsResponse,
} from '../../types/feedback-ratings.type';

export interface Department {
  id: string;
  name: string;
}

let feedbacks = [...MOCK_FEEDBACKS];

export const feedbackService = {
  getFeedbackRatings: async (_params?: FeedbackRatingsRequest): Promise<ApiResponse<FeedbackRatingsResponse>> => {
    await fakeDelay();
    return {
      success: true,
      data: MOCK_FEEDBACK_RATINGS as unknown as FeedbackRatingsResponse,
      message: null,
      errors: [],
    };
  },

  getFeedbacks: async (params?: FeedbackListRequest): Promise<FeedbackListResponse> => {
    await fakeDelay();
    let items = [...feedbacks];
    if (params?.department) items = items.filter(f => f.department === params.department);
    const p = paginate(items, params?.pageNumber ?? 1, params?.pageSize ?? 10);
    return {
      success: true,
      data: { items: p.items as any, totalCount: p.totalCount, pageNumber: p.pageNumber, totalPages: p.totalPages, hasNextPage: p.hasNextPage, hasPreviousPage: p.hasPreviousPage },
      message: null,
      errors: [],
    } as unknown as FeedbackListResponse;
  },

  getFeedbackDetails: async (id: number): Promise<FeedbackDetailsResponse> => {
    await fakeDelay();
    const fb = feedbacks.find(f => f.id === id);
    return { success: true, data: fb as any, message: null, errors: [] } as unknown as FeedbackDetailsResponse;
  },

  deleteFeedback: async (id: number): Promise<ApiResponse<boolean>> => {
    await fakeDelay();
    feedbacks = feedbacks.filter(f => f.id !== id);
    return { success: true, data: true, message: null, errors: [] };
  },

  getDictionary: async (): Promise<string[]> => {
    await fakeDelay();
    return [...MOCK_DEPARTMENTS];
  },

  exportFeedbacks: async (_params?: any): Promise<any> => {
    await fakeDelay();
    return feedbacks;
  },
};