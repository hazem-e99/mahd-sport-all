import SvgArrowdownicon from '@portal/icons/arrowdown-icon';
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@portal/context/LanguageContext';
import { useAuth } from '@shared/context/AuthContext';
import './user-profilemenu.component.scss';

interface UserData {
    jobTitle: string;
}

interface UserProfileMenuProps {
    userData: UserData | null;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ userData }) => {
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    const [showMenu, setShowMenu] = useState(false);
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

    return (
        <div className='user-profile-menu' ref={menuRef}>
            <div className="user-profile-menu-container" onClick={toggleMenu}>
                <div className="user-profile-menu-avatar">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="user-profile-menu-info">
                    <h6>{user?.name || t('user')}</h6>
                    <span>{userData?.jobTitle || (user?.canAccessAdmin ? 'Admin' : 'Athlete')}</span>
                </div>
            </div>

            <div className="user-arow-icon" onClick={toggleMenu}>
                <SvgArrowdownicon />
            </div>

            {showMenu && (
                <div className="user-profile-dropdown">
                    <button
                        className="logout-button"
                        onClick={handleLogoutClick}
                    >
                        {t('logout')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfileMenu;
