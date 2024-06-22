import './App.css'
import UserContextProvider from './context_api/UserContextProvider'
import Login from './pages/Login'
import Register from './pages/Register'
import Room from './pages/Room'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Room/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  }
])

function App() {

  return (
    <UserContextProvider>
      <RouterProvider router={router}/>
    </UserContextProvider>
    
  )
}

export default App
