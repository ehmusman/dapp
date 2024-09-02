import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
  return (
    <>
    <Link href="/login" className='bg-blue-600 px-5 py-2 text-white rounded mx-3'>Login</Link>
    <Link href="/signup" className='bg-blue-600 px-5 py-2 text-white rounded mx-3'>Singup</Link>
    <Link href="/profile" className='bg-blue-600 px-5 py-2 text-white rounded mx-3'>Profile</Link>
    </>
  )
}

export default LoginPage
