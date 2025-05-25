import React from 'react'
import { Link } from 'react-router-dom';
function Signuppage() {
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='bg-state-800 border border-white-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative '>
                <h1 className='w-full max-w-md text-4xl font-extrabold text-whitefont-bold text-center mb-6'>Register</h1>
                
                <div className='relative my-4'>

                    <input type="email" className='block w-full py-2.3 px-0 text-white bg-transparent border-0 border-b-2 border-white-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer text-xl' placeholder='Email' />

                </div>
                <div className='relative my-4'>
                    <input type="password" className='block w-full py-2.3 px-0 text-white bg-transparent border-0 border-b-2 border-white-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer mt-4 text-xl' placeholder='Password' />

                </div>
                 <div className='relative my-4'>
                    <input type="password" className='block w-full py-2.3 px-0 text-white bg-transparent border-0 border-b-2 border-white-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer mt-4 text-xl' placeholder='Confirm Password' />

                </div>
                <button type='sumbit' className='cursor-pointer w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-black hover:bg-blue-400 hover:text-white py-2 transition-colors duration-300'>sign up</button>
                <div>
                    <span className='m-4'>Alredy have Account ? <Link to='/login' className='text-blue-500 cursor-pointer hover:font-bold'>login</Link></span>
                </div>

            </div>
    </div>
  )
}

export default Signuppage
