import { useEffect, useState } from 'react';
import { Modal, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { UserManagementService, AVAILABLE_PERMISSIONS } from '@admin/api/services/UserManagementService';
import { useLanguage } from '@admin/context/languageContext';
import type { ManagedUser } from '@shared/mockData/mockDb';
import './AddUserModal.scss';

// ── Fixed roles (Admin / User only) ──────────────────
const USER_ROLES = [
    { key: 'admin', value: 'Admin' },
    { key: 'user', value: 'User' },
];

// ── Section header (same style as AddPlayerModal) ────
const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <div className="form-section-header">
        <span className="form-section-header__icon">{icon}</span>
        <span className="form-section-header__title">{title}</span>
    </div>
);

interface Props {
    show: boolean;
    onClose: () => void;
    onSuccess: (user: ManagedUser) => void;
    language: string;
}

const AddUserModal = ({ show, onClose, onSuccess }: Props) => {
    const { language, getValue } = useLanguage();
    const isRtl = language === 'ar';

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        roleId: '',
        permissions: [] as string[],
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Reset on close
    const handleClose = () => {
        setForm({ name: '', email: '', roleId: '', permissions: [] });
        setErrors({});
        onClose();
    };

    // Auto-set permissions based on role
    useEffect(() => {
        if (form.roleId === 'admin') {
            setForm(p => ({ ...p, permissions: ['read', 'write', 'delete', 'manage'] }));
        } else if (form.roleId === 'user') {
            setForm(p => ({ ...p, permissions: ['read'] }));
        }
    }, [form.roleId]);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = getValue('full_name_required') || 'الاسم مطلوب';
        if (!form.email.trim()) e.email = getValue('email_required') || 'البريد الإلكتروني مطلوب';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = getValue('email_invalid') || 'البريد غير صحيح';
        if (!form.roleId) e.roleId = getValue('role_required') || 'الدور مطلوب';
        if (form.permissions.length === 0) e.permissions = getValue('permissions_required') || 'يجب اختيار صلاحية واحدة على الأقل';
        return e;
    };

    const handlePermissionToggle = (perm: string) => {
        setForm(prev => ({
            ...prev,
            permissions: prev.permissions.includes(perm)
                ? prev.permissions.filter(p => p !== perm)
                : [...prev.permissions, perm],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        setLoading(true);
        try {
            const newUser = await UserManagementService.addUser({
                ...form,
                canAccessAdmin: form.roleId === 'admin',
            });
            toast.success(`✅ ${getValue('user_added_successfully') || 'تم إضافة المستخدم'}: ${form.email}`);
            onSuccess(newUser);
            handleClose();
        } catch {
            toast.error(getValue('user_add_failed') || 'فشلت عملية إضافة المستخدم');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            size="lg"
            centered
            className="add-user-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className="aum-title-wrap">
                        <div className="aum-title-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="9" cy="7" r="4" />
                                <path d="M2 20c0-4 3.134-7 7-7s7 3 7 7" />
                                <path d="M19 11v6M16 14h6" strokeLinecap="round" />
                            </svg>
                        </div>
                        {getValue('add_new_user') || 'إضافة مستخدم جديد'}
                    </div>
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body className="aum-body" style={{ maxHeight: '72vh', overflowY: 'auto' }}>

                    {/* ── Info Banner ───────────── */}
                    <div className="aum-info-banner">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{getValue('temp_password_info') || 'سيتم إرسال كلمة مرور مؤقتة تلقائياً على البريد الإلكتروني. في أول دخول سيُطلب تغيير كلمة المرور.'}</span>
                    </div>

                    {/* ═══ SECTION 1 — Basic Info ═══ */}
                    <SectionHeader
                        icon={
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
                                <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        }
                        title={getValue('basicInformation') || 'المعلومات الأساسية'}
                    />

                    <Row className="g-3">
                        {/* Name */}
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>
                                    {getValue('full_name') || 'الاسم الكامل'}
                                    <span className="aum-required"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.name}
                                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                    isInvalid={!!errors.name}
                                    placeholder={getValue('full_name_placeholder') || (isRtl ? 'أدخل الاسم الكامل' : 'Enter full name')}
                                />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        {/* Email */}
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>
                                    {getValue('email') || 'البريد الإلكتروني'}
                                    <span className="aum-required"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    value={form.email}
                                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                    isInvalid={!!errors.email}
                                    placeholder={getValue('email_placeholder') || 'example@mahd.sa'}
                                    dir="ltr"
                                />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* ═══ SECTION 2 — Role & Permissions ═══ */}
                    <SectionHeader
                        icon={
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                                <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        }
                        title={getValue('access_permissions') || 'الصلاحيات والدور'}
                    />

                    <Row className="g-3">
                        {/* Role */}
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>
                                    {getValue('role') || 'الدور'}
                                    <span className="aum-required"> *</span>
                                </Form.Label>
                                <div className="aum-role-pills">
                                    {USER_ROLES.map(r => (
                                        <label
                                            key={r.key}
                                            className={`aum-role-pill ${form.roleId === r.key ? 'active' : ''}`}
                                        >
                                            <input
                                                type="radio"
                                                name="role"
                                                value={r.key}
                                                checked={form.roleId === r.key}
                                                onChange={() => setForm(p => ({ ...p, roleId: r.key }))}
                                            />
                                            <span className="aum-role-pill__icon">
                                                {r.key === 'admin' ? (
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M12 2L3 7l9 5 9-5-9-5z" /><path d="M3 12l9 5 9-5" /><path d="M3 17l9 5 9-5" />
                                                    </svg>
                                                ) : (
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" />
                                                    </svg>
                                                )}
                                            </span>
                                            {r.value}
                                        </label>
                                    ))}
                                </div>
                                {errors.roleId && (
                                    <div className="aum-field-error">{errors.roleId}</div>
                                )}
                                {form.roleId && (
                                    <div className="aum-role-hint">
                                        {form.roleId === 'admin'
                                            ? (isRtl ? '🔑 سيتمكن من الوصول إلى لوحة الإدارة بكامل الصلاحيات' : '🔑 Full admin dashboard access')
                                            : (isRtl ? '👁 وصول للبوابة فقط (قراءة)' : '👁 Portal access only (read)')
                                        }
                                    </div>
                                )}
                            </Form.Group>
                        </Col>

                        {/* Permissions */}
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>{getValue('access_permissions') || 'صلاحيات الوصول'}</Form.Label>
                                <div className="aum-permissions-list">
                                    {AVAILABLE_PERMISSIONS.map(p => (
                                        <label key={p.key} className="aum-perm-row">
                                            <div className="aum-checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={form.permissions.includes(p.key)}
                                                    onChange={() => handlePermissionToggle(p.key)}
                                                    id={`perm-${p.key}`}
                                                />
                                                <span className="aum-checkbox__box">
                                                    {form.permissions.includes(p.key) && (
                                                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                                            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="aum-perm-info">
                                                <span className="aum-perm-label">{p.label}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.permissions && (
                                    <div className="aum-field-error">{errors.permissions}</div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>

                <Modal.Footer className="aum-footer">
                    <button type="button" className="main-button" onClick={handleClose} disabled={loading}>
                        {getValue('cancel') || 'إلغاء'}
                    </button>
                    <button type="submit" className="main-button active" disabled={loading}>
                        {loading
                            ? (getValue('adding') || 'جاري الإضافة...')
                            : (getValue('add_and_invite') || 'إضافة وإرسال دعوة')
                        }
                    </button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddUserModal;
