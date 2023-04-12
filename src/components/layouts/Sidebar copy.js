import { Link, useLocation } from 'react-router-dom';

import { sidebarItems } from './SidebarItem';

import { LePoleLogoBlack } from '../../assets/icons';

import { ReactComponent as LogoutIcon } from '../../assets/icons/logout.svg';

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="hidden lg:flex shadow-3xl flex-col w-60 h-full pb-8 bg-white text-gray-5 dark:bg-dark-white">
      <div className="px-6">
        <div className="text-center flex items-center justify-center ">
          <img src={LePoleLogoBlack} alt="le pole logo" />
        </div>
      </div>

      <ul className="px-2 mt-6">
        {sidebarItems.map(({ Icon, ...item }) => (
          <Link
            key={item.title}
            to={item.link}
            className={`flex items-center rounded-lg py-2.5 pl-5
             cursor-pointer duration-100 text-sm font-medium mt-3  ${
               pathname === item.link
                 ? 'bg-primary-green dark:bg-sidebar-dark-green text-white dark:text-dark-white'
                 : 'text-gray-5 dark:text-primary-white hover:bg-gray-4/40 hover:dark:bg-sidebar-dark-green/20'
             }`}
          >
            <div>
              <Icon
                className={
                  pathname === item.link
                    ? 'stroke-white dark:stroke-dark-white'
                    : 'stroke-primary-gray dark:stroke-white'
                }
              />
            </div>
            <span className="capitalize block ml-2">{item.title}</span>
          </Link>
        ))}
      </ul>

      <div className="w-fit mx-auto mt-auto flex items-center cursor-pointer ">
        <div>
          <LogoutIcon className="stroke-primary-gray dark:stroke-primary-white" />
        </div>

        <span className="capitalize block ml-3 text-primary-gray dark:text-white">
          Logout
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
