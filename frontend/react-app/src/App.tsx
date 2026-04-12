
import {BrowserRouter, Routes, Route} from  'react-router-dom'
import Login from './page/login'
import Task from './components/task'
import CreateTask from './components/CreateTask' 
import NavbarComponents from './components/Navbar/NavbarComponents'
function App() {

  return (
    <div className='App'>

      <NavbarComponents />
      <BrowserRouter>
        <Routes>
          {/** Login */}
          <Route path='/' element={<Login/>}> </Route>
          <Route path='/dashboard' element={<Task/>}></Route>
          <Route path='/create' element={<CreateTask/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
