import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';

function Signuppage() {
const { userSignUp} = useAuth()
  const Navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
   

    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters');
      return;
    }
    try {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
      Navigate('/Loginpage');
      alert('your are succesfully register')
    }
     catch (error) {
      setErrorMessage(error.message);
      setIsRegistering(false);
    }
  };





  return (
    <div>
      {/* {userSignUp && (<Navigate to={'/Loginpage'} replace={true} />)} */}
      {userSignUp && (<Navigate to={'/Loginpage'} replace={true} />)}
      <div className='flex min-h-screen items-center justify-center p-4 overflow-hidden'>
        <div className='bg-state-800 border border-white-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative '>
          <h1 className='w-full max-w-md text-4xl font-extrabold text-whitefont-bold text-center mb-6'>Register</h1>
          {errorMessage && (
            <div className='mb-4 p-2 bg-red-100 text-red-700 rounded'>
              {errorMessage}
            </div>
          )}
          <form onSubmit={onSubmit}>
          <div className='relative my-4'>

            <input type="email" autoComplete='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} className='block w-full py-2 px-0 text-white bg-transparent border-0 border-b-2 border-white-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer text-xl' placeholder='Email'required />

          </div>
          <div className='relative my-4'>
            <input type="password"  value={password}
                onChange={(e) => setPassword(e.target.value)} className='block w-full py-2.3 px-0 text-white bg-transparent border-0 border-b-2 border-white-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer mt-4 text-xl' placeholder='Password' required/>

          </div>
          <div className='relative my-4'>
            <input type="password"  value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)} className='block w-full py-2.3 px-0 text-white bg-transparent border-0 border-b-2 border-white-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer mt-4 text-xl' placeholder='Confirm Password' required/>

          </div>
          <button type='submit' disabled={isRegistering} className='cursor-pointer w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-black hover:bg-blue-400 hover:text-white py-2 transition-colors duration-300'>Sign up</button>
            </form>
          <div>
          
            <span className='m-4'>Alredy have Account ? <Link to='/Loginpage' className='text-blue-500 cursor-pointer hover:font-bold'>login</Link></span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Signuppage
