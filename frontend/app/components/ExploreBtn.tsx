'use client'
import React, { useContext } from 'react'
import UserContext from '../context/user/context'
import Link from 'next/link'

const ExploreBtn = () => {
    const context = useContext(UserContext) 
  return (
    <>
            {!context?.state?.email ? 
            <div className="flex justify-center">
              <Link href="/login">
                <span className="bg-secondary text-primary font-semibold py-2 px-4 rounded hover:bg-opacity-90 cursor-pointer">
                  Explore Now
                </span>
              </Link>
            </div> : 
            <div className="flex justify-center">
            <Link href="/profile">
              <span className="bg-secondary text-primary font-semibold py-2 px-4 rounded hover:bg-opacity-90 cursor-pointer">
                Profile
              </span>
            </Link>
          </div> 
            }
    </>
  )
}

export default ExploreBtn