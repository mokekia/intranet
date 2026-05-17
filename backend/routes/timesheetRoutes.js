// Routes for the timesheet, It connects URLs to controller functions
const express = require('express')
const router = express.Router()
const { createShift, getMyShifts, getPendingShifts, getAllShifts, updateShiftStatus } = require('../controllers/timesheetController.js')
const { protect } = require('../middleware/authMiddleware.js') // Person 1's middleware — checks JWT token
const { restrictTo } = require('../middleware/roleMiddleware.js') // Person 1's middleware — checks user role

// Employee routes: any logged in user can access 
router.post('/', protect, createShift)
router.get('/my', protect, getMyShifts)

// Manager routes: only Manager and Admin can access 
router.get('/pending', protect, restrictTo('Manager', 'Admin'), getPendingShifts)
router.get('/all', protect, restrictTo('Manager', 'Admin'), getAllShifts)
router.put('/:id/status', protect, restrictTo('Manager', 'Admin'), updateShiftStatus)

module.exports = router
