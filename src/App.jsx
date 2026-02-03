import './App.css'
import { RouterProvider } from 'react-router-dom'
import { routere } from './Component/Router'

function App() {

  return (
    <>
    <RouterProvider router={routere}/>
    </>
  )
}

export default App
