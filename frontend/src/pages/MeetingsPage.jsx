// Meetings page matching the design:
// - "MEETINGS" heading
// - NEXT MEETING: single card showing the next meeting (icon, title, description, date/time/location/type pills)
// - UPCOMING MEETINGS: 2-column grid of green cards, fetched from GET /api/meetings/upcoming
// - PREVIOUS MEETINGS: 2-column grid of blue/purple cards, fetched from GET /api/meetings/previous
// - Manager/Admin only: form to create a new meeting (title, description, start/end datetime, location, type, participant checkboxes), posts to POST /api/meetings
// - Auto-refreshes every 30 seconds using setInterval inside useEffect (cleanup on unmount)

import {Calendar, Clock, MapPin, Tag} from "lucide-react";


function title(){
    return (
        <h1 id="meetingTitle">MEETINGS</h1>,
        <h2 id="nextMeetingTitle">NEXT MEETING</h2> 

    );  
}

function sprintPlanning(){
    return (
        
         <> 
         <h1 id="sprintPlanningTitle">Sprint Planning</h1>

        <p> <Calendar size={16} /> Date </p>
        <p> <Clock size={16} /> time </p>
        <p> <MapPin size={16} /> Location </p>
        <p> <Tag size={16} /> Type </p>
        </>


    );
}


function UpcomingMeetings(){
    return (

       <>
        <h1 id="UpcomingMeetingsTitle">UPCOMING MEETINGS</h1>

        <section id="upcomingMeetingsGrid">
            <div className = "upcomingMeetingCard">
                <h3>Sprint Planning</h3>
                <p><Calendar size={16} /></p>
                <p><Clock size={16} /></p>
                <p><MapPin size={16} /></p>
                <p><Tag size={16} /></p>

            </div>

        </section>
        
        </>
    );
}



function PreviousMeetings(){
    return (
        <>
        <h1 id="previousMeetingsTitle">PREVIOUS MEETINGS</h1>

        <section id="previousMeetingsGrid">
            <div className = "previousMeetingCard">
                <h3>Client Meeting</h3>
                <p><Calendar size={16} /></p>
                <p><Clock size={16} /></p>
                <p><MapPin size={16} /></p>
                <p><Tag size={16} /></p>    

            </div>

        </section>
        
        </>
        
       
    );
}

export default MeetingsPage;


