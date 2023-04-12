import { Link, useLocation } from 'react-router-dom';

import { sidebarItems } from './SidebarItem';

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="lg:hidden shadow-4xl fixed left-0 right-0 bottom-0 w-full bg-white dark:bg-dark-white">
      <ul className="py-6 px-4 flex items-center justify-between">
        {sidebarItems.map(({ Icon, ...item }) => (
          <Link
            key={item.title}
            to={item.link}
            className={`rounded-full p-3
             cursor-pointer duration-100 text-sm font-medium ${pathname.includes(item.link)
                ? 'bg-primary-green rounded-full'
                : 'hover:bg-primary-white '
              }`}
          >
            <div>
              <Icon
                height="20px"
                width="20px"
                stroke={pathname.includes(item.link) ? 'white' : '#73797F'}
              />
            </div>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
