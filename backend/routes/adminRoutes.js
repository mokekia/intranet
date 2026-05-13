// All routes require authMiddleware + roleMiddleware('admin')
// GET    /api/admin/stats              → adminController.getDashboardStats
// GET    /api/admin/employees          → adminController.getAllEmployees
// GET    /api/admin/employees/:id      → adminController.getEmployee
// POST   /api/admin/employees          → adminController.createEmployee
// PUT    /api/admin/employees/:id      → adminController.updateEmployee
// DELETE /api/admin/employees/:id      → adminController.deleteEmployee
