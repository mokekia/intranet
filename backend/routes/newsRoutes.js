// All routes require authMiddleware
// GET    /api/news        → newsController.getNews
// POST   /api/news        → newsController.createNews    (manager, admin)
// DELETE /api/news/:id    → newsController.deleteNews    (admin)

const { Router } = require('express');

const { getNews, createNews, deleteNews } = require('../controllers/newsController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');

const { roleMiddleware } = require('../middleware/roleMiddleware.js');

const router = Router();

router.get('/', authMiddleware, getNews);
router.post("/", authMiddleware, roleMiddleware(['manager', 'admin']), createNews);
router.delete("/:id", authMiddleware, roleMiddleware([ 'admin']), deleteNews);

module.exports = router;