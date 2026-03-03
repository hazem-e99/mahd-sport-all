import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@shared/context/AuthContext';
import './LoginPage.scss';

// ── Icon helpers (inline SVG, no extra deps) ───────────────────────────────────
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="M22 7L13.03 12.7a1.94 1.94 0 01-2.06 0L2 7" />
  </svg>
);
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
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="17" height="17" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
// ── Component ──────────────────────────────────────────────────────────────────
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<'email' | 'password' | null>(null);
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const role = await login(email, password);
      if (role === 'first-login') navigate('/create-password', { replace: true });
      else if (role === 'admin')  navigate('/admin/en', { replace: true });
      else                        navigate('/portal', { replace: true });
    } catch {
      // error is surfaced via auth context
    }
  };

  const emailClass = `login-field${focused === 'email' ? ' login-field--focused' : ''}`;
  const passClass  = `login-field login-field--has-eye${focused === 'password' ? ' login-field--focused' : ''}`;

  return (
    <div className="login">

      {/* ── Form panel ───────────────────────────────────────────────────────── */}
      <main className="login__panel">
        <div className="login__card">

          {/* Header */}
          <header className="login__card-header">
            <p className="login__greeting">مرحباً بك •</p>
            <h1 className="login__title">تسجيل الدخول</h1>
            <p className="login__subtitle">أدخل بيانات حسابك للمتابعة</p>
          </header>

          {/* Error */}
          {error && (
            <div className="login__error" role="alert">
              <IconAlert />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="login__form" noValidate>

            {/* Email field */}
            <div className={emailClass}>
              <label className="login-field__label" htmlFor="login-email">
                البريد الإلكتروني
              </label>
              <div className="login-field__wrap">
                <span className="login-field__icon"><IconMail /></span>
                <input
                  id="login-email"
                  type="email"
                  className="login-field__input"
                  placeholder="example@mahd.sa"
                  value={email}
                  autoComplete="email"
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  required
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password field */}
            <div className={passClass}>
              <label className="login-field__label" htmlFor="login-password">
                كلمة المرور
              </label>
              <div className="login-field__wrap">
                <span className="login-field__icon"><IconLock /></span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="login-field__input"
                  placeholder="••••••••"
                  value={password}
                  autoComplete="current-password"
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  required
                  dir="ltr"
                />
                <button
                  type="button"
                  className="login-field__eye"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'عرض كلمة المرور'}
                >
                  {showPassword ? <IconEyeOff /> : <IconEyeOpen />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <Link to="/forgot-password" className="login__forgot">
              نسيت كلمة المرور؟
            </Link>

            {/* Submit */}
            <button
              type="submit"
              className="login__submit"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <>
                  <span className="login__spinner" aria-hidden="true" />
                  <span>جاري تسجيل الدخول…</span>
                </>
              ) : (
                <>
                  <span>تسجيل الدخول</span>
                  <IconArrow />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="login__footer">
            Mahd Sport Platform &copy; {new Date().getFullYear()}
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
