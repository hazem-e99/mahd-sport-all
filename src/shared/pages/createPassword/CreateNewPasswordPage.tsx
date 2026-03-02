import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/context/AuthContext';
import { UserManagementService } from '@admin/api/services/UserManagementService';
import { useTranslation } from 'react-i18next';

function CreateNewPasswordPage() {
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
    const [done, setDone] = useState(false);

    const validate = () => {
        if (newPass.length < 8) return t('password_error_length') || 'كلمة المرور يجب ألا تقل عن 8 أحرف';
        if (!/[A-Z]/.test(newPass)) return t('password_error_uppercase') || 'يجب أن تحتوي على حرف كبير';
        if (!/[0-9]/.test(newPass)) return t('password_error_number') || 'يجب أن تحتوي على رقم';
        if (newPass !== confirm) return t('password_error_mismatch') || 'كلمة المرور وتأكيدها غير متطابقتين';
        return '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const err = validate();
        if (err) { setError(err); return; }

        setLoading(true);
        setError('');
        try {
            await UserManagementService.changePassword(user!.email!, newPass);
            setDone(true);
            setTimeout(async () => {
                try {
                    const role = await login(user!.email!, newPass);
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

    const EyeIcon = ({ visible }: { visible: boolean }) => visible ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );

    return (
        <div className="cnp-wrapper" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="cnp-card">
                <div className="cnp-logo">
                    <img src="/admin/icons/logo.icon.svg" alt="Mahd" />
                </div>

                {done ? (
                    <div className="cnp-success">
                        <div className="cnp-success-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" width="40" height="40">
                                <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2" />
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
                                    <path d="M13.5 9.5l7 7M17 6l3 3" />
                                </svg>
                            </div>
                            <h2>{t('create_new_password') || 'إنشاء كلمة مرور جديدة'}</h2>
                            <p>{t('create_new_password_subtitle') || 'مرحباً بك! هذا أول تسجيل دخول لك.\nيرجى إنشاء كلمة مرور جديدة لحسابك.'}</p>
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
                                        onChange={e => setNewPass(e.target.value)}
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
                                        onChange={e => setConfirm(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        dir="ltr"
                                    />
                                    <button type="button" className="cnp-eye" onClick={() => setShowConfirm(!showConfirm)}>
                                        <EyeIcon visible={showConfirm} />
                                    </button>
                                </div>
                                {confirm && newPass !== confirm && (
                                    <span style={{ fontSize: '12px', color: '#ef4444' }}>
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

            <style>{`
                .cnp-wrapper {
                    min-height: 100vh; display: flex; align-items: center; justify-content: center;
                    background: linear-gradient(135deg, #0e0820 0%, #1a0940 50%, #0e0820 100%);
                    font-family: 'Cairo', 'Mahd Favorit Arabic', Arial, sans-serif;
                    padding: 24px;
                }
                .cnp-card {
                    background: rgba(255,255,255,0.97); border-radius: 20px;
                    padding: 48px 40px; width: 100%; max-width: 440px;
                    box-shadow: 0 24px 80px rgba(0,0,0,0.4);
                    animation: fadeUp 0.5s ease-out;
                }
                @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
                .cnp-logo { text-align: center; margin-bottom: 24px; }
                .cnp-logo img { width: 56px; height: 56px; object-fit: contain; }
                .cnp-header { text-align: center; margin-bottom: 28px; }
                .cnp-key-icon {
                    width: 64px; height: 64px; background: rgba(119,61,189,0.1);
                    border-radius: 16px; display: inline-flex; align-items: center;
                    justify-content: center; color: #773dbd; margin-bottom: 16px;
                }
                .cnp-header h2 { font-size: 22px; font-weight: 800; color: #1a1a2e; margin-bottom: 8px; }
                .cnp-header p { font-size: 13px; color: #6b7280; line-height: 1.8; }
                .cnp-error {
                    background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.25);
                    border-radius: 10px; padding: 10px 14px; font-size: 13px;
                    color: #dc2626; margin-bottom: 16px; text-align: center;
                }
                .cnp-form { display: flex; flex-direction: column; gap: 20px; }
                .cnp-field { display: flex; flex-direction: column; gap: 8px; }
                .cnp-field label { font-size: 13px; font-weight: 600; color: #374151; }
                .cnp-input-wrap { position: relative; display: flex; align-items: center; }
                .cnp-input-wrap input {
                    width: 100%; padding: 12px 16px 12px 42px;
                    border: 1.5px solid #e5e7eb; border-radius: 10px;
                    font-size: 15px; outline: none; transition: border-color 0.2s;
                }
                [dir="rtl"] .cnp-input-wrap input { padding: 12px 16px 12px 42px; }
                [dir="ltr"] .cnp-input-wrap input { padding: 12px 42px 12px 16px; }
                .cnp-input-wrap input:focus { border-color: #773dbd; box-shadow: 0 0 0 3px rgba(119,61,189,0.12); }
                .cnp-eye {
                    position: absolute; right: 12px; background: none; border: none;
                    cursor: pointer; color: #9ca3af; display: flex; padding: 4px; transition: color 0.2s;
                }
                [dir="ltr"] .cnp-eye { right: auto; left: 12px; }
                .cnp-eye:hover { color: #773dbd; }
                .cnp-hints { display: flex; gap: 8px; flex-wrap: wrap; }
                .cnp-hints span {
                    font-size: 11px; color: #9ca3af; background: #f3f4f6;
                    padding: 2px 10px; border-radius: 20px; transition: all 0.2s;
                }
                .cnp-hints span.ok { color: #059669; background: rgba(16,185,129,0.1); }
                .cnp-submit {
                    padding: 14px; background: linear-gradient(135deg, #773dbd, #5a2d91);
                    color: #fff; border: none; border-radius: 12px; font-size: 15px;
                    font-weight: 700; cursor: pointer; transition: all 0.3s;
                    box-shadow: 0 4px 16px rgba(119,61,189,0.35);
                }
                .cnp-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(119,61,189,0.45); }
                .cnp-submit:disabled { opacity: 0.65; cursor: not-allowed; }
                .cnp-success { text-align: center; padding: 16px; }
                .cnp-success-icon {
                    width: 80px; height: 80px; background: rgba(16,185,129,0.1);
                    border-radius: 50%; display: inline-flex; align-items: center;
                    justify-content: center; margin-bottom: 20px;
                }
                .cnp-success h3 { font-size: 20px; font-weight: 800; color: #059669; margin-bottom: 8px; }
                .cnp-success p { color: #9ca3af; font-size: 14px; }
            `}</style>
        </div>
    );
}

export default CreateNewPasswordPage;
