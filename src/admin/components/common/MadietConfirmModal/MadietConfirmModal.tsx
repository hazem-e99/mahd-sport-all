import { useLanguage } from '@admin/context/languageContext';
import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import './MadietConfirmModal.scss';

interface MadietConfirmModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
    isLoading: boolean;
}

const MadietConfirmModal: React.FC<MadietConfirmModalProps> = ({
    show,
    onHide,
    onConfirm,
    isLoading
}) => {
    const { getValue } = useLanguage();

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop={true}
            keyboard={!isLoading}
            centered={true}
            className="madiet-confirm-modal"
        >
            <Modal.Header closeButton={!isLoading}>
                <Modal.Title>{getValue('sync_confirmation_title')}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className="confirmation-message">
                    {getValue('sync_confirmation_message')}
                </p>
            </Modal.Body>

            <Modal.Footer>
                <button
                    type="button"
                    className="main-button"
                    onClick={onHide}
                    disabled={isLoading}
                >
                    {getValue('cancel')}
                </button>
                <button
                    type="button"
                    className="main-button active ms-2"
                    onClick={onConfirm}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            {getValue('syncing_users')}
                        </>
                    ) : (
                        getValue('yes')
                    )}
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default MadietConfirmModal;