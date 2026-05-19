// getUpcoming: returns meetings where start_time > NOW()
// getPrevious: returns meetings where start_time < NOW()
// getNext: returns the next meeting for the logged-in user
// createMeeting: creates a meeting and links participants (manager/admin only)
// updateMeeting: edits a meeting by id
// deleteMeeting: removes a meeting by id
import Meetings from './models.js';

async function getUpcoming(req, res){
    try {
        const meetings = await Meetings.getUpcomingMeetings();
        res.json(meetings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getPrevious(req, res){
    try {
        const meetings = await Meetings.getPreviousMeetings();
        res.json(meetings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getNext(req, res){
    try {
        const userId = req.user.id; // Assuming authMiddleware sets req.user
        const meeting = await Meetings.getNextMeeting(userId);
        res.json(meeting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
}

async function createMeeting(req, res){
    try {
        const { id, date, location, type, time } = req.body;
        const meeting = await Meetings.createMeeting(id, date, location, type, time);
        res.status(201).json(meeting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateMeeting(req, res){
    try {
        const { id } = req.params;
        const { time, date, location, type } = req.body;
        const meeting = await Meetings.updateMeeting(id, time, date, location, type);
        res.json(meeting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteMeeting(req, res){
    try {
        const { id } = req.params;
        await Meetings.deleteMeeting(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }     
}

export default {
    getUpcoming,
    getPrevious,
    getNext,
    createMeeting,
    updateMeeting,
    deleteMeeting
};