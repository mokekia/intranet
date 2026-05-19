// Model for the meetings table — exports functions: getUpcoming, getPrevious, getNext, createMeeting, updateMeeting, deleteMeeting, addParticipant
import db from './config/db.js';

async function getUpcomingMeetings(){
    const result = await db.query('SELECT * FROM meetings WHERE date > NOW() ORDER BY date ASC')
    return result.rows;
}

async function getPreviousMeetings(){
    const result = await db.query('SELECT * FROM meetings WHERE date < NOW() ORDER BY date DESC')
    return result.rows;
}

async function createMeeting(id, date, location, type, time){
    const result = await db.query('INSERT INTO meetings (id, date, location, type, time) VALUES ($1, $2, $3, $4, $5)', [id, time,  date, location, type]);
    return result.rows[0];
}

async function updateMeeting(id, time,date, location, type){
    const result = await db.query('UPDATE meetings SET title=$1, description=$2, date=$3, location=$4, type=$5 WHERE id=$6', [title, description, date, location, type, id]);
    return result.rows[0];
}

async function deleteMeeting(id){
    const result = await db.query('DELETE FROM meetings WHERE id=$1', [id]);
    return result.rows[0];
}

async function getNextMeeting(userId){
    const result = await db.query('SELECT * FROM meetings m JOIN participants p ON m.id = p.meeting_id WHERE p.user_id = $1 AND m.date > NOW() ORDER BY m.date ASC LIMIT 1', [userId]);
    return result.rows[0];
}


export default {
    getUpcomingMeetings,
    getPreviousMeetings,
    createMeeting,
    updateMeeting,
    deleteMeeting,
    getNextMeeting
};