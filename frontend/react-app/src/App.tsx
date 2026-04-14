
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Login from './page/login'
import RegisterPage from './page/register'
import Task from './components/Task'
import CreateTask from './components/CreateTask'
import NavbarComponents from './components/Navbar/NavbarComponents'

function NavbarExceptLogin() {
  const location = useLocation()
  return location.pathname !== '/' ? <NavbarComponents /> : null
}

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavbarExceptLogin />
        <Routes>
          {/** Login */}
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard' element={<Task />} />
          <Route path='/create' element={<CreateTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
