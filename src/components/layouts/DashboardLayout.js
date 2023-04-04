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

        <div className="lg:h-main lg:overflow-auto text-left px-4 py-6 lg:px-6 pb-20 lg:pb-0 ">
          {children}
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default DashboardLayout;
