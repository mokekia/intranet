// All routes require authMiddleware
// GET    /api/meetings/upcoming → meetingController.getUpcoming
// GET    /api/meetings/previous → meetingController.getPrevious
// GET    /api/meetings/next     → meetingController.getNext
// POST   /api/meetings          → meetingController.createMeeting   (manager, admin)
// PUT    /api/meetings/:id      → meetingController.updateMeeting   (manager, admin)
// DELETE /api/meetings/:id      → meetingController.deleteMeeting   (manager, admin)
import express from 'express';
import meetingController from '../controllers/meetingController.js';

const router = express.Router();

router.get('/upcoming', meetingController.getUpcoming);
router.get('/previous', meetingController.getPrevious);
router.get('/next', meetingController.getNext);
router.post('/', meetingController.createMeeting);
router.put('/:id', meetingController.updateMeeting);
router.delete('/:id', meetingController.deleteMeeting);

export default router;