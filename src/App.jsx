
import { Routes, Route } from 'react-router-dom';
import Loginpage from './components/Loginpage'
import Signuppage from './components/Signuppage';
import './App.css'
import { AuthProvider } from './contexts/AuthContexts';
import Todoapp from './components/Todoapp';

function App() {

  return (
    <AuthProvider>

      <div className="flex min-h-screen items-center justify-center bg-no-repeat ">

        <div className='text-white  flex justify-center items-center bg-no-repeat bg-cover bg-center w-[300vh] h-full ' style={{ "background": "url('../src/assets/bgf.jpg')" }}>



          <Routes>
            <Route path="/" element={<Loginpage />} />
            <Route path="/Loginpage" element={<Loginpage />} />
            <Route path="/signup" element={<Signuppage />} />
            <Route path="/todoapp" element ={<Todoapp />} />
          </Routes>

        </div>
      </div>

    </AuthProvider>
  )
}

export default App;
