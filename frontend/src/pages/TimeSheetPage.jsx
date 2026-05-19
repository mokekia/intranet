// Time sheet page:
// - Month navigator (prev / month+year / next)
// - Color-coded calendar grid:
//     green  = Approved
//     yellow = Vacation
//     pink   = Sick
//     grey   = Pending
// - Click an empty day → modal to log hours, type, and notes (POST /api/timesheet)
// - Employee view: fetches own shifts for the selected month (GET /api/timesheet/my?month=YYYY-MM)
// - Manager/Admin view: also shows a list of Pending shifts with Approve / Reject buttons (PUT /api/timesheet/:id/status)


import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import axios from 'axios'

function TimeSheetPage() {
  const { user, token } = useAuth()

  // creates an axios request with the JWT token attached
  async function request(method, url, data = null) {
    return axios({ method, url: `http://localhost:3000/api${url}`, data, headers: { Authorization: `Bearer ${token}` } })
  }

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [shifts, setShifts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedDay, setSelectedDay] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [employees, setEmployees] = useState([])
  const [formData, setFormData] = useState({ working_time: '', late_time: 0, shift_type: 'Working', notes: '' })
  const [isEditing, setIsEditing] = useState(false)

  // runs every time the month, year or selected employee changes
  useEffect(() => {
    fetchShifts()
  }, [currentMonth, currentYear, selectedEmployee])

  // fetches shifts from the API depending on role
  async function fetchShifts() {
    setLoading(true)
    setError(null)
    try {
      if (user.role === 'Employee') {
        const res = await request('get', `/timesheet/my?month=${currentMonth}&year=${currentYear}`)
        setShifts(res.data)
      } else {
        if (selectedEmployee) {
          const res = await request('get', `/timesheet/all`)
          const filtered = res.data.filter(shift => {
            const date = new Date(shift.date)
            return shift.employee_id === selectedEmployee.id &&
              date.getMonth() + 1 === currentMonth &&
              date.getFullYear() === currentYear
          })
          setShifts(filtered)
        }
      }
    } catch (err) {
      setError('Failed to load shifts')
    }
    setLoading(false)
  }

  // fetches all employees — only runs once when page loads, only for managers
  useEffect(() => {
    if (user.role === 'Manager' || user.role === 'Admin') {
      fetchEmployees()
    }
  }, [])

  async function fetchEmployees() {
    try {
      const res = await request('get', '/users')
      setEmployees(res.data)
    } catch (err) {
      setError('Failed to load employees')
    }
  }

  // goes to the previous month — if January, jumps to December of previous year
  function prevMonth() {
    if (currentMonth === 1) {
      setCurrentMonth(12)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  // goes to the next month — if December, jumps to January of next year
  function nextMonth() {
    if (currentMonth === 12) {
      setCurrentMonth(1)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // converts month number to month name — e.g. 5 → "May"
  function getMonthName(month) {
    const date = new Date(currentYear, month - 1, 1)
    return date.toLocaleString('default', { month: 'long' })
  }

  // returns the color class for a day based on its shift status
  function getDayColor(day) {
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const shift = shifts.find(s => s.date.slice(0, 10) === dateStr)
    if (!shift) return ''
    if (shift.status === 'Approved') return 'day-green'
    if (shift.status === 'Pending') return 'day-grey'
    if (shift.status === 'Rejected') return 'day-pink'
    if (shift.shift_type === 'Vacation') return 'day-yellow'
    if (shift.shift_type === 'Sick') return 'day-pink'
    return ''
  }

  // returns the shift object for a specific day number if it exists
  function getShiftForDay(day) {
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return shifts.find(s => s.date.slice(0, 10) === dateStr) || null
  }

  // builds the calendar grid — returns array of day numbers with empty slots for alignment
  function buildCalendar() {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
    const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay()
    const startOffset = firstDay === 0 ? 6 : firstDay - 1
    const days = []
    for (let i = 0; i < startOffset; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(i)
    return days
  }

  // opens the modal when a day is clicked
  function handleDayClick(day) {
    const shift = getShiftForDay(day)
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    setSelectedDay(dateStr)
    if (shift) {
      setFormData({ working_time: shift.working_time, late_time: shift.late_time, shift_type: shift.shift_type, notes: shift.notes || '' })
    } else {
      setFormData({ working_time: '', late_time: 0, shift_type: 'Working', notes: '' })
    }
    setIsEditing(false)
    setModalOpen(true)
  }

  // closes the modal and resets everything
  function closeModal() {
    setModalOpen(false)
    setSelectedDay(null)
    setIsEditing(false)
  }

  // submits a new shift to the API
  async function handleSubmit() {
    try {
      await request('post', '/timesheet', {
        date: selectedDay,
        working_time: formData.working_time,
        late_time: formData.late_time,
        shift_type: formData.shift_type
      })
      closeModal()
      fetchShifts()
    } catch (err) {
      setError('Failed to log shift')
    }
  }

  // deletes a shift after confirmation
  async function handleDelete() {
    const shift = shifts.find(s => s.date.slice(0, 10) === selectedDay)
    if (!window.confirm('Are you sure you want to delete this shift?')) return
    try {
      await request('delete', `/timesheet/${shift.id}`)
      closeModal()
      fetchShifts()
    } catch (err) {
      setError('Failed to delete shift')
    }
  }

  // saves edited shift to the API
  async function handleEdit() {
    const shift = shifts.find(s => s.date.slice(0, 10) === selectedDay)
    try {
      await request('put', `/timesheet/${shift.id}`, {
        working_time: formData.working_time,
        late_time: formData.late_time,
        shift_type: formData.shift_type
      })
      closeModal()
      fetchShifts()
    } catch (err) {
      setError('Failed to update shift')
    }
  }

  // calculates total approved hours for the current month
  function getTotalHours() {
    return shifts
      .filter(s => s.status === 'Approved')
      .reduce((total, s) => total + s.working_time, 0)
  }

  // adds a shift for every weekday that doesn't already have one
  async function handleAddFullMonth() {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth - 1, day)
      const dayOfWeek = date.getDay()
      if (dayOfWeek === 0 || dayOfWeek === 6) continue
      const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const alreadyLogged = shifts.find(s => s.date.slice(0, 10) === dateStr)
      if (alreadyLogged) continue
      try {
        await request('post', '/timesheet', { date: dateStr, working_time: 7, late_time: 0, shift_type: 'Working' })
      } catch (err) {
        setError('Failed to add full month')
        return
      }
    }
    fetchShifts()
  }

  // manager clicks an employee name — loads their calendar
  function handleSelectEmployee(employee) {
    setSelectedEmployee(employee)
    setShifts([])
  }

  // manager approves or rejects a shift
  async function handleUpdateStatus(shiftId, status) {
    try {
      await request('put', `/timesheet/${shiftId}/status`, { status })
      fetchShifts()
    } catch (err) {
      setError('Failed to update shift status')
    }
  }

  return (
    <div className='timesheet-page'>
      <h1>Time Sheet</h1>

      {/* Month navigator */}
      <div className='month-navigator'>
        <button onClick={prevMonth}>prev</button>
        <span>{getMonthName(currentMonth)} {currentYear}</span>
        <button onClick={nextMonth}>next</button>
      </div>

      {/* Loading and error states */}
      {loading && <p>Loading...</p>}
      {error && <p className='error'>{error}</p>}

      {/* Calendar grid */}
      {!loading && (
        <div className='calendar-grid'>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <div key={d} className='calendar-header'>{d}</div>
          ))}
          {buildCalendar().map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${day ? getDayColor(day) : 'empty'}`}
              onClick={() => day && handleDayClick(day)}
            >
              {day && <span>{day}</span>}
            </div>
          ))}
        </div>
      )}

      {/* Employee only section — total hours and add full month button */}
      {user.role === 'Employee' && (
        <div className='employee-actions'>
          <p className='total-hours'>Total approved hours: {getTotalHours()}h</p>
          <button onClick={handleAddFullMonth}>Add Full Month</button>
        </div>
      )}

      {/* Manager/Admin view — employee list and pending shifts */}
      {(user.role === 'Manager' || user.role === 'Admin') && (
        <div className='manager-view'>
          <div className='employee-list'>
            <h3>Employees</h3>
            {employees.map(emp => (
              <div
                key={emp.id}
                className={`employee-item ${selectedEmployee?.id === emp.id ? 'active' : ''}`}
                onClick={() => handleSelectEmployee(emp)}
              >
                {emp.name}
              </div>
            ))}
          </div>

          {selectedEmployee && (
            <div className='manager-shifts'>
              <h3>{selectedEmployee.name}'s shifts</h3>
              {shifts.filter(s => s.status === 'Pending').length === 0 ? (
                <p>No pending shifts</p>
              ) : (
                shifts.filter(s => s.status === 'Pending').map(shift => (
                  <div key={shift.id} className='pending-shift'>
                    <span>{shift.date.slice(0, 10)}</span>
                    <span>{shift.shift_type}</span>
                    <span>{shift.working_time}h</span>
                    <button onClick={() => handleUpdateStatus(shift.id, 'Approved')}>Approve</button>
                    <button onClick={() => handleUpdateStatus(shift.id, 'Rejected')}>Reject</button>
                  </div>
                ))
              )}
              {/* Confirm Calendar button — no function yet, Person 5 will wire this up */}
              <button className='confirm-btn' onClick={() => {}}>Confirm Calendar</button>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className='modal-overlay' onClick={closeModal}>
          <div className='modal' onClick={e => e.stopPropagation()}>
            <button className='modal-close' onClick={closeModal}>✕</button>
            <h2>{selectedDay}</h2>
            {getShiftForDay(selectedDay?.split('-')[2]) && !isEditing ? (
              <div>
                <p>Type: {formData.shift_type}</p>
                <p>Hours worked: {formData.working_time}</p>
                <p>Late hours: {formData.late_time}</p>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            ) : (
              <div>
                <label>Shift type</label>
                <select value={formData.shift_type} onChange={e => setFormData({ ...formData, shift_type: e.target.value })}>
                  <option value='Working'>Working</option>
                  <option value='Sick'>Sick</option>
                  <option value='Vacation'>Vacation</option>
                </select>
                <label>Hours worked</label>
                <input type='number' value={formData.working_time} onChange={e => setFormData({ ...formData, working_time: e.target.value })} />
                <label>Late hours</label>
                <input type='number' value={formData.late_time} onChange={e => setFormData({ ...formData, late_time: e.target.value })} />
                <button onClick={isEditing ? handleEdit : handleSubmit}>
                  {isEditing ? 'Save changes' : 'Log shift'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default TimeSheetPage
