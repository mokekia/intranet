// Model for the employees table — exports functions: findByEmail, findById, createEmployee, getAllEmployees, updateEmployee, deleteEmployee
const pool = require('../config/db.js')

async function createEmployee(name, email, password, hourly_rate, role) {
  await pool.query('INSERT INTO employees (name, email, password, hourly_rate, role) VALUES ($1, $2, $3, $4, $5)', [name, email, password, hourly_rate, role])
}

async function getEmployeeByEmail(email) {
  console.log('Searching for email: ', email)
  const result = await pool.query('SELECT * FROM employees WHERE LOWER(email) = LOWER($1)', [email])
  console.log('Result', result.rows)
  return result.rows[0]
}

async function getEmployeeById(id) {
  const result = await pool.query('SELECT * FROM employees WHERE id=$1', [id])
  return result.rows[0]
}

module.exports = { createEmployee, getEmployeeByEmail, getEmployeeById }