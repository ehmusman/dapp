import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
  return (
    <>
    <Link href="/" className='bg-blue-600 px-5 py-2 text-white rounded mx-3'>Home</Link>
     <div className="container p-2">
      <h1 className='text-4xl font-sans font-bold text-center text-blue-600'>Login</h1>
      <div className="container my-5">
        <form className='flex flex-col w-96 mx-auto border-2 p-3 rounded-lg border-blue-600'>
          <label htmlFor="email" className='py-1 font-sans font-semibold text-lg text-blue-600'>Email:</label>
          <input type="email" id='email' className='py-2 text-blue-400 focus:border-b-2 focus:border-blue-600 focus:outline-none' placeholder='email eg:myemail@gmail.com' />
          <label htmlFor="password" className='py-1 font-sans font-semibold text-lg text-blue-600'>Password:</label>
          <input type="password" id='password' className='py-2 text-blue-400 focus:border-b-2 focus:border-blue-600 focus:outline-none' placeholder='password' />
          <button className='border-2 p-2 bg-blue-700 text-white w-1/4 my-5 mx-auto rounded'>Login</button>
        </form>
      </div>
    </div> 
    </>
  )
}

export default LoginPage
