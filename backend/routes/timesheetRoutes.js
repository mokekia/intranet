
const express = require('express')
const router = express.Router()
const { createShift, getMyShifts, getPendingShifts, getAllShifts, updateShiftStatus, deleteShift, editShift } = require('../controllers/timesheetController.js')
const { authMiddleware } = require('../middleware/authMiddleware.js')
const { roleMiddleware } = require('../middleware/roleMiddleware.js')

// Employee routes — any logged in user can access these
router.post('/', authMiddleware, createShift)
router.get('/my', authMiddleware, getMyShifts)
router.delete('/:id', authMiddleware, deleteShift)
router.put('/:id', authMiddleware, editShift)


// Manager routes — only Manager and Admin can access these
router.get('/pending', authMiddleware, roleMiddleware('Manager', 'Admin'), getPendingShifts)
router.get('/all', authMiddleware, roleMiddleware('Manager', 'Admin'), getAllShifts)
router.put('/:id/status', authMiddleware, roleMiddleware('Manager', 'Admin'), updateShiftStatus)

module.exports = router
