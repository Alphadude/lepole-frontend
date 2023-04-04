import { Link, useLocation } from 'react-router-dom';

import { sidebarItems } from './SidebarItem';

import { LePoleLogoBlack, LogoutIcon } from '../../assets/icons';

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="hidden lg:flex shadow-3xl flex-col w-60 h-full pb-8 bg-white text-gray-5">
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
                 ? 'bg-primary-green text-white'
                 : 'text-gray-5 hover:bg-gray-4/40 '
             }`}
          >
            <div>
              <Icon stroke={pathname === item.link ? 'white' : '#73797F'} />
            </div>
            <span className="capitalize block ml-2">{item.title}</span>
          </Link>
        ))}
      </ul>

      <div className="w-fit mx-auto mt-auto flex items-center cursor-pointer ">
        <div>
          <img src={LogoutIcon} alt="log out" />
        </div>

        <span className="capitalize block ml-3">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
