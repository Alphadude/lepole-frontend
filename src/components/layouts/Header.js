import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { sidebarItems } from './SidebarItem';

import { Avatar } from '@deposits/ui-kit-react';

import {
  DropdownIcon,
  NotificationIcon2,
  LePoleLogoBlack,
} from '../../assets/icons';

import { CustomSwitch } from '../elements';

import { H1 } from '../Headings';
import { themeCheck } from '../../helpers/functions/themeCheck';

const Header = () => {
  const { pathname } = useLocation();

  const [enabled, setEnabled] = useState(false);
  localStorage.theme = enabled ? 'dark' : 'light';

  useEffect(() => {
    themeCheck();
  });

  const changeTheme = () => {
    setEnabled(!enabled);
  };

  return (
    <div className="bg-primary-white flex items-center justify-between !px-4 lg:!px-6 py-4 lg:py-8  lg:border-b border-gray-4">
      <H1 className="hidden  lg:block font-bold text-lg lg:text-2xl text-renaissance-black">
        {sidebarItems.find((item) => item.link === pathname).pageTitle}
      </H1>

      <div className="lg:hidden flex items-center justify-center">
        <img src={LePoleLogoBlack} alt="le pole logo" width={70} height={70} />
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
