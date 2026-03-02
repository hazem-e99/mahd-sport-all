// import SearchBox from '@portal/components/common/searchBox/search-box.component';
import DateTimeDisplay from '@portal/components/common/dateTimeDisplay/date-time-display.component';
import NotificationBell from '@portal/components/common/notificationBell/notification-bell.component';
import UserProfileMenu from '@portal/components/common/user-profilemenu/user-profilemenu.component';
import { Link } from "react-router-dom";
import { useLanguage } from '@portal/context/languageContext';
import SvgMahadlogo from '@portal/components/icons/mahadlogo';

import "./nav-bar.component.scss";
export default function Navbar() {
    const { language, changeLanguage } = useLanguage();

    const toggleLanguage = () => {
        changeLanguage(language === "ar" ? "en" : "ar");
    };

    return (
        <nav className="nav-bar">
            <Link to={`/${language}/home`} className="nav-bar-logo">
                <SvgMahadlogo width={100} height={52} />
            </Link>
            {/* <SearchBox /> */}
            {/* <input type="text" /> */}

            <div className="navbar-right">
                <DateTimeDisplay />
                <NotificationBell />
                <button className="button-primary" onClick={toggleLanguage}>
                    {language === "ar" ? "en" : "ar"}
                </button>
                <UserProfileMenu userData={null} />
            </div>
        </nav>
    );
}
