import React from 'react'
import { useAuth } from '../hooks/useAuth'

const HomePage = () => {
  const { auth } = useAuth()
  console.log(auth);
  
  return (
    <div>HomePage</div>
  )
}

export default HomePage