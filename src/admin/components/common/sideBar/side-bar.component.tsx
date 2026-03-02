import { useState } from "react";
import { Link } from "react-router";
import SvgLogoicon from '@admin/components/icons/logo-icon';
import SvgHomeicon from '@admin/components/icons/home-icon';
import SvgUsercardicon from '@admin/components/icons/usercard-icon';
import SvgTabConfigicon from '@admin/components/icons/tab-config-icon';
import SvgUsersManageIcon from '@admin/components/icons/users-manage-icon';
import type { SidebarItem } from '@admin/types/side-bar.types';
import "./side-bar.component.scss";
import { useLanguage } from '@admin/context/languageContext';

export default function SideBar() {
  const { language, getValue } = useLanguage()

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
      img: <SvgUsercardicon />,
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



  const [active] = useState<number>(1);


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
              const isActive = item.id === active;
              return (
                <li
                  key={item.id}
                  className={`sidebar-item ${isActive ? "active" : ""} ${(item as any).className || ""}`}>
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