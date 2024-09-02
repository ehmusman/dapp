import Link from 'next/link'
import React from 'react'

const Profile = () => {
  return (
    <>
    <Link href="/" className='bg-blue-600 px-5 py-2 text-white rounded mx-3'>Home</Link>
        <div>
            <h1 className='text-center text-4xl font-sans font-bold text-blue-600'>User Profile</h1>
            <div className="container flex flex-col justify-center mx-auto my-5">
                <div className='h-40 w-40 bg-gray-500 rounded-full mx-auto'></div>
                <p className='text-center font-sans font-semibold text-2xl text-blue-600'>username</p>
                <div className='w-96 mx-auto my-10 flex flex-col'>
                    <div>
                <label htmlFor="email" className='text-xl font-semibold text-blue-600'>Email : </label>
                <input type="text" value="myemail@gmail.com" className='bg-transparent text-blue-400 text-xl font-sans' disabled />
                    </div>
                <table className='border-2 border-blue-600 border-collapse my-5 font-sans text-lg'>
                    <tbody>
                    <tr className='border-2 border-blue-600'>
                        <td className='border-2 border-blue-600 p-2'>item 1</td>
                        <td className='border-2 border-blue-600 p-2'>item 2</td>
                    </tr>
                    <tr className='border-2 border-blue-600'>
                        <td className='border-2 border-blue-600 p-2'>item 3</td>
                        <td className='border-2 border-blue-600 p-2'>item 4</td>
                    </tr>
                    </tbody>
                </table>
                <button className='px-5 py-2 bg-blue-600 text-white font-semibold font-sans rounded-lg text-xl '>Connect Wallet</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile
