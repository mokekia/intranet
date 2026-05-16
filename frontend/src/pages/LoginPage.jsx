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
    <div>
      <h1>IntraNet</h1>
      <div>
      
        <input 
        type="text"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          required
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
          
        />
        {error && <p style={{color: 'red'}}>{error}</p> }
        <button onClick={() => handleSubmit()}>Login</button>
      </div>
      
    </div>
  )
} 
export default LoginPage