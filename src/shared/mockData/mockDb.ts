/**
 * ============================================================
 * MOCK DATABASE  –  Mahd-All Project
 * كل البيانات الثابتة للمشروع بدون أي اتصال بالباك إيند
 * ============================================================
 */

// ─────────────────────────────────────────────
// ACCOUNTS  (login credentials)
// ─────────────────────────────────────────────
export const MOCK_ACCOUNTS = [
    {
        email: 'admin@mahd.sa',
        password: 'admin123',
        name: 'مدير النظام',
        canAccessAdmin: true,
        permissions: ['read', 'write', 'delete', 'manage'],
        isFirstLogin: false,
    },
    {
        email: 'user@mahd.sa',
        password: 'user123',
        name: 'مستخدم البوابة',
        canAccessAdmin: false,
        permissions: ['read'],
        isFirstLogin: false,
    },
];

// ─────────────────────────────────────────────
// MANAGED USERS  (Manage Users page)
// ─────────────────────────────────────────────
export interface ManagedUser {
    id: string;
    email: string;
    name: string;
    roleId: string;
    roleName: string;
    permissions: string[];
    isFirstLogin: boolean;
    tempPassword: string;
    password: string;
    canAccessAdmin: boolean;
    createdAt: string;
    status: 'active' | 'inactive';
}

export let MOCK_MANAGED_USERS: ManagedUser[] = [
    {
        id: '1',
        email: 'manager@mahd.sa',
        name: 'مدير المحتوى',
        roleId: '2',
        roleName: 'Coach',
        permissions: ['read', 'write'],
        isFirstLogin: true,
        tempPassword: 'Temp@1234',
        password: 'Temp@1234',
        canAccessAdmin: true,
        createdAt: '2026-03-01T10:00:00',
        status: 'active',
    },
];


// ─────────────────────────────────────────────
// EMPLOYEES  (CardControl / Portal)
// ─────────────────────────────────────────────
export const MOCK_EMPLOYEES = [
    { id: 1, fullNameEn: 'Abdulkarim Al-Ghanem', fullNameAr: 'عبدالكريم الغانم', email: 'abdulkarim.ghanem@mahd.gov.sa', department: 'Football', jobTitle: 'Football Coach', status: true, orderIndex: 1, photoPath: '/portal/assets/players/football/Abdulkarim Al-Ghanem.png' },
    { id: 2, fullNameEn: 'Abdullah Al-Jaryan', fullNameAr: 'عبدالله الجريان', email: 'abdullah.jaryan@mahd.gov.sa', department: 'Football', jobTitle: 'Football Analyst', status: true, orderIndex: 2, photoPath: '/portal/assets/players/football/Abdullah Al-Jaryan.png' },
    { id: 3, fullNameEn: 'Abdullah Baroum', fullNameAr: 'عبدالله باروم', email: 'abdullah.baroum@mahd.gov.sa', department: 'Football', jobTitle: 'Head of Football', status: true, orderIndex: 3, photoPath: '/portal/assets/players/football/Abdullah Baroum.png' },
    { id: 4, fullNameEn: 'Ali Tolbah', fullNameAr: 'علي طلبة', email: 'ali.tolbah@mahd.gov.sa', department: 'Football', jobTitle: 'Technical Advisor', status: false, orderIndex: 4, photoPath: '/portal/assets/players/football/Ali Tolbah.png' },
    { id: 5, fullNameEn: 'Fahad Al-Wuhaimer', fullNameAr: 'فهد الوحيمر', email: 'fahad.wuhaimer@mahd.gov.sa', department: 'Football', jobTitle: 'Scout', status: true, orderIndex: 5, photoPath: '/portal/assets/players/football/Fahad Al-Wuhaimer.png' },
    { id: 6, fullNameEn: 'Khaled Niazi', fullNameAr: 'خالد نيازي', email: 'khaled.niazi@mahd.gov.sa', department: 'Football', jobTitle: 'Fitness Coach', status: true, orderIndex: 6, photoPath: '/portal/assets/players/football/Khaled Niazi.png' },
    { id: 7, fullNameEn: 'Murad Kaabi', fullNameAr: 'مراد الكعبي', email: 'murad.kaabi@mahd.gov.sa', department: 'Football', jobTitle: 'Goalkeeper Coach', status: true, orderIndex: 7, photoPath: '/portal/assets/players/football/Murad Kaabi.png' },
    { id: 8, fullNameEn: 'Salem Al-Shaibani', fullNameAr: 'سالم الشيباني', email: 'salem.shaibani@mahd.gov.sa', department: 'Football', jobTitle: 'Youth Coach', status: false, orderIndex: 8, photoPath: '/portal/assets/players/football/Salem Al-Shaibani.png' },
    { id: 9, fullNameEn: 'Suleiman Azhar', fullNameAr: 'سليمان أزهر', email: 'suleiman.azhar@mahd.gov.sa', department: 'Football', jobTitle: 'Tactical Analyst', status: true, orderIndex: 9, photoPath: '/portal/assets/players/football/Suleiman Azhar.png' },
    { id: 10, fullNameEn: 'Maryam Al-Qanaterah', fullNameAr: 'مريم القناطرة', email: 'maryam.qanaterah@mahd.gov.sa', department: 'Judo', jobTitle: 'Judo Athlete', status: true, orderIndex: 10, photoPath: '/portal/assets/players/judo/Maryam Al-Qanaterah.png' },
    { id: 11, fullNameEn: 'Abdullah Al-Ghamdi', fullNameAr: 'عبدالله الغامدي', email: 'abdullah.ghamdi@mahd.gov.sa', department: 'Judo', jobTitle: 'Judo Coach', status: true, orderIndex: 11, photoPath: '/portal/assets/players/judo/Abdullah Al-Ghamdi.png' },
    { id: 12, fullNameEn: 'Lina Al-Haythami', fullNameAr: 'لينا الهيثمي', email: 'lina.haythami@mahd.gov.sa', department: 'Judo', jobTitle: 'Judo Athlete', status: true, orderIndex: 12, photoPath: '/portal/assets/players/judo/Lina Al-Haythami.png' },
    { id: 13, fullNameEn: 'Murad Alwan', fullNameAr: 'مراد علوان', email: 'murad.alwan@mahd.gov.sa', department: 'Judo', jobTitle: 'Judo Athlete', status: false, orderIndex: 13, photoPath: '/portal/assets/players/judo/Murad Alwan.png' },
    { id: 14, fullNameEn: 'Rayan Al-Qahtani', fullNameAr: 'ريان القحطاني', email: 'rayan.qahtani@mahd.gov.sa', department: 'Judo', jobTitle: 'Judo Athlete', status: true, orderIndex: 14, photoPath: '/portal/assets/players/judo/Rayan Al-Qahtani.png' },
    { id: 15, fullNameEn: 'Ahmed Hisham', fullNameAr: 'أحمد هشام', email: 'ahmed.hisham@mahd.gov.sa', department: 'Athletics', jobTitle: 'Sprint Coach', status: true, orderIndex: 15, photoPath: '/portal/assets/players/athletics/Ahmed Hisham.png' },
    { id: 16, fullNameEn: 'Amna Ali', fullNameAr: 'آمنة علي', email: 'amna.ali@mahd.gov.sa', department: 'Athletics', jobTitle: 'Athletics Athlete', status: true, orderIndex: 16, photoPath: '/portal/assets/players/athletics/Amna ALi.png' },
    { id: 17, fullNameEn: 'Aws Al-Qahtani', fullNameAr: 'أوس القحطاني', email: 'aws.qahtani@mahd.gov.sa', department: 'Athletics', jobTitle: 'Discus Throw Athlete', status: true, orderIndex: 17, photoPath: '/portal/assets/players/athletics/Aws Al-Qahtani.png' },
    { id: 18, fullNameEn: 'Jilan Ibrahim', fullNameAr: 'جيلان إبراهيم', email: 'jilan.ibrahim@mahd.gov.sa', department: 'Tennis', jobTitle: 'Tennis Athlete', status: false, orderIndex: 18, photoPath: '/portal/assets/players/tennis/Jilan Ibrahim.png' },
    { id: 19, fullNameEn: 'Hatoon Abdulmohsen', fullNameAr: 'هتون عبدالمحسن', email: 'hatoon.abdulmohsen@mahd.gov.sa', department: 'Taekwondo', jobTitle: 'Taekwondo Athlete', status: true, orderIndex: 19, photoPath: '/portal/assets/players/taekwondo/Hatoon Abdulmohsen.png' },
    { id: 20, fullNameEn: 'Abdulqader Al-Shahrani', fullNameAr: 'عبدالقادر الشهراني', email: 'abdulqader.tkd@mahd.gov.sa', department: 'Taekwondo', jobTitle: 'Taekwondo Coach', status: true, orderIndex: 20, photoPath: '/portal/assets/players/taekwondo/Abdulqader Al-Shahrani.png' },
];

export const MOCK_DEPARTMENTS = [
    'Football', 'Judo', 'Athletics', 'Tennis', 'Taekwondo', 'Swimming',
];

// ─────────────────────────────────────────────
// CAMPAIGNS
// ─────────────────────────────────────────────
export const MOCK_CAMPAIGNS = [
    { id: 1, name: 'حملة الموسم الجديد', campaignTypeId: 1, campaignTypeName: 'إعلان', startDate: '2026-01-01', endDate: '2026-03-01', visibleToId: 1, visibleToName: 'الجميع', description: 'حملة ترويجية لموسم 2026', image: '', link: '', statusName: 'نشطة', allowedRoleIds: [] },
    { id: 2, name: 'حملة كأس الأكاديمية', campaignTypeId: 2, campaignTypeName: 'حدث', startDate: '2026-02-01', endDate: '2026-04-30', visibleToId: 2, visibleToName: 'الإداريون', description: 'كأس أكاديمية مهد السنوي', image: '', link: '', statusName: 'نشطة', allowedRoleIds: [1, 2] },
    { id: 3, name: 'حملة التسجيل الصيفي', campaignTypeId: 1, campaignTypeName: 'إعلان', startDate: '2026-06-01', endDate: '2026-08-31', visibleToId: 1, visibleToName: 'الجميع', description: 'تسجيل الموسم الصيفي 2026', image: '', link: '', statusName: 'مجدولة', allowedRoleIds: [] },
];

export const MOCK_CAMPAIGN_TYPES = [
    { id: 1, name: 'إعلان', nameLa: 'Announcement' },
    { id: 2, name: 'حدث', nameLa: 'Event' },
    { id: 3, name: 'عرض خاص', nameLa: 'Special Offer' },
];

export const MOCK_VISIBILITY_OPTIONS = [
    { key: '1', value: 'الجميع' },
    { key: '2', value: 'الإداريون فقط' },
    { key: '3', value: 'المدربون فقط' },
];

export const MOCK_APP_ROLES = [
    { key: '1', value: 'Admin' },
    { key: '2', value: 'Coach' },
    { key: '3', value: 'Analyst' },
    { key: '4', value: 'Viewer' },
];

// ─────────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────────
export const MOCK_NOTIFICATIONS = [
    { id: 1, title: 'مرحباً بك في منصة مهد', titleLa: 'Welcome to Mahd Platform', body: 'تم تفعيل حسابك بنجاح', bodyLa: 'Your account has been activated', status: 1, statusName: 'مرسلة', audience: 1, audienceName: 'الجميع', sendDate: '2026-01-15T10:00:00', type: 1, allowedRoleIds: [] },
    { id: 2, title: 'تحديث النظام', titleLa: 'System Update', body: 'سيتم تحديث النظام يوم الجمعة', bodyLa: 'System will be updated on Friday', status: 2, statusName: 'مجدولة', audience: 2, audienceName: 'الإداريون', sendDate: '2026-03-07T08:00:00', type: 1, allowedRoleIds: [1] },
    { id: 3, title: 'بطولة كرة القدم', titleLa: 'Football Tournament', body: 'ابدأ التسجيل الآن', bodyLa: 'Register now for Football Tournament', status: 1, statusName: 'مرسلة', audience: 1, audienceName: 'الجميع', sendDate: '2026-02-20T09:00:00', type: 2, allowedRoleIds: [] },
];

// ─────────────────────────────────────────────
// SURVEYS
// ─────────────────────────────────────────────
export const MOCK_SURVEYS = [
    { id: 1, name: 'استبيان رضا الرياضيين', nameLa: 'Athlete Satisfaction Survey', description: 'قياس رضا الرياضيين عن الخدمات', startDate: '2026-01-01', endDate: '2026-06-30', status: 1, statusName: 'نشط', surveyMode: 1, responses: 42, totalResponses: 100 },
    { id: 2, name: 'استبيان تقييم المدربين', nameLa: 'Coaches Evaluation Survey', description: 'تقييم أداء المدربين', startDate: '2026-02-01', endDate: '2026-05-31', status: 1, statusName: 'نشط', surveyMode: 0, responses: 28, totalResponses: 80 },
    { id: 3, name: 'استبيان الرياضة المفضلة', nameLa: 'Favorite Sport Survey', description: 'معرفة الرياضة المفضلة للرياضيين', startDate: '2025-11-01', endDate: '2025-12-31', status: 2, statusName: 'منتهي', surveyMode: 0, responses: 95, totalResponses: 95 },
];

// ─────────────────────────────────────────────
// AUDIT LOGS
// ─────────────────────────────────────────────
export const MOCK_AUDIT_LOGS = [
    { id: 1, timestamp: '2026-03-01T10:30:00', username: 'admin@mahd.gov.sa', action: 'Create', entityName: 'Campaign', details: 'تم إنشاء حملة جديدة', userId: 1, roleName: 'Admin', ipAddress: '192.168.1.1' },
    { id: 2, timestamp: '2026-03-01T11:15:00', username: 'admin@mahd.gov.sa', action: 'Update', entityName: 'Employee', details: 'تم تحديث بيانات الموظف', userId: 1, roleName: 'Admin', ipAddress: '192.168.1.1' },
    { id: 3, timestamp: '2026-03-01T12:00:00', username: 'admin@mahd.gov.sa', action: 'Delete', entityName: 'Survey', details: 'تم حذف الاستبيان', userId: 1, roleName: 'Admin', ipAddress: '192.168.1.2' },
    { id: 4, timestamp: '2026-03-02T09:00:00', username: 'user@mahd.gov.sa', action: 'Read', entityName: 'Notification', details: 'تم عرض الإشعارات', userId: 2, roleName: 'Viewer', ipAddress: '192.168.1.5' },
    { id: 5, timestamp: '2026-03-02T09:45:00', username: 'admin@mahd.gov.sa', action: 'Create', entityName: 'Notification', details: 'تم إنشاء إشعار جديد', userId: 1, roleName: 'Admin', ipAddress: '192.168.1.1' },
];

export const MOCK_AUDIT_ENTITIES = [
    { key: 'Campaign', value: 'الحملات' },
    { key: 'Employee', value: 'الموظفون' },
    { key: 'Survey', value: 'الاستبيانات' },
    { key: 'Notification', value: 'الإشعارات' },
    { key: 'Tab', value: 'التبويبات' },
];

// ─────────────────────────────────────────────
// FAQS
// ─────────────────────────────────────────────
export const MOCK_FAQS = [
    { id: 1, questionArabic: 'كيف أسجل دخولي؟', questionEnglish: 'How do I log in?', descriptionArabic: 'أدخل بريدك الإلكتروني وكلمة المرور', descriptionEnglish: 'Enter your email and password', category: { value: 1, label: 'عام' }, status: true },
    { id: 2, questionArabic: 'كيف أغير كلمة المرور؟', questionEnglish: 'How to change my password?', descriptionArabic: 'اذهب إلى الإعدادات وانقر تغيير كلمة المرور', descriptionEnglish: 'Go to settings and click change password', category: { value: 1, label: 'عام' }, status: true },
    { id: 3, questionArabic: 'ما هي الرياضات المتاحة؟', questionEnglish: 'What sports are available?', descriptionArabic: 'كرة القدم، الجودو، ألعاب القوى، التنس، التايكواندو، السباحة', descriptionEnglish: 'Football, Judo, Athletics, Tennis, Taekwondo, Swimming', category: { value: 2, label: 'الرياضات' }, status: true },
    { id: 4, questionArabic: 'كيف أتواصل مع الدعم؟', questionEnglish: 'How to contact support?', descriptionArabic: 'تواصل معنا عبر البريد الإلكتروني support@mahd.gov.sa', descriptionEnglish: 'Contact us at support@mahd.gov.sa', category: { value: 1, label: 'عام' }, status: false },
];

export const MOCK_FAQ_CATEGORIES = [
    { id: 1, arabicName: 'عام', englishName: 'General' },
    { id: 2, arabicName: 'الرياضات', englishName: 'Sports' },
    { id: 3, arabicName: 'التقنية', englishName: 'Technical' },
];

// ─────────────────────────────────────────────
// FEEDBACK
// ─────────────────────────────────────────────
export const MOCK_FEEDBACKS = [
    { id: 1, userName: 'أحمد محمد', department: 'Football', rating: 5, comment: 'خدمة ممتازة جداً', createdAt: '2026-02-10T10:00:00', status: 'New' },
    { id: 2, userName: 'سارة أحمد', department: 'Judo', rating: 4, comment: 'التطبيق سهل الاستخدام', createdAt: '2026-02-12T11:00:00', status: 'Reviewed' },
    { id: 3, userName: 'خالد عمر', department: 'Athletics', rating: 3, comment: 'يحتاج تحسينات بسيطة', createdAt: '2026-02-15T14:00:00', status: 'New' },
    { id: 4, userName: 'نورة سعد', department: 'Tennis', rating: 5, comment: 'رائع ومميز', createdAt: '2026-02-18T09:00:00', status: 'Reviewed' },
    { id: 5, userName: 'محمد علي', department: 'Swimming', rating: 4, comment: 'تجربة جيدة', createdAt: '2026-02-20T16:00:00', status: 'New' },
];

export const MOCK_FEEDBACK_RATINGS = {
    averageRating: 4.2,
    totalFeedbacks: 5,
    ratingDistribution: { 5: 2, 4: 2, 3: 1, 2: 0, 1: 0 },
};

// ─────────────────────────────────────────────
// TABS  (Sidebar / Widget Tabs)
// ─────────────────────────────────────────────
export const MOCK_TABS = [
    { id: '1', name: 'الرئيسية', nameLa: 'Home', status: 1, visibility: 1, visibilityName: 'الجميع', url: '/portal', orderIndex: 1 },
    { id: '2', name: 'بطاقات اللاعبين', nameLa: 'Player Cards', status: 1, visibility: 1, visibilityName: 'الجميع', url: '/portal/cards', orderIndex: 2 },
    { id: '3', name: 'التقويم', nameLa: 'Calendar', status: 1, visibility: 2, visibilityName: 'الإداريون', url: '/portal/calendar', orderIndex: 3 },
    { id: '4', name: 'الإشعارات', nameLa: 'Notifications', status: 0, visibility: 1, visibilityName: 'الجميع', url: '/portal/notifications', orderIndex: 4 },
];

export const MOCK_TAB_VISIBILITY = [
    { key: 1, value: 'الجميع' },
    { key: 2, value: 'الإداريون' },
    { key: 3, value: 'المدربون' },
];

// ─────────────────────────────────────────────
// WIDGETS
// ─────────────────────────────────────────────
export const MOCK_WIDGETS = [
    { id: 1, name: 'بطاقات اللاعبين', nameLa: 'Player Cards', status: 1, widgetType: 1, tabWidgetCategoryId: 1, url: '/portal/cards' },
    { id: 2, name: 'التقويم التشغيلي', nameLa: 'Operational Calendar', status: 1, widgetType: 2, tabWidgetCategoryId: 1, url: '/portal/calendar' },
    { id: 3, name: 'الاستبيانات', nameLa: 'Surveys', status: 0, widgetType: 1, tabWidgetCategoryId: 2, url: '/portal/surveys' },
];

export const MOCK_WIDGET_CATEGORIES = [
    { id: '1', name: 'الرئيسية', nameLa: 'Main', deletable: false },
    { id: '2', name: 'إضافية', nameLa: 'Extra', deletable: true },
];

export const MOCK_WIDGET_TYPES = [
    { key: 1, value: 'Widget عادي' },
    { key: 2, value: 'Widget تقويم' },
    { key: 3, value: 'Service Catalog' },
];

// ─────────────────────────────────────────────
// OPERATIONAL CALENDAR
// ─────────────────────────────────────────────
export const MOCK_EVENTS = [
    { id: 1, title: 'بداية الموسم الرياضي', titleLa: 'Sports Season Start', description: 'انطلاق الموسم الرياضي 2026', startDate: '2026-01-15', endDate: '2026-01-15', visibleTo: 1, categoryId: 1, categoryName: 'أحداث رياضية' },
    { id: 2, title: 'بطولة كرة القدم الداخلية', titleLa: 'Internal Football Tournament', description: 'بطولة داخلية بين الفرق', startDate: '2026-02-10', endDate: '2026-02-20', visibleTo: 1, categoryId: 1, categoryName: 'أحداث رياضية' },
    { id: 3, title: 'فعالية الجودو', titleLa: 'Judo Event', description: 'عرض جودو أمام الجمهور', startDate: '2026-03-05', endDate: '2026-03-05', visibleTo: 2, categoryId: 2, categoryName: 'فعاليات' },
    { id: 4, title: 'اليوم التدريبي المفتوح', titleLa: 'Open Training Day', description: 'يوم تدريبي مفتوح لجميع الرياضيين', startDate: '2026-03-20', endDate: '2026-03-20', visibleTo: 1, categoryId: 2, categoryName: 'فعاليات' },
];

export const MOCK_EVENT_CATEGORIES = [
    { id: 1, name: 'أحداث رياضية', nameLa: 'Sports Events', description: '' },
    { id: 2, name: 'فعاليات', nameLa: 'Activities', description: '' },
    { id: 3, name: 'اجتماعات', nameLa: 'Meetings', description: '' },
];

// ─────────────────────────────────────────────
// ROLES
// ─────────────────────────────────────────────
export const MOCK_ROLES = [
    { id: 1, name: 'Admin', description: 'مدير النظام', permissions: ['read', 'write', 'delete', 'manage'] },
    { id: 2, name: 'Coach', description: 'مدرب', permissions: ['read', 'write'] },
    { id: 3, name: 'Analyst', description: 'محلل', permissions: ['read'] },
    { id: 4, name: 'Viewer', description: 'مشاهد', permissions: ['read'] },
];

export const MOCK_ROLES_DICTIONARY = [
    { key: '1', value: 'Admin' },
    { key: '2', value: 'Coach' },
    { key: '3', value: 'Analyst' },
    { key: '4', value: 'Viewer' },
];

// ─────────────────────────────────────────────
// TOUR STEPS
// ─────────────────────────────────────────────
export const MOCK_TOUR_STEPS = [
    { id: 1, title: 'مرحباً بك', titleLa: 'Welcome', message: 'هذا هو الدليل التعريفي بالمنصة', messageLa: 'This is the platform introduction guide', orderIndex: 1, target: '.dashboard' },
    { id: 2, title: 'لوحة التحكم', titleLa: 'Dashboard', message: 'من هنا يمكنك رؤية ملخص كل شيء', messageLa: 'Here you can see the summary of everything', orderIndex: 2, target: '.stats' },
    { id: 3, title: 'بطاقات اللاعبين', titleLa: 'Player Cards', message: 'اعرض بطاقات اللاعبين وادرها', messageLa: 'View and manage player cards', orderIndex: 3, target: '.player-cards' },
];

// ─────────────────────────────────────────────
// CONFLICT DECLARATIONS
// ─────────────────────────────────────────────
export const MOCK_CONFLICT_DECLARATIONS = [
    { id: 1, descriptionText: 'إعلان تعارض مصالح رقم 1', descriptionTextLa: 'Conflict Declaration 1', notificationMessage: 'يرجى الاطلاع على إعلان التعارض', notificationMessageLa: 'Please review the conflict declaration', createdAt: '2026-01-20T10:00:00' },
    { id: 2, descriptionText: 'إعلان تعارض مصالح رقم 2', descriptionTextLa: 'Conflict Declaration 2', notificationMessage: 'إعلان جديد متاح للمراجعة', notificationMessageLa: 'New declaration available for review', createdAt: '2026-02-15T14:00:00' },
];

// ─────────────────────────────────────────────
// TEMPORARY THEME OVERRIDES
// ─────────────────────────────────────────────
export const MOCK_THEME_OVERRIDES = [
    { id: '1', holidayName: 'اليوم الوطني السعودي', holidayNameLa: 'Saudi National Day', startDate: '2026-09-23', endDate: '2026-09-23', themeColor: '#006C35', backgroundPath: '' },
    { id: '2', holidayName: 'رمضان الكريم', holidayNameLa: 'Holy Ramadan', startDate: '2026-03-01', endDate: '2026-03-30', themeColor: '#1A237E', backgroundPath: '' },
];

// ─────────────────────────────────────────────
// LOCALIZATION
// ─────────────────────────────────────────────
export const MOCK_LOCALIZATION_ITEMS = [
    { key: 'welcome', value: 'مرحباً', culture: 'ar' },
    { key: 'welcome', value: 'Welcome', culture: 'en' },
    { key: 'dashboard', value: 'لوحة التحكم', culture: 'ar' },
    { key: 'dashboard', value: 'Dashboard', culture: 'en' },
    { key: 'logout', value: 'تسجيل الخروج', culture: 'ar' },
    { key: 'logout', value: 'Logout', culture: 'en' },
    { key: 'manage_sounds_desc', value: 'إدارة ملفات النظام الصوتية ورفعها من هنا.', culture: 'ar' },
    { key: 'manage_sounds_desc', value: 'Manage and upload system sound files here.', culture: 'en' },
    { key: 'upload_sound', value: 'رفع صوت', culture: 'ar' },
    { key: 'upload_sound', value: 'Upload Sound', culture: 'en' },
    { key: 'name_ar', value: 'الاسم (بالعربية)', culture: 'ar' },
    { key: 'name_ar', value: 'Name (Arabic)', culture: 'en' },
    { key: 'name_en', value: 'الاسم (بالانجليزية)', culture: 'ar' },
    { key: 'name_en', value: 'Name (English)', culture: 'en' },
    { key: 'player_name', value: 'اسم اللاعب', culture: 'ar' },
    { key: 'player_name', value: 'Player Name', culture: 'en' },
];

// ─────────────────────────────────────────────
// GENERAL SETTINGS
// ─────────────────────────────────────────────
export const MOCK_GENERAL_SETTINGS = {
    defaultLanguage: 'ar',
    defaultTimeZone: 'Asia/Riyadh',
    defaultMode: 'light',
    introVideoPath: '',
    birthdayCelebration: true,
    joiningCelebration: true,
    lightThemeColors: [
        { name: 'بنفسجي', nameLa: 'Purple', hexCode: '#773dbd', isDefault: true },
        { name: 'أزرق', nameLa: 'Blue', hexCode: '#1565C0', isDefault: false },
        { name: 'أخضر', nameLa: 'Green', hexCode: '#2E7D32', isDefault: false },
    ],
    darkThemeColors: [
        { name: 'بنفسجي داكن', nameLa: 'Dark Purple', hexCode: '#4a1d8c', isDefault: true },
        { name: 'أزرق داكن', nameLa: 'Dark Blue', hexCode: '#0D47A1', isDefault: false },
    ],
    backgrounds: [
        { name: 'افتراضي', nameLa: 'Default', path: '', isDefault: true },
    ],
};

export const MOCK_TIMEZONES = [
    { key: 'Asia/Riyadh', value: 'توقيت السعودية (UTC+3)' },
    { key: 'UTC', value: 'توقيت عالمي موحد (UTC)' },
    { key: 'America/New_York', value: 'نيويورك (UTC-5)' },
    { key: 'Europe/London', value: 'لندن (UTC+0)' },
];

// ─────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────
export const MOCK_HEALTH_DASHBOARD = {
    systemStatus: { uptimePercentage: 99.8, status: 'Good' as const, uptimeDuration: '14d 6h 30m' },
    activeUsers: 24,
    uptimePercentage: 99.8,
    avgResponseTime: 142,
    pageViews: Object.fromEntries(Array.from({ length: 24 }, (_, i) => [i, Math.floor(Math.random() * 120 + 10)])),
    last100Requests: Array.from({ length: 20 }, (_, i) => ({
        requestUrl: ['/api/employees', '/api/campaigns', '/api/surveys', '/api/notifications', '/api/tabs'][i % 5],
        responseTimeMs: Math.floor(Math.random() * 300 + 50),
        timestamp: new Date(Date.now() - i * 60000).toISOString(),
    })),
    top5MostUsedPages: [
        { page: '/portal', pageViews: 520, uniqueVisitors: 148 },
        { page: '/admin/en', pageViews: 310, uniqueVisitors: 32 },
        { page: '/portal/cards', pageViews: 280, uniqueVisitors: 95 },
        { page: '/admin/en/campaigns', pageViews: 190, uniqueVisitors: 18 },
        { page: '/admin/en/surveys', pageViews: 140, uniqueVisitors: 12 },
    ],
};

export const MOCK_HEALTH_LOGS = [
    { timestamp: '2026-03-02 03:00:00', userId: '1', errorCode: 200, page: '/api/employees', message: 'OK', userName: 'admin@mahd.gov.sa', level: 'info' },
    { timestamp: '2026-03-02 02:45:00', userId: '2', errorCode: 404, page: '/api/unknown', message: 'Not Found', userName: 'user@mahd.gov.sa', level: 'warning' },
    { timestamp: '2026-03-02 02:30:00', userId: '1', errorCode: 200, page: '/api/surveys', message: 'OK', userName: 'admin@mahd.gov.sa', level: 'info' },
    { timestamp: '2026-03-02 02:15:00', userId: '1', errorCode: 500, page: '/api/external', message: 'Internal Server Error', userName: 'admin@mahd.gov.sa', level: 'error' },
];

export const MOCK_MONITOR_INTEGRATION = [
    { systemName: 'MicrosoftGraph', status: 0, lastSuccessfulSync: '2026-03-02T03:00:00', details: 'Synced successfully' },
    { systemName: 'HRSystem', status: 1, lastSuccessfulSync: '2026-03-01T18:00:00', details: 'Partial sync - some records skipped' },
    { systemName: 'FinanceSystem', status: 2, lastSuccessfulSync: '2026-02-28T12:00:00', details: 'Connection timeout' },
];

// ─────────────────────────────────────────────
// FILE RECORDS
// ─────────────────────────────────────────────
export const MOCK_FILES = [
    { id: 'f1', fileName: 'صور اللاعبين', type: 'Folder', parentId: null, createdAt: '2026-01-01', contentType: '', extension: '', size: 0, filePath: '' },
    { id: 'f2', fileName: 'وثائق', type: 'Folder', parentId: null, createdAt: '2026-01-01', contentType: '', extension: '', size: 0, filePath: '' },
    { id: 'f3', fileName: 'دليل الاستخدام.pdf', type: 'File', parentId: 'f2', createdAt: '2026-01-10', size: 2048, contentType: 'application/pdf', extension: '.pdf', filePath: '/uploads/دليل الاستخدام.pdf' },
];

// ─────────────────────────────────────────────
// TAB WIDGET CATEGORIES
// ─────────────────────────────────────────────
export const MOCK_TAB_WIDGET_CATEGORIES_DICT = [
    { key: '1', value: 'الرئيسية' },
    { key: '2', value: 'إضافية' },
];

export const MOCK_TAB_WIDGET_CATEGORIES_WITH_WIDGETS = [
    {
        id: '1', name: 'الرئيسية', nameLa: 'Main', widgets: [
            { id: 1, name: 'بطاقات اللاعبين', nameLa: 'Player Cards' },
            { id: 2, name: 'التقويم التشغيلي', nameLa: 'Operational Calendar' },
        ]
    },
];

// ─────────────────────────────────────────────
// SURVEY RESULTS (Analytics)
// ─────────────────────────────────────────────
export const MOCK_SURVEY_ANALYTICS = {
    questions: [
        { id: 1, text: 'كيف تقيّم الخدمات؟', textLa: 'How do you rate services?', type: 1, options: [{ label: 'ممتاز', count: 25 }, { label: 'جيد', count: 12 }, { label: 'مقبول', count: 5 }] },
        { id: 2, text: 'هل تنصح الآخرين بالانضمام؟', textLa: 'Would you recommend?', type: 1, options: [{ label: 'نعم', count: 38 }, { label: 'لا', count: 4 }] },
    ],
};

// ─────────────────────────────────────────────
// SERVICE CATALOG PARENTS
// ─────────────────────────────────────────────
export const MOCK_SERVICE_CATALOG_PARENTS = [
    { id: 1, name: 'خدمات رياضية', nameLa: 'Sports Services' },
    { id: 2, name: 'خدمات إدارية', nameLa: 'Admin Services' },
];

// ─────────────────────────────────────────────
// HELPER: Paginate any array
// ─────────────────────────────────────────────
export function paginate<T>(
    items: T[],
    pageNumber = 1,
    pageSize = 10
): {
    items: T[];
    totalCount: number;
    pageNumber: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
} {
    const total = items.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (pageNumber - 1) * pageSize;
    const sliced = items.slice(start, start + pageSize);
    return {
        items: sliced,
        totalCount: total,
        pageNumber,
        totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
    };
}

/** Simulate async API delay (0ms in production mock) */
export const fakeDelay = () => Promise.resolve();
