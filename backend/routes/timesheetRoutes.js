// All routes require authMiddleware
// GET /api/timesheet/my              → timesheetController.getMyShifts         (employee)
// GET /api/timesheet/pending         → timesheetController.getPendingShifts    (manager, admin)
// GET /api/timesheet/all             → timesheetController.getAllShifts         (manager, admin)
// POST /api/timesheet                → timesheetController.createShift          (employee)
// PUT  /api/timesheet/:id/status     → timesheetController.updateShiftStatus   (manager, admin)
