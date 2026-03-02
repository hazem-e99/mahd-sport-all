import SvgArrowdownicon from '@admin/components/icons/arrowdown-icon';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useLanguage } from '@admin/context/languageContext';
import { useAuth } from '@shared/context/AuthContext';
import MadietConfirmModal from '@admin/components/common/MadietConfirmModal/MadietConfirmModal';
import { updateEmployeesFromAzureAD } from '@admin/api/endpoints/EmployeesApi';
import './user-profilemenu.component.scss';

interface UserData {
    jobTitle: string;
}

interface UserProfileMenuProps {
    userData: UserData | null;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ userData }) => {
    const { user, logout } = useAuth();
    const { getValue } = useLanguage();
    const [showMenu, setShowMenu] = useState(false);
    const [showSyncModal, setShowSyncModal] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const handleLogoutClick = async () => {
        logout();
    };

    const handleSyncUsersClick = () => {
        setShowSyncModal(true);
        setShowMenu(false);
    };

    const handleSyncConfirm = async () => {
        try {
            setIsSyncing(true);
            await updateEmployeesFromAzureAD();
            toast.success(getValue('sync_success'));
            setShowSyncModal(false);
        } catch (error) {
            console.log(error)
            toast.error(getValue('sync_error'));
        } finally {
            setIsSyncing(false);
        }
    };

    const handleSyncCancel = () => {
        setShowSyncModal(false);
    };
    return (
        <div className='user-profile-menu' ref={menuRef}>
            <div className="user-profile-menu-container" onClick={toggleMenu}>
                <div className="user-profile-menu-avatar">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="user-profile-menu-info">
                    <h6>{user?.name || 'User'}</h6>
                    <span>{userData?.jobTitle || (user?.canAccessAdmin ? 'Admin' : 'User')}</span>
                </div>
            </div>

            <div className="user-arow-icon" onClick={toggleMenu}>
                <SvgArrowdownicon />
            </div>

            {showMenu && (
                <div className="user-profile-dropdown">
                    <button
                        className="sync-users-button"
                        onClick={handleSyncUsersClick}
                    >
                        {getValue('sync_users')}
                    </button>
                    <button
                        className="logout-button"
                        onClick={handleLogoutClick}
                    >

                        {getValue('Logout')}
                    </button>
                </div>
            )}

            <MadietConfirmModal
                show={showSyncModal}
                onHide={handleSyncCancel}
                onConfirm={handleSyncConfirm}
                isLoading={isSyncing}
            />
        </div>
    );
};

export default UserProfileMenu;
