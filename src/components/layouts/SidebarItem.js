import { routes } from '../../router/routes';

import { ReactComponent as ExploreIcon } from '../../assets/icons/explore-icon.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';
import { ReactComponent as WalletIcon } from '../../assets/icons/wallet-icon.svg';
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg';
import { ReactComponent as NotificationsIcon } from '../../assets/icons/notification.svg';

export const sidebarItems = [
  {
    title: 'Explore',
    pageTitle: 'Dashboard',
    Icon: ExploreIcon,
    link: `/${routes.dashboard_home}/${routes.explore}`,
  },
  {
    title: 'Sessions',
    pageTitle: 'Sessions',
    Icon: CalendarIcon,
    link: `/${routes.dashboard_home}/${routes.session}`,
  },
  {
    title: 'Wallet',
    pageTitle: 'Wallet',
    Icon: WalletIcon,
    link: `/${routes.dashboard_home}/${routes.wallet}`,
  },
  {
    title: 'Settings',
    pageTitle: 'Settings',
    Icon: SettingsIcon,
    link: `/${routes.dashboard_home}/${routes.settings}`,
  },
  {
    title: 'Notifications',
    pageTitle: 'Notifications',
    Icon: NotificationsIcon,
    link: `/${routes.dashboard_home}/${routes.notifications}`,
  },
];
