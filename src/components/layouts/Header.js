import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { sidebarItems } from './SidebarItem';

import { Avatar } from '@deposits/ui-kit-react';

import {
  DropdownIcon,
  NotificationIcon2,
  LePoleLogoBlack,
  LePoleLogoWhite,
} from '../../assets/icons';

import { CustomSwitch } from '../elements';

import { H1 } from '../Headings';
import { themeCheck } from '../../helpers/functions/themeCheck';

const Header = () => {
  const darkState = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const [enabled, setEnabled] = useState((darkState === 'dark') ? true : false)

  const { pathname } = useLocation();

  useEffect(() => {
    enabled
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')

    localStorage.setItem('theme', enabled ? 'dark' : 'light');
  }, [enabled]);

  console.log(localStorage.theme);


  const changeTheme = () => {
    setEnabled(!enabled);
  };

  return (
    <div className="flex bg-primary-white dark:bg-gray-dark-4  items-center justify-between !px-4 lg:px-6 py-4 lg:py-8  lg:border-b border-gray-4 dark:border-gray-dark-4 ">
      <H1 className="hidden lg:block font-bold text-lg lg:text-2xl text-renaissance-black dark:text-renaissance-dark-black ">
        {sidebarItems.find((item) => pathname.includes(item.link))?.pageTitle}
      </H1>
      <div className="lg:hidden flex items-center justify-center">
        <img src={LePoleLogoBlack} alt="le pole logo" width={70} height={70} className=' dark:hidden' />
        <img src={LePoleLogoWhite} alt="le pole logo" width={70} height={70} className='hidden dark:inline' />
      </div>

      <div className="flex items-center">
        <div className="mr-6 hidden lg:block">
          <img
            className="ml-1"
            src={NotificationIcon2}
            alt="notification icon"
          />
        </div>

        <div className="hidden lg:flex items-center cursor-pointer mr-8">
          <Avatar
            avatar={{
              colorScheme: 'blue',
              name: 'Emmanuel Stephen',
            }}
            subtle
          />

          <img className="ml-1" src={DropdownIcon} alt="dropdown icon" />
        </div>

        <CustomSwitch onChange={changeTheme} enabled={enabled} />
      </div>
    </div>
  );
};

export default Header;
