import React from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Sidebar />

      <div>
        <Header />
        <div className=' '>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout