import React from 'react'
import { useProfile } from '../../hooks/useProfile'
import EditIcon from "../../assets/icons/edit.svg"

const Bio = () => {
  const { state } = useProfile()
  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
<div className="flex-1">
              <p className="leading-[188%] text-gray-400 lg:text-lg">
               {state?.user?.bio}
              </p>
            </div>
            <button className="flex-center h-7 w-7 rounded-full">
              <img src={EditIcon} alt="Edit" />
            </button>
    </div>
  )
}

export default Bio