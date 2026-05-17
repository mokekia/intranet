// Creates AuthContext — AuthProvider stores user and token in state and localStorage
// Exports: useAuth() hook with { user, login(email, password), logout(), loading }
// login() calls POST /api/auth/login, saves token and user to localStorage
// logout() clears localStorage and resets user to null
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

const AuthContext = createContext() // "Empty box"

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const isToken = localStorage.getItem('token')
    if(isToken){
      setToken(isToken)
      const userInfo = jwtDecode(isToken)
    } 
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
      const token = localStorage.getItem('token')
      if(token) {
        const response = await axios.get('http://localhost:3000/api/auth/me', {headers: { Authorization: `Bearer ${token}` }} )
        setUser(response.data) 
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
    }
    fetchUser()
  }, [])

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
  <AuthContext.Provider value={{user, token, login, logout, loading}}>
    {children}
  </AuthContext.Provider>
)
}
const useAuth = () => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }