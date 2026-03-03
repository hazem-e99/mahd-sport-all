import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../login/LoginPage.scss';

// ── Icons ──────────────────────────────────────────────────────────────────────
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="M22 7L13.03 12.7a1.94 1.94 0 01-2.06 0L2 7" />
  </svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const IconArrowBack = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);
const IconMailSent = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="52" height="52" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="M22 7L13.03 12.7a1.94 1.94 0 01-2.06 0L2 7" />
    <path d="M16 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 6H12" strokeLinecap="round" />
  </svg>
);

// ── Mock send function (replace with real API call when backend is ready) ──────
const mockSendReset = (email: string): Promise<void> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      // Accept any valid-looking email for demo purposes
      if (email.includes('@')) resolve();
      else reject(new Error('invalid'));
    }, 900)
  );

// ── Component ──────────────────────────────────────────────────────────────────
const ForgotPasswordPage = () => {
  const [email, setEmail]     = useState('');
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [sent, setSent]       = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError('يرجى إدخال البريد الإلكتروني'); return; }

    setLoading(true);
    setError('');
    try {
      await mockSendReset(email.trim());
      setSent(true);
    } catch {
      setError('تعذّر إرسال رابط الاستعادة. تحقق من البريد الإلكتروني وأعد المحاولة.');
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = `login-field${focused ? ' login-field--focused' : ''}`;

  return (
    <div className="login">
      <main className="login__panel">
        <div className="login__card">

          {sent ? (
            /* ── Success state ────────────────────────────────────────────── */
            <div className="login__success">
              <div className="login__success-icon login__success-icon--mail">
                <IconMailSent />
              </div>
              <h2 className="login__title" style={{ textAlign: 'center', marginBottom: 8 }}>
                تم إرسال الرابط!
              </h2>
              <p className="login__subtitle" style={{ textAlign: 'center', marginBottom: 28 }}>
                تحقق من بريدك الإلكتروني
                <br />
                <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{email}</strong>
                <br />
                واتبع التعليمات لإعادة تعيين كلمة المرور
              </p>
              <Link to="/login" className="login__back-link">
                <IconArrowBack />
                العودة لتسجيل الدخول
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <header className="login__card-header">
                <p className="login__greeting">استعادة الوصول •</p>
                <h1 className="login__title">نسيت كلمة المرور؟</h1>
                <p className="login__subtitle">
                  أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين
                </p>
              </header>

              {error && (
                <div className="login__error" role="alert">
                  <IconAlert />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="login__form" noValidate>
                <div className={fieldClass}>
                  <label className="login-field__label" htmlFor="fp-email">
                    البريد الإلكتروني
                  </label>
                  <div className="login-field__wrap">
                    <span className="login-field__icon"><IconMail /></span>
                    <input
                      id="fp-email"
                      type="email"
                      className="login-field__input"
                      placeholder="example@mahd.sa"
                      value={email}
                      autoComplete="email"
                      onChange={e => setEmail(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      required
                      dir="ltr"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="login__submit"
                  disabled={loading || !email}
                >
                  {loading ? (
                    <>
                      <span className="login__spinner" aria-hidden="true" />
                      <span>جاري الإرسال…</span>
                    </>
                  ) : (
                    <span>إرسال رابط الاستعادة</span>
                  )}
                </button>
              </form>

              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <Link to="/login" className="login__back-link">
                  <IconArrowBack />
                  العودة لتسجيل الدخول
                </Link>
              </div>
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

export default ForgotPasswordPage;
