import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import LoaderLayout from '../components/layouts/Loader';
import NotFound from '../screens/404.js';
import Login from '../screens/Login';
import { routes } from './routes';
import DashboardProtectedRoutes from '../components/layouts/DashboardProtectedRoutes';
import Settings from '../screens/dashboard/settings/index.js';
import ForgotPassword from '../screens/ForgotPassword';
import Register from '../screens/Register';
import Verification from '../screens/Verification';
import ResetPassword from '../screens/ResetPassword';
import Session from '../screens/dashboard/Session';
import Explore from '../screens/dashboard/Explore';
import Wallet from '../screens/dashboard/Wallet';
import Splash from '../screens/Splash';
import Notifications from '../screens/dashboard/notifications';
import Active from '../screens/dashboard/session/Active';
import SessionsLayout from '../components/layouts/SessionsLayout';
import Upcoming from '../screens/dashboard/session/Upcoming';
import History from '../screens/dashboard/session/History';
import BookNew from '../screens/dashboard/session/BookNew';

const AppRouter = () => (
  <LoaderLayout>
    <BrowserRouter>
      <Routes>
        <Route index path={`/`} element={<Splash />} />
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.verification} element={<Verification />} />
        <Route path={routes.forgot_password} element={<ForgotPassword />} />
        <Route path={routes.reset_password} element={<ResetPassword />} />

        <Route
          path={routes.dashboard_home}
          element={<DashboardProtectedRoutes />}
        >
          <Route index path={routes.explore} element={<Explore />} />

          <Route path={routes.session} >
            <Route index element={<Active />} />
            <Route path={routes.upcoming} element={<Upcoming />} />
            <Route path={routes.history} element={<History />} />

            <Route path={routes.new} element={<BookNew />} />
          </Route>

          <Route path={routes.wallet} element={<Wallet />} />
          <Route path={routes.settings} element={<Settings />} />
          <Route path={routes.notifications} element={<Notifications />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </LoaderLayout>
);

export default AppRouter;
