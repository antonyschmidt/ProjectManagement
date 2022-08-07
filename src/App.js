import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
//components
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Show from './pages/Show'
import Signup from './pages/Signup'
import Login from './pages/Login'
//styles
import './App.css';

export default function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Sidebar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/show' element={<Show />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

