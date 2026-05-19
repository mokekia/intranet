const Shift = require('../models/Shift.js')

// Employee logs a new shift — POST /api/timesheet
async function createShift(req, res) {
  const { date, working_time, late_time, shift_type } = req.body
  const employee_id = req.user.id // comes from the JWT token via authMiddleware

  await Shift.createShift(employee_id, date, working_time, late_time, shift_type)
  res.json({ message: 'Shift logged successfully' })
}

// Employee gets their own shifts for a specific month — GET /api/timesheet/my
async function getMyShifts(req, res) {
  const employee_id = req.user.id // comes from the JWT token via authMiddleware
  const { month, year } = req.query // passed as ?month=5&year=2026 in the URL

  const shifts = await Shift.getByEmployeeAndMonth(employee_id, month, year)
  res.json(shifts)
}

// Manager gets only Pending shifts — GET /api/timesheet/pending
async function getPendingShifts(req, res) {
  const shifts = await Shift.getPending()
  res.json(shifts)
}

// Manager gets all shifts for all employees — GET /api/timesheet/all
async function getAllShifts(req, res) {
  const shifts = await Shift.getAllShifts()
  res.json(shifts)
}

// Manager approves or rejects a shift — PUT /api/timesheet/:id/status
async function updateShiftStatus(req, res) {
  const shift_id = req.params.id // the shift id comes from the URL
  const { status } = req.body // 'Approved' or 'Rejected'

  await Shift.updateShiftStatus(shift_id, status)
  res.json({ message: 'Shift status updated' })
}

// Employee deletes their own shift — DELETE /api/timesheet/:id
async function deleteShift(req, res) {
  const shift_id = req.params.id
  await Shift.deleteShift(shift_id)
  res.json({ message: 'Shift deleted successfully' })
}

// Employee edits their own shift — PUT /api/timesheet/:id
async function editShift(req, res) {
  const shift_id = req.params.id
  const { working_time, late_time, shift_type } = req.body
  await Shift.updateShift(shift_id, working_time, late_time, shift_type)
  res.json({ message: 'Shift updated successfully' })
}


module.exports = { createShift, getMyShifts, getPendingShifts, getAllShifts, updateShiftStatus, deleteShift, editShift }
