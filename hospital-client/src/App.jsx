import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import DoctorPage from './pages/DoctorPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './auth/ProtectedRoute';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Ro
      </Routes>
    </Router>
  )
}

export default App