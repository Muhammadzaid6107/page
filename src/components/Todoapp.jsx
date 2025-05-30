import React from 'react'
import { useAuth } from '../contexts/AuthContexts'

function Todoapp() {
  const { signOut } = useAuth()
  return (
    <div>
      <div onClick={signOut}>logout</div>
      

    </div>
  )
}

export default Todoapp;
