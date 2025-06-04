
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doSignInUserWithEmailAndPassword } from '../firebase/auth';
import { useAuth } from '../contexts/AuthContexts';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FirebaseError } from 'firebase/app';
import firebase from 'firebase/compat/app';

function Loginpage() {
  
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSigningIn(true);
        await doSignInUserWithEmailAndPassword(values.email, values.password);
        navigate("/Todoapp");

      } catch (error) {
        formik.setStatus(error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  });



  return (
    <div>
      <div className='flex min-h-screen items-center justify-center p-4 overflow-hidden'>
        <div className='bg-state-800 border border-white-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
          <h1 className='w-full max-w-md text-4xl font-extrabold text-whitefont-bold text-center mb-6'>Login</h1>

          {formik.status && (
            <div className='mb-4 p-2 bg-red-100 text-red-700 rounded'>
              {formik.status}
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            <div className='relative my-4'>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`block w-full py-2 px-0 text-white bg-transparent border-0 border-b-2 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-white-300'
                  } appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer text-xl`}
                placeholder='Email'
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>

            <div className='relative my-4'>
              <input
                type="password"
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`block w-full py-2 px-0 text-white bg-transparent border-0 border-b-2 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-white-300'
                  } appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer mt-4 text-xl`}
                placeholder='Password'
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>

            <div className='flex justify-between items-center'>
              <div className='flex gap-2 items-center'>
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  onChange={formik.handleChange}
                  checked={formik.values.rememberMe}
                  className='cursor-pointer'
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <div>
                <span className='cursor-pointer hover:text-blue-700 hover:font-bold'>
                  Forget password ?
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSigningIn || !formik.isValid}
              className={`cursor-pointer w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-black hover:bg-blue-400 hover:text-white py-2 transition-colors duration-300 ${isSigningIn || !formik.isValid ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {isSigningIn ? 'Signing In...' : 'Login'}
            </button>
          </form>

          <div>
            <span className='m-4'>
              Do not have an account ?{' '}
              <Link to='/signup' className='text-blue-500 cursor-pointer hover:font-bold'>
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
