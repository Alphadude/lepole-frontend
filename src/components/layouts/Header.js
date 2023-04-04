import React from 'react';
import { useLocation } from 'react-router-dom';

import { sidebarItems } from './SidebarItem';

import { Avatar } from '@deposits/ui-kit-react';

import { DropdownIcon, NotificationIcon2 } from '../../assets/icons';

import { H1 } from '../Headings';

const Header = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex items-center justify-between py-5 lg:py-8 px-4 lg:px-6 border-b border-gray-4">
      <H1 className="font-bold text-lg lg:text-2xl text-renaissance-black">
        {sidebarItems.find((item) => item.link === pathname).pageTitle}
      </H1>

      <div className="flex items-center">
        <div className="mr-6">
          <img
            className="ml-1"
            src={NotificationIcon2}
            alt="notification icon"
          />
        </div>

        <div className="flex items-center cursor-pointer">
          <Avatar
            avatar={{
              colorScheme: 'blue',
              name: 'Emmanuel Stephen',
            }}
            subtle
          />

          <img className="ml-1" src={DropdownIcon} alt="dropdown icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
