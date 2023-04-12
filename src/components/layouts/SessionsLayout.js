import React, { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { routes } from '../../router/routes'


const tabs = [
  {
    id: 1,
    name: 'Active Sessions',
    link: `/${routes.dashboard_home}/${routes.session}`
    // link: `${routes.active}`
  },
  {
    id: 2,
    name: 'Upcoming Sessions',
    link: `${routes.upcoming}`
  },
  {
    id: 3,
    name: 'History',
    link: `${routes.history}`
  },
]

const SessionsLayout = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className='flex flex-col h-full text-renaissance-black dark:text-renaissance-dark-black font-normal text-base flex-1 p-8 '>
      <section className='mb-10'>
        <p>Keep track of all your session in one page</p>
      </section>

      <section className='flex border-b border-gray-4 dark:border-x-gray-dark-4 gap-6 max-w-5xl'>
        {tabs.map(tab => {
          const link = tab.link.trim()[0] === '/' ? tab.link : `/${routes.dashboard_home}/${routes.session}/${tab.link}`
          return (
            <Link
              to={link}
              className={`   ${location.pathname === link && 'border-b-2 border-primary-green  text-primary-green dark:border-primary-dark-green dark:text-primary-dark-green'}`} >
              {tab.name}
            </Link>
          )
        })}
      </section>
      <section className=' flex-1 h-full'>
        {children}
        {/* <Outlet /> */}
      </section>
    </div>
  )
}

export default SessionsLayout