import { useEffect, useState, useRef } from "react";

export const UnauthorizedMessage = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const hasAttempted = useRef(false);

  useEffect(() => {
    if (hasAttempted.current || isRedirecting) return;

    hasAttempted.current = true;
    setIsRedirecting(true);

    // TODO: استبدل بمنطق تسجيل الدخول الخاص بالمشروع لما يكون جاهزاً
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }, [isRedirecting]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
        <h4 className="text-muted">
          {isRedirecting ? "جاري التوجيه..." : "يرجى الانتظار..."}
        </h4>
        <p className="text-muted">
          {isRedirecting
            ? "سيتم توجيهك لصفحة تسجيل الدخول..."
            : "جاري التحضير..."}
        </p>
      </div>
    </div>
  );
};

