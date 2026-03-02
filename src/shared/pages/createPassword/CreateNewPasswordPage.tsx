import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/context/AuthContext';
import { UserManagementService } from '@admin/api/services/UserManagementService';
import { useTranslation } from 'react-i18next';
import './CreateNewPasswordPage.scss';

const CreateNewPasswordPage = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Detect language from localStorage for direction
    const lang = localStorage.getItem('language') || 'ar';
    const isRtl = lang === 'ar';

    const [newPass, setNewPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const validate = () => {
        if (newPass.length < 8) return t('password_error_length') || 'كلمة المرور يجب ألا تقل عن 8 أحرف';
        if (!/[A-Z]/.test(newPass)) return t('password_error_uppercase') || 'يجب أن تحتوي على حرف كبير';
        if (!/[0-9]/.test(newPass)) return t('password_error_number') || 'يجب أن تحتوي على رقم';
        if (newPass !== confirm) return t('password_error_mismatch') || 'كلمة المرور وتأكيدها غير متطابقتين';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const err = validate();
        if (err) { setError(err); return; }

        if (!user?.email) {
            setError(t('user_not_found') || 'المستخدم غير موجود');
            return;
        }

        setLoading(true);
        setError('');
        try {
            await UserManagementService.changePassword(user.email, newPass);
            setSuccess(true);
            setTimeout(async () => {
                try {
                    const role = await login(user.email!, newPass);
                    navigate(role === 'admin' ? '/admin/en' : '/portal', { replace: true });
                } catch {
                    navigate('/login', { replace: true });
                }
            }, 1800);
        } catch {
            setError(t('password_change_failed') || 'فشل تغيير كلمة المرور. حاول مجدداً.');
        } finally {
            setLoading(false);
        }
    };

    const EyeIcon = ({ visible }: { visible: boolean }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
            {visible ? (
                <>
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                </>
            ) : (
                <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                </>
            )}
        </svg>
    );

    return (
        <div className="cnp-wrapper" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="cnp-card">
                <div className="cnp-logo">
                    <img src="/admin/icons/logo.icon.svg" alt="Mahd" />
                </div>

                {success ? (
                    <div className="cnp-success">
                        <div className="cnp-success-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="40" height="40">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3>{t('password_changed_success') || 'تم تغيير كلمة المرور بنجاح!'}</h3>
                        <p>{t('redirecting') || 'جاري تحويلك...'}</p>
                    </div>
                ) : (
                    <>
                        <div className="cnp-header">
                            <div className="cnp-key-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
                                    <circle cx="8" cy="15" r="5" />
                                    <path d="M11.5 11.5l8.5-8.5M16 8l3 3M13 5l3 3" />
                                </svg>
                            </div>
                            <h2>{t('create_new_password') || 'إنشاء كلمة مرور جديدة'}</h2>
                            <p>{t('create_new_password_subtitle') || 'مرحباً بك! هذا أول تسجيل دخول لك. يرجى إنشاء كلمة مرور جديدة لحسابك.'}</p>
                        </div>

                        {error && <div className="cnp-error">{error}</div>}

                        <form onSubmit={handleSubmit} className="cnp-form">
                            {/* New Password */}
                            <div className="cnp-field">
                                <label>{t('new_password') || 'كلمة المرور الجديدة'}</label>
                                <div className="cnp-input-wrap">
                                    <input
                                        type={showNew ? 'text' : 'password'}
                                        value={newPass}
                                        onChange={(e) => setNewPass(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        dir="ltr"
                                    />
                                    <button type="button" className="cnp-eye" onClick={() => setShowNew(!showNew)}>
                                        <EyeIcon visible={showNew} />
                                    </button>
                                </div>
                                <div className="cnp-hints">
                                    <span className={newPass.length >= 8 ? 'ok' : ''}>
                                        {t('password_min_length') || '8 أحرف على الأقل'}
                                    </span>
                                    <span className={/[A-Z]/.test(newPass) ? 'ok' : ''}>
                                        {t('password_uppercase') || 'حرف كبير'}
                                    </span>
                                    <span className={/[0-9]/.test(newPass) ? 'ok' : ''}>
                                        {t('password_number') || 'رقم'}
                                    </span>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="cnp-field">
                                <label>{t('confirm_password') || 'تأكيد كلمة المرور'}</label>
                                <div className="cnp-input-wrap">
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        value={confirm}
                                        onChange={(e) => setConfirm(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        dir="ltr"
                                    />
                                    <button type="button" className="cnp-eye" onClick={() => setShowConfirm(!showConfirm)}>
                                        <EyeIcon visible={showConfirm} />
                                    </button>
                                </div>
                                {confirm && newPass !== confirm && (
                                    <span className="cnp-mismatch-error">
                                        {t('password_mismatch') || 'كلمتا المرور غير متطابقتين'}
                                    </span>
                                )}
                            </div>

                            <button type="submit" className="cnp-submit" disabled={loading}>
                                {loading
                                    ? (t('saving_password') || 'جاري الحفظ...')
                                    : (t('save_and_login') || 'حفظ وتسجيل الدخول')
                                }
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default CreateNewPasswordPage;
