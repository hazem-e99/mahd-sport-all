import DateTimeDisplay from '@portal/components/common/dateTimeDisplay/date-time-display.component';
import UserProfileMenu from '@portal/components/common/user-profilemenu/user-profilemenu.component';
import NavMenuToggle from '@portal/components/navMenuToggle/nav-menu-toggle.component';
import { useLanguage } from '@portal/context/LanguageContext';
import SvgMahadlogo from '@portal/icons/mahadlogo';
import type { Dispatch, SetStateAction } from "react";
import "./Navbar.scss";

export default function Navbar({
  setShowSettings,
}: {
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}) {
  const { language, switchLanguage } = useLanguage();

  const toggleLanguage = () => {
    switchLanguage(language === "ar" ? "en" : "ar");
  };

  const toggleSideBar = () => {
    setShowSettings((prev) => !prev);
  };

  return (
    <nav className="nav-bar">
      <a href={`/${language}/home`} className="nav-bar-logo">
        <SvgMahadlogo width={100} height={52} />
      </a>

      <div className="nav-bar-right">
        <DateTimeDisplay />
        <button onClick={toggleLanguage} className="lang">
          {language === "ar" ? "en" : "ar"}
        </button>
        <UserProfileMenu userData={null} />
        <button onClick={toggleSideBar} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
          <NavMenuToggle />
        </button>
      </div>
    </nav>
  );
}
