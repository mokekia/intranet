// login: validates email/password, compares bcrypt hash, returns JWT token and user object
// register: hashes password with bcrypt, inserts new employee
// getMe: returns the logged-in user's profile from the database
const { createEmployee, getEmployeeByEmail, getEmployeeById } = require('../models/Employee.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const { name, email, password, hourly_rate, role } = req.body;
    if(!name || !email || !password|| !hourly_rate || !role) return res.status(400).json( { message: 'All fields are required'} )
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await createEmployee(name, email, hashedPassword, hourly_rate, role);
    
    res.status(201).json({ message: 'Employee created successfully' });  
  }catch (error) {
    if(error.code === '23505'){
      return res.status(409).json( {message: 'Email already exists'} ) // 23505 is postgreSQL's error code for the unique contraint violation
    }
    console.log(error)
    res.status(500).json({ message: error.message }) 
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const employee = await getEmployeeByEmail(email)
    if(!employee) return res.status(404).json({ message: 'Employee not found' })
    const match = await bcrypt.compare(password, employee.password)
    if(!match) return res.status(401).json( {message: 'Invalid password'} )
    const payload = { id: employee.id , role: employee.role}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '7d'})
    res.status(200).json({token, employee})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
  } 
}

module.exports = { register, login }