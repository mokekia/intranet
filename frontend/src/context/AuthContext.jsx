// Creates AuthContext — AuthProvider stores user and token in state and localStorage
// Exports: useAuth() hook with { user, login(email, password), logout(), loading }
// login() calls POST /api/auth/login, saves token and user to localStorage
// logout() clears localStorage and resets user to null
import { createContext, useContext, useState } from "react";
import axios from 'axios'

const AuthContext = createContext() // "Empty box"

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
      email,
      password
    })  
    setUser(response.data.employee)
    setToken(response.data.token)
    localStorage.setItem('token', response.data.token)
    } catch (error) {
      throw error
    }
  }
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }
return (
  <AuthContext.Provider value={{user, token, login, logout}}>
    {children}
  </AuthContext.Provider>
)
}
const useAuth = () => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }