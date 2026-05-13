// All routes require authMiddleware
// GET  /api/payslip/current              → payslipController.getCurrentPayslip
// GET  /api/payslip/history              → payslipController.getPayslipHistory
// POST /api/payslip/generate             → payslipController.generatePayslip        (admin)
// GET  /api/payslip/employee/:id         → payslipController.getEmployeePayslips    (admin)
