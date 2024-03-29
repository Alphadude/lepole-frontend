import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen dark:bg-gray-dark-4 ">
      <Sidebar />
      <div className=" flex-1  overflow-auto">
        <Header />

        <div className="w-full flex-1 bg-primary-white dark:bg-gray-dark-4 lg:h-main lg:overflow-auto pb-20 lg:pb-0">
          {children}
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default DashboardLayout;
