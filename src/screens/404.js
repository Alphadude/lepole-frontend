import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../router/routes'

const NotFound = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`${routes.login}`)
  }, [navigate])

  return (
    <div />
  )
}

export default NotFound