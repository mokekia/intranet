const pool = require('../config/db.js')

// Creates a new shift for an employee
async function createShift(employee_id, date, working_time, late_time, shift_type) {
  await pool.query(
    'INSERT INTO shifts (employee_id, date, working_time, late_time, shift_type, status) VALUES ($1, $2, $3, $4, $5, $6)',
    [employee_id, date, working_time, late_time, shift_type, 'Pending']
  )
}

// Gets all shifts for one employee in a given month and year
async function getByEmployeeAndMonth(employee_id, month, year) {
  const result = await pool.query(
    'SELECT * FROM shifts WHERE employee_id = $1 AND EXTRACT(MONTH FROM date) = $2 AND EXTRACT(YEAR FROM date) = $3',
    [employee_id, month, year]
  )
  return result.rows
}

// Gets only Pending shifts — used by the manager to see what needs approval
async function getPending() {
  const result = await pool.query(
    'SELECT shifts.*, employees.name, employees.hourly_rate FROM shifts JOIN employees ON shifts.employee_id = employees.id WHERE shifts.status = $1 ORDER BY date DESC',
    ['Pending']
  )
  return result.rows
}   

// Gets all shifts for all employees — used by the manager to view any employee's calendar
async function getAllShifts() {
  const result = await pool.query(
    'SELECT shifts.*, employees.name, employees.hourly_rate FROM shifts JOIN employees ON shifts.employee_id = employees.id ORDER BY date DESC'
  )
  return result.rows
}

// Updates the status of a shift to Approved or Rejected
async function updateShiftStatus(shift_id, status) {
  await pool.query(
    'UPDATE shifts SET status = $1 WHERE id = $2',
    [status, shift_id]
  )
}

module.exports = { createShift, getByEmployeeAndMonth, getPending, getAllShifts, updateShiftStatus }
