/**
 * Portal-facing employees service.
 * Handles fetching/syncing employee/team data for the portal display.
 *
 * All portal API calls belong in src/portal/services/.
 * Do NOT import admin services here.
 */
import { fakeDelay } from '@shared/mockData/mockDb';

export const EmployeesService = {
  /**
   * Triggers an Azure-AD employee sync (simulated in static/mock mode).
   */
  syncFromAzureAD: async (): Promise<{ success: boolean; message: string; data: null }> => {
    await fakeDelay();
    return {
      success: true,
      message: 'Employees sync simulated (static mode)',
      data: null,
    };
  },
};
