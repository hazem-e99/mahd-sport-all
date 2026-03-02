import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useLanguage } from '@admin/context/languageContext';
import type { ManagedUser } from '@shared/mockData/mockDb';

import './TempPasswordModal.scss';

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
        <Modal show onHide={onClose} centered size="sm" className="mu-temp-pass-modal">
            <Modal.Header closeButton dir={isRtl ? 'rtl' : 'ltr'}>
                <Modal.Title style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {getValue('user_added') || 'تم إضافة المستخدم'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body dir={isRtl ? 'rtl' : 'ltr'} style={{ textAlign: 'center', padding: '28px 24px' }}>
                <div className="tp-email-badge">{user.email}</div>
                <p className="tp-label">{getValue('temp_password') || 'كلمة المرور المؤقتة'}</p>
                <div className="tp-pass-box">
                    <code>{user.tempPassword}</code>
                    <button className="tp-copy-btn" onClick={handleCopy} title={getValue('copy_password') || 'نسخ'}>
                        {copied ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--alert-green-color, #10b981)' }}>
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

            <Modal.Footer style={{ justifyContent: 'center' }} dir={isRtl ? 'rtl' : 'ltr'}>
                <button className="main-button active" onClick={onClose}>
                    {getValue('understood') || 'فهمت'}
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default TempPasswordModal;
