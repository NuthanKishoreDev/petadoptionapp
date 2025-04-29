import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import './App.css'
import Root from './components/root'
import SearchPage from './pages/search';
import PetDetailsPage from './pages/detail';
import PetDetailsNotFound from './pages/petDetailsNotFound';
import HomePage from './pages/home'



function App() {
  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root/>}>
        <Route index element={<HomePage/>}/>
        <Route path=":type" element={<HomePage/>}/>
        <Route path=":type/:id" element={<PetDetailsPage/>}/>
        <Route path="search" element={<SearchPage/>}/>
        <Route path="pet-details-not-found" element={<PetDetailsNotFound/>}/>
      </Route>
    )
  )
  {
    basename: process.env.NODE_ENV === 'production' ? '/pet-adoption-app' : '/'
  }

  return (
    <RouterProvider router={appRouter}/>
  )
}

export default App
