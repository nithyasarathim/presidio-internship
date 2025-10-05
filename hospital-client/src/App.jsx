import React from 'react'
import { BrowserRouter as Router,Routes,Route, useNavigate} from 'react-router-dom';
import DashboardPage from './pages/Dashboard';

const App = () => {
  // const navigate=useNavigate();
  return (
    <Router>
      <Routes>
        <Route path='/' element={<DashboardPage/>}/>
      </Routes>
    </Router>
  )
}

export default App