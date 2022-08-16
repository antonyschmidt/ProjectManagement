import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
//components
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Show from './pages/Show'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Topbar from './components/Topbar'
//context
import { useAuthContext } from './hooks/useAuthContext'
//styles
import './App.css';

export default function App() {
  const { user, authReady } = useAuthContext()

  return (
    <div className="App">

      {authReady &&
        <>
          <BrowserRouter>
            <Sidebar />

            <div className='main-area'>
              {user && <div className='topbar-container'>
                <Topbar />
              </div>}
              <div className='content-container'>
                <Routes>
                  <Route path='/' element={user ? (<Home />) : (<Navigate to='/login' />)} />
                  <Route path='/projects/:id' element={user ? (<Show />) : (<Navigate to='/login' />)} />
                  <Route path='/signup' element={user ? (<Navigate to='/' />) : (<Signup />)} />
                  <Route path='/login' element={user ? (<Navigate to='/' />) : (<Login />)} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </>
      }
    </div>
  );
}

