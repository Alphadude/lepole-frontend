import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { sidebarItems } from './SidebarItem';

import { Avatar } from '@deposits/ui-kit-react';
import { useCookies } from 'react-cookie';

import {
  DropdownIcon,
  NotificationIcon2,
  LePoleLogoBlack,
  LePoleLogoWhite,
} from '../../assets/icons';

import { CustomSwitch } from '../elements';

import { H1 } from '../Headings';

const Header = () => {
  const darkState =
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light');
  const [enabled, setEnabled] = useState(darkState === 'dark' ? true : false);

  const { pathname } = useLocation();

  useEffect(() => {
    enabled
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');

    localStorage.setItem('theme', enabled ? 'dark' : 'light');
  }, [enabled]);

  const changeTheme = () => {
    setEnabled(!enabled);
  };

  const [cookies] = useCookies(['user']);

  const firstname = cookies?.user?.firstname;

  const lastname = cookies?.user?.lastname;

  const [notifications, setNotifications] = useState([]);

  return (
    <div className="flex bg-primary-white dark:bg-gray-dark-4  items-center justify-between !px-8 lg:!px-6 xl:!px-12 py-4 lg:py-8  lg:border-b border-gray-4 dark:border-gray-dark-4 ">
      <H1 className="hidden lg:block font-bold text-lg lg:text-2xl text-renaissance-black dark:text-renaissance-dark-black ">
        {sidebarItems.find((item) => pathname.includes(item.link))?.pageTitle}
      </H1>
      <div className="lg:hidden flex items-center justify-center">
        <img
          src={LePoleLogoBlack}
          alt="le pole logo"
          width={70}
          height={70}
          className=" dark:hidden"
        />
        <img
          src={LePoleLogoWhite}
          alt="le pole logo"
          width={70}
          height={70}
          className="hidden dark:inline"
        />
      </div>

      <div className="flex items-center">
        <Link to="/dashboard/notifications">
          <div className="hidden lg:block mr-6 relative">
            <div className="cursor-pointer">
              <img
                className="ml-1 dark:invert"
                src={NotificationIcon2}
                alt="notification icon"
              />
            </div>
            <div className="absolute -top-4 -right-1.5 h-6 w-6 flex items-center justify-center text-xs rounded-full bg-orange-1 text-white">
              {notifications?.length}
            </div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center cursor-pointer mr-8">
          <div className="w-[40px] h-[40px] text-[12px] mr-2 rounded-full bg-blue-light text-avatar-headerText font-medium font-montserrat flex items-center justify-center ">
            {firstname[0]}
            {lastname[0]}
          </div>

          {/* <Avatar
            avatar={{
              colorScheme: 'blue ',
              name: `Emmanuel Stephen`,
            }}
            subtle
          /> */}

          <img
            className="ml-1 dark:invert"
            src={DropdownIcon}
            alt="dropdown icon"
          />
        </div>

        <CustomSwitch onChange={changeTheme} enabled={enabled} />
      </div>
    </div>
  );
};

export default Header;
