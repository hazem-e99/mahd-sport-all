import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useLanguage } from '@admin/context/languageContext';
import type { ManagedUser } from '@shared/mockData/mockDb';

interface Props {
    user: ManagedUser;
    onClose: () => void;
}

const TempPasswordModal = ({ user, onClose }: Props) => {
    const { language, getValue } = useLanguage();
    const isRtl = language === 'ar';
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(user.tempPassword).then(() => {
            setCopied(true);
            toast.success(getValue('password_copied') || 'تم نسخ كلمة المرور');
            setTimeout(() => setCopied(false), 3000);
        });
    };

    return (
        <Modal show onHide={onClose} centered size="sm">
            <Modal.Header closeButton style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
                <Modal.Title style={{ fontSize: '16px' }}>
                    ✅ {getValue('user_added') || 'تم إضافة المستخدم'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: 'center', padding: '28px 24px' }}>
                <div className="tp-email-badge">{user.email}</div>
                <p className="tp-label">{getValue('temp_password') || 'كلمة المرور المؤقتة'}</p>
                <div className="tp-pass-box">
                    <code>{user.tempPassword}</code>
                    <button className="tp-copy-btn" onClick={handleCopy} title={getValue('copy_password') || 'نسخ'}>
                        {copied ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" />
                                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                            </svg>
                        )}
                    </button>
                </div>
                <p className="tp-note">
                    {getValue('temp_pass_note') || '📧 تم إرسال هذه الكلمة على البريد الإلكتروني. في أول دخول سيُطلب من المستخدم تغيير كلمة المرور.'}
                </p>
            </Modal.Body>

            <Modal.Footer style={{ justifyContent: 'center', direction: isRtl ? 'rtl' : 'ltr' }}>
                <button className="main-button active" onClick={onClose}>
                    {getValue('understood') || 'فهمت'}
                </button>
            </Modal.Footer>

            <style>{`
                .tp-email-badge {
                    display: inline-block;
                    background: rgba(119,61,189,0.08); color: #773dbd;
                    padding: 4px 16px; border-radius: 20px;
                    font-size: 13px; margin-bottom: 20px; direction: ltr;
                }
                .tp-label { font-size: 13px; color: #6b7280; margin-bottom: 8px; }
                .tp-pass-box {
                    display: flex; align-items: center; justify-content: center; gap: 10px;
                    background: #f8f4ff; border: 1.5px dashed #773dbd;
                    border-radius: 10px; padding: 14px 20px; margin-bottom: 16px;
                }
                .tp-pass-box code {
                    font-size: 22px; font-weight: 700; color: #4a1d8c;
                    letter-spacing: 2px; direction: ltr;
                }
                .tp-copy-btn {
                    background: none; border: none; cursor: pointer;
                    color: #773dbd; padding: 4px; display: flex; transition: transform 0.2s;
                }
                .tp-copy-btn:hover { transform: scale(1.15); }
                .tp-note { font-size: 12px; color: #9ca3af; line-height: 1.8; }
            `}</style>
        </Modal>
    );
};

export default TempPasswordModal;
