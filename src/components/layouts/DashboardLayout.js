import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 lg:overflow-hidden">
        <Header />

        <div className="bg-primary-white lg:h-main lg:overflow-auto pb-20 lg:pb-0">
          {children}
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default DashboardLayout;
