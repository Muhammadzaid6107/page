
import { Routes, Route, Navigate } from 'react-router-dom';
import Loginpage from './components/Loginpage'
import Signuppage from './components/Signuppage';
import './App.css'
import { AuthProvider, useAuth } from './contexts/AuthContexts';
import Todoapp from './components/Todoapp';


function App() {
  const { currentUser } = useAuth()
  
  return (


    <div className="flex min-h-screen items-center justify-center bg-no-repeat ">

      <div className='text-white  flex justify-center items-center bg-no-repeat bg-cover bg-center w-[300vh] h-full ' style={{ "background": "url('../src/assets/bgf.jpg')" }}>



        <Routes>
          <Route path="/" element={currentUser ? (<Navigate to={'/Todoapp'} replace />) : <Loginpage />} />
          <Route path="/signup" element={currentUser ? (<Navigate to={'/Todoapp'} replace />) : <Signuppage />} />
          <Route path="/Todoapp" element={currentUser ? <Todoapp /> : (<Navigate to={'/'} replace />)} />
         


        </Routes>

      </div>
    </div>


  )
}

export default App;    