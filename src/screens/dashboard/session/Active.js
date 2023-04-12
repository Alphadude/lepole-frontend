import React from 'react'
import SessionsLayout from '../../../components/layouts/SessionsLayout'
import gymCouple from '../../../assets/images/gym_couple.png'
import { Button } from '@deposits/ui-kit-react'
import { Link } from 'react-router-dom'
import { routes } from '../../../router/routes'
const Active = () => {
  const activeSessions = []
  return (
    <SessionsLayout>
      <div className=' py-16 lg:py-12  w-full h-full flex justify-center items-center'>
        {activeSessions?.length === 0 ? (
          <section className='flex flex-col items-center'>
            <img src={gymCouple} alt="empty state" className='w-3/5 lg:w-full' />
            <p className='mt-10 mb-8'>
              Oops! You do not have any active session
            </p>
            <Link to={`/${routes.dashboard_home}/${routes.session}/${routes.new}`}>
              <Button
                className="!bg-primary-green !w-full !border-0 !px-8 !text-primary-white"
                size="xlarge"
              >
                Book Session
              </Button>
            </Link>
          </section>
        ) : (
          <section>
            All Sessions
          </section>
        )}
      </div>
    </SessionsLayout>
  )
}

export default Active