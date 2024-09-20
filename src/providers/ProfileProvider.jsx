
import React from 'react'
import { ProfileContext } from '../context'
import { useReducer } from 'react'
import { profileReducer, initialState } from '../reducers/ProfileReducer'

const ProfileProvider = ({children}) => {
 const [state, dispatch]=useReducer(profileReducer, initialState)
 
 const profileContextValue = { state, dispatch };
 return (
    <ProfileContext.Provider value={profileContextValue}>
        {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider