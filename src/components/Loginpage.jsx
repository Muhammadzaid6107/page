import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom';
import { doSignInUserWithEmailAndPassword } from '../firebase/auth';
import { useAuth } from '../contexts/AuthContexts';



function Loginpage() {

    const { userLoggedIn } = useAuth()
const Navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
       
        if (!email || !password) {
            setErrorMessage('Please fill in all fields');
            return;
        }

        try {
            setIsSigningIn(true);
            await doSignInUserWithEmailAndPassword(email, password);
            Navigate("/Todoapp")
            // If you want to implement remember me functionality, you would store the token here
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSigningIn(false);

        }
         if (userLoggedIn) {
        Navigate('/Todoapp');
        return null; // or you can return a loading spinner
    }
    }







    return (
        <div>
            {/* {userLoggedIn && (<Navigate to={'/Todoapp'} replace={true} />)} */}
            <div className='flex min-h-screen items-center justify-center p-4 overflow-hidden '>
                <div className='bg-state-800 border border-white-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative '>
                    <h1 className='w-full max-w-md text-4xl font-extrabold text-whitefont-bold text-center mb-6'>Login</h1>

                    {errorMessage && (
                        <div className='mb-4 p-2 bg-red-100 text-red-700 rounded'>
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={onSubmit}>

                    <div className='relative my-4'>

                        <input type="email" autoComplete='email' onChange={(e)=>{setEmail(e.target.value)}} value={email} className='block w-full py-2 px-0 text-white bg-transparent border-0 border-b-2 border-white-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer text-xl' placeholder='Email' required/>

                    </div>
                    <div className='relative my-4'>
                        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className='block w-full py-2 px-0 text-white bg-transparent border-0 border-b-2 border-white-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer mt-4 text-xl' placeholder='Password' required/>

                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2 item-center'>
                            <input type="checkbox" name="" id="" className='cursor-pointer' />
                            <label htmlFor="">Remember Me</label>
                        </div>
                        <div>
                            <span className=' cursor-pointer hover:text-blue-700 hover:font-bold'>Forget password ?</span>
                        </div>
                    </div>

                    <button type = "submit" disabled={isSigningIn} className='cursor-pointer w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-black hover:bg-blue-400 hover:text-white py-2 transition-colors duration-300'>{isSigningIn ? 'Signing In...' : 'Login'}</button>
                    </form>
                    <div>
                        <span className='m-4'>Do not have an account ? <Link to='/signup' className='text-blue-500 cursor-pointer hover:font-bold'>Register</Link></span>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Loginpage;
