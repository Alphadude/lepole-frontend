import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const DashBoardProtectedRoutes = () => {

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default DashBoardProtectedRoutes;
