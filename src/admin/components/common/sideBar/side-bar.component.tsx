import { useLocation, Link } from "react-router";
import SvgLogoicon from '@admin/components/icons/logo-icon';
import SvgHomeicon from '@admin/components/icons/home-icon';
import SvgUsersManageIcon from '@admin/components/icons/PeopleDashIcon';
import SvgUsercardicon from '@admin/components/icons/CategoryDashIcon';
import SvgTabConfigicon from '@admin/components/icons/SettingDashIcon';
import SvgAudioIcon from '@admin/components/icons/AudioDashIcon';
import type { SidebarItem } from '@admin/types/side-bar.types';
import "./side-bar.component.scss";
import { useLanguage } from '@admin/context/languageContext';

export default function SideBar() {
  const { language, getValue } = useLanguage()
  const { pathname } = useLocation();

  const sideBarList = [
    {
      id: 1,
      title: getValue("home") || "Home",
      img: <SvgHomeicon />,
      link: `/admin/${language}`
    },
    {
      id: 2,
      title: getValue("card_control"),
      img: <SvgUsercardicon />,
      link: `/admin/${language}/card-control`
    },
    {
      id: 3,
      title: getValue("sound_controller"),
      img: <SvgAudioIcon />,
      link: `/admin/${language}/sound-control`
    },
    {
      id: 4,
      title: getValue("tab_configuration"),
      img: <SvgTabConfigicon />,
      link: `/admin/${language}/GeneralSettings`,
      className: "tab-config-icon"
    },
    {
      id: 5,
      title: getValue("manage_users") || "Manage Users",
      img: <SvgUsersManageIcon />,
      link: `/admin/${language}/manage-users`,
    },
  ]

  const isActive = (link: string) => {
    if (link === `/admin/${language}`) {
      return pathname === link;
    }
    return pathname.startsWith(link);
  };


  return (
    <div className="side-bar-container">
      <div className="sideBar_sec">
        <div className="logo">
          <Link to={`/admin/${language}`}>
            <SvgLogoicon />
          </Link>
        </div>
        <div className="sidbar-list">
          <ul>
            {sideBarList.map((item: SidebarItem) => {
              const activeItem = isActive(item.link || "");
              return (
                <li
                  key={item.id}
                  className={`sidebar-item ${activeItem ? "active" : ""} ${(item as any).className || ""}`}>
                  <Link to={item.link ? item.link : ''} className="link_page">
                    {item.img}
                    <span className="icon_name">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}