import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate=useNavigate();
  return (
    <div>
      <div>Hospital Client Landing Page</div>
    <button onClick={()=>{
      navigate('/login');
    }}>Login</button>
    </div>
  )
}

export default Dashboard