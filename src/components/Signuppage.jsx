
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Signuppage() {
  const { userSignUp } = useAuth();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = React.useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsRegistering(true);
        await doCreateUserWithEmailAndPassword(values.email, values.password);
        navigate('/Loginpage');
        alert('You have successfully registered');
      } catch (error) {
        formik.setStatus(error.message);
      } finally {
        setIsRegistering(false);
      }
    }
  });

  return (
    <div>
      {userSignUp && <Navigate to={'/Loginpage'} replace={true} />}
      <div className='flex min-h-screen items-center justify-center p-4 overflow-hidden'>
        <div className='bg-state-800 border border-white-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
          <h1 className='w-full max-w-md text-4xl font-extrabold text-whitefont-bold text-center mb-6'>Register</h1>
          
          {formik.status && (
            <div className='mb-4 p-2 bg-red-100 text-red-700 rounded'>
              {formik.status}
            </div>
          )}
          
          <form onSubmit={formik.handleSubmit}>
            <div className='relative my-4'>
              <input
                type="email"
                autoComplete='email'
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full py-2 px-0 text-white bg-transparent border-0 border-b-2 ${
                  formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-white-300'
                } appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer text-xl`}
                placeholder='Email'
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
            
            <div className='relative my-4'>
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full py-2.3 px-0 text-white bg-transparent border-0 border-b-2 ${
                  formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-white-300'
                } appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer mt-4 text-xl`}
                placeholder='Password'
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>
            
            <div className='relative my-4'>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full py-2.3 px-0 text-white bg-transparent border-0 border-b-2 ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-white-300'
                } appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer mt-4 text-xl`}
                placeholder='Confirm Password'
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            
            <button
              type='submit'
              disabled={isRegistering || !formik.isValid}
              className='cursor-pointer w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-black hover:bg-blue-400 hover:text-white py-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isRegistering ? 'Registering...' : 'Sign Up'}
            </button>
          </form>
          
          <div>
            <span className='m-10'>Already have an account? <Link to='/Loginpage' className='text-blue-500 cursor-pointer hover:font-bold'>Login</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signuppage;
