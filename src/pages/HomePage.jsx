import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const { auth } = useAuth()
  console.log(auth);
  
  return (
    <div className='flex flex-col'>
      <h1>HomePage</h1>
      <Link to="/me">Go to profile page</Link>
      </div>
    
  )
}

export default HomePage