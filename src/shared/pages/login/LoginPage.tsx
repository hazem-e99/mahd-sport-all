import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated particles background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 180, 255, ${p.alpha})`;
        ctx.fill();
      }
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(180, 140, 255, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const role = await login(email, password);
      if (role === 'first-login') {
        navigate('/create-password', { replace: true });
      } else if (role === 'admin') {
        navigate('/admin/en', { replace: true });
      } else {
        navigate('/portal', { replace: true });
      }
    } catch {
      // handled by auth context
    }
  };

  return (
    <div className="mhd-login-wrapper">
      <canvas ref={canvasRef} className="mhd-login-canvas" />

      {/* Left panel — branding */}
      <div className="mhd-login-brand">
        <div className="mhd-login-brand__inner">
          <div className="mhd-login-brand__logo-wrap">
            <img
              src="/admin/icons/logo.icon.svg"
              alt="Mahd Sport"
              className="mhd-login-brand__logo"
            />
          </div>
          <h1 className="mhd-login-brand__name">myMahd</h1>
          <p className="mhd-login-brand__tagline">منصة مهد الرياضة</p>
          <div className="mhd-login-brand__divider" />
          <p className="mhd-login-brand__desc">
            بوابتك المتكاملة لإدارة وعرض<br />بيانات الرياضيين في أكاديمية مهد
          </p>
          <div className="mhd-login-brand__card-preview">
            <img src="/portal/assets/card-layers/Background 2-purple.svg" alt="" />
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="mhd-login-form-panel">
        <div className="mhd-login-form-wrap">
          <div className="mhd-login-form-header">
            <h2 className="mhd-login-form-title">تسجيل الدخول</h2>
            <p className="mhd-login-form-sub">أدخل بيانات حسابك للمتابعة</p>
          </div>

          {error && (
            <div className="mhd-login-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mhd-login-form">
            {/* Email */}
            <div className={`mhd-field ${focused === 'email' ? 'mhd-field--focused' : ''} ${email ? 'mhd-field--has-value' : ''}`}>
              <label className="mhd-field__label" htmlFor="login-email">البريد الإلكتروني</label>
              <div className="mhd-field__input-wrap">
                <svg className="mhd-field__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="M22 7L13.03 12.7a1.94 1.94 0 01-2.06 0L2 7" />
                </svg>
                <input
                  id="login-email"
                  type="email"
                  className="mhd-field__input"
                  placeholder="example@mahd.sa"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  required
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password */}
            <div className={`mhd-field ${focused === 'password' ? 'mhd-field--focused' : ''} ${password ? 'mhd-field--has-value' : ''}`}>
              <label className="mhd-field__label" htmlFor="login-password">كلمة المرور</label>
              <div className="mhd-field__input-wrap">
                <svg className="mhd-field__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="mhd-field__input"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  required
                  dir="ltr"
                />
                <button
                  type="button"
                  className="mhd-field__eye"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              className={`mhd-login-btn ${isLoading ? 'mhd-login-btn--loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="mhd-login-spinner" />
                  <span>جاري تسجيل الدخول...</span>
                </>
              ) : (
                <>
                  <span>تسجيل الدخول</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <p className="mhd-login-footer">Mahd Sport Platform &copy; 2026</p>
        </div>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .mhd-login-wrapper {
          min-height: 100vh;
          display: flex;
          font-family: 'Cairo', 'TheMixArabic', 'Janna LT', Arial, sans-serif;
          background: #0e0820;
          position: relative;
          overflow: hidden;
          direction: rtl;
        }

        .mhd-login-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        /* ── LEFT BRAND PANEL ── */
        .mhd-login-brand {
          flex: 0 0 45%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          background: linear-gradient(160deg, #773dbd 0%, #4a1d8c 50%, #2d0f6b 100%);
          padding: 48px 40px;
          overflow: hidden;
        }
        .mhd-login-brand::before {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          top: -180px; right: -180px;
        }
        .mhd-login-brand::after {
          content: '';
          position: absolute;
          width: 350px; height: 350px;
          border-radius: 50%;
          background: rgba(255,255,255,0.03);
          bottom: -100px; left: -100px;
        }
        .mhd-login-brand__inner {
          position: relative;
          z-index: 2;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .mhd-login-brand__logo-wrap {
          width: 100px; height: 100px;
          background: rgba(255,255,255,0.1);
          border-radius: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }
        .mhd-login-brand__logo {
          width: 68px; height: 68px;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .mhd-login-brand__name {
          font-size: 36px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          line-height: 1;
        }
        .mhd-login-brand__tagline {
          font-size: 16px;
          color: rgba(255,255,255,0.75);
          font-weight: 500;
        }
        .mhd-login-brand__divider {
          width: 48px; height: 3px;
          background: rgba(255,255,255,0.25);
          border-radius: 2px;
        }
        .mhd-login-brand__desc {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          line-height: 1.8;
          text-align: center;
        }
        .mhd-login-brand__card-preview {
          margin-top: 12px;
          width: 200px;
          opacity: 0.22;
          filter: drop-shadow(0 16px 32px rgba(0,0,0,0.4));
          animation: cardFloat 4s ease-in-out infinite;
        }
        .mhd-login-brand__card-preview img {
          width: 100%;
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-12px) rotate(-3deg); }
        }

        /* ── RIGHT FORM PANEL ── */
        .mhd-login-form-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          padding: 48px 40px;
          background: rgba(255,255,255,0.015);
        }
        .mhd-login-form-wrap {
          width: 100%;
          max-width: 420px;
          animation: fadeUp 0.6s ease-out both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Header */
        .mhd-login-form-header { margin-bottom: 36px; }
        .mhd-login-form-title {
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 6px;
          letter-spacing: -0.3px;
        }
        .mhd-login-form-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          font-weight: 400;
        }

        /* Error */
        .mhd-login-error {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(195, 7, 52, 0.12);
          border: 1px solid rgba(195, 7, 52, 0.3);
          border-radius: 10px;
          color: #ff6b8a;
          font-size: 13px;
          margin-bottom: 20px;
        }

        /* Form */
        .mhd-login-form { display: flex; flex-direction: column; gap: 20px; }

        /* Field */
        .mhd-field { display: flex; flex-direction: column; gap: 8px; }
        .mhd-field__label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          transition: color 0.2s;
        }
        .mhd-field--focused .mhd-field__label {
          color: #b794f4;
        }
        .mhd-field__input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .mhd-field__icon {
          position: absolute;
          right: 14px;
          width: 18px; height: 18px;
          color: rgba(255,255,255,0.25);
          pointer-events: none;
          transition: color 0.2s;
          flex-shrink: 0;
        }
        .mhd-field--focused .mhd-field__icon { color: #773dbd; }
        .mhd-field__input {
          width: 100%;
          padding: 13px 46px 13px 46px;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          color: #fff;
          font-size: 15px;
          font-family: inherit;
          transition: all 0.25s;
          outline: none;
        }
        .mhd-field__input::placeholder { color: rgba(255,255,255,0.2); font-size: 14px; }
        .mhd-field__input:focus {
          border-color: #773dbd;
          background: rgba(119,61,189,0.1);
          box-shadow: 0 0 0 3px rgba(119,61,189,0.2);
        }
        .mhd-field__eye {
          position: absolute;
          left: 12px;
          background: none; border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.3);
          padding: 4px;
          display: flex;
          transition: color 0.2s;
        }
        .mhd-field__eye:hover { color: rgba(255,255,255,0.7); }

        /* Submit button */
        .mhd-login-btn {
          margin-top: 8px;
          padding: 14px 24px;
          background: linear-gradient(135deg, #773dbd 0%, #5a2d91 100%);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(119,61,189,0.35);
          letter-spacing: 0.3px;
        }
        .mhd-login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(119,61,189,0.5);
          background: linear-gradient(135deg, #8a52cc 0%, #6a3aaa 100%);
        }
        .mhd-login-btn:active:not(:disabled) { transform: translateY(0); }
        .mhd-login-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .mhd-login-btn--loading { pointer-events: none; }

        /* Spinner */
        .mhd-login-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Footer */
        .mhd-login-footer {
          margin-top: 32px;
          text-align: center;
          font-size: 12px;
          color: rgba(255,255,255,0.2);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .mhd-login-wrapper { flex-direction: column; }
          .mhd-login-brand { flex: 0 0 auto; padding: 40px 24px 32px; }
          .mhd-login-brand__card-preview { display: none; }
          .mhd-login-brand__desc { display: none; }
          .mhd-login-form-panel { padding: 32px 24px; }
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
