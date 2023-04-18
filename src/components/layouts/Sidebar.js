import { Link, useLocation, useNavigate } from 'react-router-dom';

import { sidebarItems } from './SidebarItem';

import {
  LePoleLogoBlack,
  LePoleLogoWhite,
  LogoutIcon,
} from '../../assets/icons';
import { useCookies } from 'react-cookie';
import { supabase } from '../../utils/supabaseConfig';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      removeCookie();
      navigate('/');
    } else {
      toast.error('An error occured');
    }
  };

  return (
    <div className="hidden lg:flex drop-shadow-3xl flex-col w-60 h-full pb-8 bg-white text-gray-5 dark:bg-dark-white ">
      <div className="px-6">
        <div className="text-center flex items-center justify-center ">
          <img
            src={LePoleLogoBlack}
            alt="le pole logo"
            className="inline dark:hidden"
          />
          <img
            src={LePoleLogoWhite}
            alt="le pole logo"
            className="hidden dark:inline"
          />
        </div>
      </div>

      <ul className="px-2 mt-6">
        {sidebarItems.map(({ Icon, ...item }) => (
          <Link
            key={item.title}
            to={item.link}
            className={`flex items-center rounded-lg py-2.5 pl-5
             cursor-pointer duration-100 text-sm font-medium mt-3 dark:text-gray-4 ${
               pathname.includes(item.link)
                 ? 'bg-primary-green text-white'
                 : 'text-gray-5 hover:bg-gray-4/40 hover:dark:bg-primary-green/20'
             }`}
          >
            <div>
              <Icon
                stroke={pathname.includes(item.link) ? 'white' : '#73797F'}
              />
            </div>
            <span className="capitalize block ml-2">{item.title}</span>
          </Link>
        ))}
      </ul>

      <div
        role="button"
        onClick={handleLogout}
        className="w-fit mx-auto mt-auto flex items-center cursor-pointer "
      >
        <div>
          <img src={LogoutIcon} alt="log out" />
        </div>

        <span className="capitalize block ml-3">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
