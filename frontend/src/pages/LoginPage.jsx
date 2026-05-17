// Login page matching the design:
// - Hero card centered on a light-blue background
// - "IntraNet" heading
// - Three tab buttons: Employee | Manager | Admin (pill style, active tab filled navy)
// - Email input with envelope icon + inline red error if invalid
// - Password input with lock icon + inline red error if wrong
// - "Login to dashboard" button — calls login() from AuthContext, then navigates to /

import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'


function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate  = useNavigate()

  const handleSubmit = async () => {
    try {
      await login(email, password)
      navigate('/')        
    } catch (error) {
      setError('Invalid email or password')
    }
  }

  return (

  <div className='loginPage'>    
      <div className='formCard'>    
        <h1>IntraNet</h1>
        <div className='formGroup'>
          <label>Email</label>
          <input className='formField'
          type="text"
          placeholder="your@email.com"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        
        <div className='formGroup'>
          <label>Password</label>
          <input className='formField'
            type="password"
            placeholder="Password"
            value={password}
            required
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            
          />
        </div>
        
        {error && <p style={{color: 'red'}}>{error}</p> }
        <button className='btn' onClick={() => handleSubmit()}>Login to dashboard</button>
      </div>
  </div>
    
  )
} 
export default LoginPage