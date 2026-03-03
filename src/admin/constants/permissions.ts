/**
 * Admin-level permission identifiers.
 * These map to the roles/permissions system on the back-end.
 */
export const EnumPermissions = {
  AddLocalization: "AddLocalization",
  AwarenessCampaign: "AwarenessCampaign",
  CardController: "CardController",
  CMSConfiguration: "CMSConfiguration",
  Corporate: "Corporate",
  FAQConfiguration: "FAQConfiguration",
  GeneralSettings: "GeneralSettings",
  HealthCheck: "HealthCheck",
  ManageAllSurvey: "ManageAllSurvey",
  ManageMySurvey: "ManageMySurvey",
  MilestonesCelebrations: "MilestonesCelebrations",
  Notification: "Notification",
  OperationalCalendar: "OperationalCalendar",
  RolesAndPermissions: "RolesAndPermissions",
  ServiceCatalogConfigurations: "ServiceCatalogConfigurations",
  StepsTour: "StepsTour",
  TabConfiguration: "TabConfiguration",
  UserFeedback: "UserFeedback",
  ViewAuditLogs: "ViewAuditLogs",
  WidgetConfiguration: "WidgetConfiguration",
} as const;

export type Permission = (typeof EnumPermissions)[keyof typeof EnumPermissions];
