// All routes require authMiddleware
// GET    /api/news        → newsController.getNews
// POST   /api/news        → newsController.createNews    (manager, admin)
// DELETE /api/news/:id    → newsController.deleteNews    (admin)

import { router } from 'express';

import { getNews, createNews, deleteNews } from '../controllers/newsController';
import { authMiddleware } from '../middleware/authMiddleware.js';

import { roleMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, getNews);
router.post("/", authMiddleware, roleMiddleware(['manager', 'admin']), createNews);
router.delete("/:id", authMiddleware, roleMiddleware([ 'admin']), deleteNews);

export default router;