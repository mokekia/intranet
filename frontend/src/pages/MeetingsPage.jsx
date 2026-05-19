// Meetings page matching the design:
// - "MEETINGS" heading
// - NEXT MEETING: single card showing the next meeting (icon, title, description, date/time/location/type pills)
// - UPCOMING MEETINGS: 2-column grid of green cards, fetched from GET /api/meetings/upcoming
// - PREVIOUS MEETINGS: 2-column grid of blue/purple cards, fetched from GET /api/meetings/previous
// - Manager/Admin only: form to create a new meeting (title, description, start/end datetime, location, type, participant checkboxes), posts to POST /api/meetings
// - Auto-refreshes every 30 seconds using setInterval inside useEffect (cleanup on unmount)

 import  './MeetingsPage.css';

function MeetingTitle(){
    return (
        <div>  
            <h1 id="meetingTitle">MEETINGS</h1>
            <h2 id="nextMeetingTitle">NEXT MEETING</h2>
        </div>
    );  
}

function SprintPlanning(){
    return (


        <div id="sprintPlanningCard">
            <h1 id="sprintPlanning">Sprint Planning</h1>
            <div className="sprintPlanningGrid">
                <p> 📅 Date</p>
                <p> 🕒 Time</p>
                <p> 📍 Location</p>
                <p> 🏷️ Type</p>
            </div>
            
        </div>
    );
}


function UpcomingMeetings(){
    return (
        <div className="body">
            <h1 id="upcomingMeetings">UPCOMING MEETINGS</h1>

            <div className="upcomingMeetingsGrid">
                
                <section className = "upcomingMeetingCard">
                    <div className="background">
                        <h3>Sprint Planning</h3>
                        <div className="meetingDetails">
                            <p >📅</p>
                            <p >🕒</p>
                            <p >📍</p>
                            <p>🏷️</p>
                        </div>

                    </div>
                    
                </section>

                <section className = "upcomingMeetingCard">
                    <div className="background">
                        <h3>Sprint Planning</h3>
                        <div className="meetingDetails">
                            <p >📅</p>
                            <p >🕒</p>
                            <p >📍</p>
                        </div>
                    </div>
                </section>

                <section className = "upcomingMeetingCard">
                    <div className="background">
                        <h3>Sprint Planning</h3>
                        <div className="meetingDetails">
                            <p >📅</p>
                            <p >🕒</p>
                            <p >📍</p>
                        </div>
                    </div>
                </section>

                <section className = "upcomingMeetingCard">
                    <div className="background">
                        <h3>Sprint Planning</h3>
                        <div className="meetingDetails">
                            <p >📅</p>
                            <p >🕒</p>
                            <p >📍</p>
                            <p>🏷️</p>
                        </div>

                    </div>
                    
                </section>

               

            </div>
            
                
        </div>
    );

    
}



function PreviousMeetings(){
    return (
        <div className="body">
            <h1 id="previousMeetings">PREVIOUS MEETINGS</h1>
            <div className="previousMeetingsGrid">

                <section className = "previousMeetingCard">
                    <div className="backgroundPrevious">
                        <h3>Client Meeting</h3>
                        <div className="Details">
                            <p >📅</p>
                            <p>🕒</p>
                            <p >📍</p>
                            <p >🏷️</p>
                        </div>

                    </div>
                    
                </section>

                <section className = "previousMeetingCard">
                    <div className="backgroundPrevious">
                        <h3>Client Meeting</h3>
                        <div className="Details">
                            <p >📅</p>
                            <p>🕒</p>
                            <p >📍</p>
                            <p >🏷️</p>
                        </div>

                    </div>
                    
                </section>

                <section className = "previousMeetingCard">
                    <div className="backgroundPrevious">
                        <h3>Client Meeting</h3>
                        <div className="Details">
                            <p >📅</p>
                            <p>🕒</p>
                            <p >📍</p>
                            <p >🏷️</p>
                        </div>

                    </div>
                    
                </section>

                <section className = "previousMeetingCard">
                    <div className="backgroundPrevious">
                        <h3>Client Meeting</h3>
                        <div className="Details">
                            <p >📅</p>
                            <p>🕒</p>
                            <p >📍</p>
                            <p >🏷️</p>
                        </div>

                    </div>
                    
                </section>

                <section className = "previousMeetingCard">
                    <div className="backgroundPrevious">
                        <h3>Client Meeting</h3>
                        <div className="Details">
                            <p >📅</p>
                            <p>🕒</p>
                            <p >📍</p>
                            <p >🏷️</p>
                        </div>

                    </div>
                    
                </section>

                <section className = "previousMeetingCard">
                    <div className="backgroundPrevious">
                        <h3>Client Meeting</h3>
                        <div className="Details">
                            <p >📅</p>
                            <p>🕒</p>
                            <p >📍</p>
                            <p >🏷️</p>
                        </div>

                    </div>
                    
                </section>
            </div>
        </div>
    );     
}

function MeetingsPage(){
    return (
        <div style={{ color: "white", background: "#E4E9FF", padding: "40px" }}>
            <MeetingTitle />
            <SprintPlanning />
            <UpcomingMeetings />
            <PreviousMeetings />

            


        </div>
    );
}



const MeetingForm = ({ onSubmit, user }) => {

  const [formData, setFormData] = useState({
    time: "",
    date: "",
    location: "",
    type: "",
    userId: user?.id || ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      time: "",
      date: "",
      location: "",
      type: "",
      userId: user?.id || ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="">Select Type</option>
        <option value="personal meeting">Personal Meeting</option>
        <option value="group meeting">Group Meeting</option>
      </select>

      <button type="submit">
        Create Meeting
      </button>

    </form>
  );
};




 //return (
//         <form onSumbit={onSumbit}>
//             <input type="text" date= "date" location="location" time="time"/>
//             <select name="type">
//                 <option value="personal meeting">Personal Meeting</option>
//                 <option value="group meeting">Group Meeting</option>
//             </select>
//         </form>
//    );



export default MeetingsPage;


