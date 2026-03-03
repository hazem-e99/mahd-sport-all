import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/context/AuthContext';
import { UserManagementService } from '@admin/api/services/UserManagementService';
import '../login/LoginPage.scss';

// ── Icons ──────────────────────────────────────────────────────────────────────
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);
const IconEyeOpen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconSuccess = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────────
const CreateNewPasswordPage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [newPass, setNewPass]         = useState('');
  const [confirm, setConfirm]         = useState('');
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused]         = useState<'new' | 'confirm' | null>(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');
  const [success, setSuccess]         = useState(false);

  const rules = [
    { label: '8 أحرف على الأقل',  ok: newPass.length >= 8 },
    { label: 'حرف كبير (A-Z)',     ok: /[A-Z]/.test(newPass) },
    { label: 'رقم (0-9)',          ok: /[0-9]/.test(newPass) },
  ];

  const validate = () => {
    if (newPass.length < 8)         return 'كلمة المرور يجب ألا تقل عن 8 أحرف';
    if (!/[A-Z]/.test(newPass))     return 'يجب أن تحتوي على حرف كبير';
    if (!/[0-9]/.test(newPass))     return 'يجب أن تحتوي على رقم';
    if (newPass !== confirm)         return 'كلمة المرور وتأكيدها غير متطابقتين';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    if (!user?.email) { setError('المستخدم غير موجود'); return; }

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
      setError('فشل تغيير كلمة المرور. حاول مجدداً.');
    } finally {
      setLoading(false);
    }
  };

  const newClass     = `login-field login-field--has-eye${focused === 'new'     ? ' login-field--focused' : ''}`;
  const confirmClass = `login-field login-field--has-eye${focused === 'confirm' ? ' login-field--focused' : ''}`;

  return (
    <div className="login">
      <main className="login__panel">
        <div className="login__card">

          {success ? (
            /* ── Success state ──────────────────────────────────────────────── */
            <div className="login__success">
              <div className="login__success-icon">
                <IconSuccess />
              </div>
              <h2 className="login__title" style={{ textAlign: 'center', marginBottom: 8 }}>
                تم تغيير كلمة المرور!
              </h2>
              <p className="login__subtitle" style={{ textAlign: 'center' }}>
                جاري تحويلك…
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <header className="login__card-header">
                <p className="login__greeting">أول تسجيل دخول •</p>
                <h1 className="login__title">إنشاء كلمة مرور جديدة</h1>
                <p className="login__subtitle">اختر كلمة مرور قوية لحماية حسابك</p>
              </header>

              {/* Error */}
              {error && (
                <div className="login__error" role="alert">
                  <IconAlert />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="login__form" noValidate>

                {/* New password */}
                <div className={newClass}>
                  <label className="login-field__label" htmlFor="cp-new">
                    كلمة المرور الجديدة
                  </label>
                  <div className="login-field__wrap">
                    <span className="login-field__icon"><IconLock /></span>
                    <input
                      id="cp-new"
                      type={showNew ? 'text' : 'password'}
                      className="login-field__input"
                      placeholder="••••••••"
                      value={newPass}
                      onChange={e => setNewPass(e.target.value)}
                      onFocus={() => setFocused('new')}
                      onBlur={() => setFocused(null)}
                      required
                      dir="ltr"
                    />
                    <button
                      type="button"
                      className="login-field__eye"
                      onClick={() => setShowNew(v => !v)}
                      tabIndex={-1}
                      aria-label={showNew ? 'إخفاء' : 'إظهار'}
                    >
                      {showNew ? <IconEyeOff /> : <IconEyeOpen />}
                    </button>
                  </div>

                  {/* Strength hints */}
                  <ul className="login__hints">
                    {rules.map(r => (
                      <li key={r.label} className={r.ok ? 'login__hint login__hint--ok' : 'login__hint'}>
                        <span className="login__hint-icon"><IconCheck /></span>
                        {r.label}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Confirm password */}
                <div className={confirmClass}>
                  <label className="login-field__label" htmlFor="cp-confirm">
                    تأكيد كلمة المرور
                  </label>
                  <div className="login-field__wrap">
                    <span className="login-field__icon"><IconLock /></span>
                    <input
                      id="cp-confirm"
                      type={showConfirm ? 'text' : 'password'}
                      className="login-field__input"
                      placeholder="••••••••"
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                      onFocus={() => setFocused('confirm')}
                      onBlur={() => setFocused(null)}
                      required
                      dir="ltr"
                    />
                    <button
                      type="button"
                      className="login-field__eye"
                      onClick={() => setShowConfirm(v => !v)}
                      tabIndex={-1}
                      aria-label={showConfirm ? 'إخفاء' : 'إظهار'}
                    >
                      {showConfirm ? <IconEyeOff /> : <IconEyeOpen />}
                    </button>
                  </div>
                  {confirm && newPass !== confirm && (
                    <p className="login__hint login__hint--error">كلمتا المرور غير متطابقتين</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="login__submit"
                  disabled={loading || !newPass || !confirm}
                >
                  {loading ? (
                    <>
                      <span className="login__spinner" aria-hidden="true" />
                      <span>جاري الحفظ…</span>
                    </>
                  ) : (
                    <span>حفظ وتسجيل الدخول</span>
                  )}
                </button>
              </form>
            </>
          )}

          <p className="login__footer">
            Mahd Sport Platform &copy; {new Date().getFullYear()}
          </p>
        </div>
      </main>
    </div>
  );
};

export default CreateNewPasswordPage;
