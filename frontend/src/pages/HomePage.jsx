// Home page matching the design:
// - Dark hero banner with background image: "Welcome back Joe!" (name in gold)
// - SHORTCUTS section: three buttons — Time Sheets, Payslip, Meetings
// - NEWS section: grid of up to 4 news cards (image placeholder + title + body), fetched from GET /api/news
// - MEETINGS section: shows the next upcoming meeting card (title, description, date, time, location, type), fetched from GET /api/meetings/next

import "./HomePage.css";

const user = { name: "Joseph smith", role: "employee"};

const newsData = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
        title: "Company Picnic This Saturday!",
        body: "Join us for a fun day at the park with food, games and prizes. All employees and their families are invited!"

    }, 
    {
        id:2,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
        title: "New Health Insurance Plans",
        body: "We are excited to announce the launch of our new health"
    },
    {
        id:3,
        image:"https://unsplash.com/photos/a-large-office-space-J7YwSwnSckM", 
        title: "Office Renovation-Completed",
        body: "Our office renovation are finally completed!"

    },
    {
        id:4,
        image: "https://unsplash.com/photos/ai-artificial-intelligence-concept3d-renderingconceptual-image-lZqmEhe2if4",
        title: "AI Training Sessions",
        body: "Happy to announce that's we are offering our free AI Integration training sessions every monday and wednesday the next two months"
    },
]

const nextMeeting = [
    {
        title: "Planning for upcoming sprint",
        description: "Let's all discuss and plan for the next upcoming sprint. We will assing roles, go over backlog and potential shortcomings.",
        date: "2026-05-30",
        time: "10:30 AM",
        Location: "Zoom (link in calendar invite",
        type: "Team meeting"

    },

    {
        title: "AI Training session and Workshop",
        description: "Welcome to our AI training session! In this workshop, we will introduce our new AI Integration and how to use it to automeat your daily workflow. We will cover the best practices out there. The workshop will be help by Augustin Johnson, an AI engineer at Microsoft with over 10 years of experience in the field. Don't miss this opportunity to learn how to leverage AI to boost your productivity and efficiency at work.",
        date: "2026-06-10",
        time: "1:00 PM",
        Location: "Head auditorium ",
        type: "Workshop"

    }
];

const shortCuts = [
    { label: "Time Sheets",icon: "⏱", path: "/timesheet"},
    { label: "Payslip", icon: "💰", path: "/payslip"},
    { label: "Meetings Schedule", icon: "📅", path: "/meetings"}
];

export default function HomePage() {
    return (
        <div className= "HomePage">
            <section className="hero">
                <div className="hero-overlay">
                <div className="heo-content">
                    <h1 className="hero-title"> 
                        Welcome Back!<span className="hero-name">{user.name}</span></h1>
                </div>
                </div>
            </section>
            <div className="homepage-content">
                <section className= "shortcuts">
                    <h2 className= "section-title">SHORTCUTS</h2>
                    <div className="shortcuts-grid">
                        {shortcuts.map((s) => (
                            <a key={s.path} href={s.path} className="shortcut-card">
                                <span className="shortcut-icon">{s.icon}</span>
                                <span className="shortcut-label">{s.label}</span>
                            </a>
                        ))};
                    </div>
                </section>

                <section className="news">
                    <h2 className="section-title">
                        <span className="section-title-hightligt"> NEWS</span>
                    </h2>
                    <div className="news-grid">
                        {newsData.map((n) => (
                            <div key={n.id} className="news-card">
                                <img src={n.image} alt={n.title} className="news-image" />
                                <h3 className="news-title">{n.title}</h3>
                                <p className="news-body">{n.body}</p>
                            </div>
                        ))}
                    </div>
                    <div className="arrow">&#8964</div> {/* html code for a down arrow */}
                </section>

                <section className="meetings">
                    <h2 classname="section-title">
                        <span className="section-title-hightlight">UPCOMING MEETINGS</span>
                    </h2>
                    <div className="meeting-card">
                        <div className="meeting-card-header">
                            <div className="meeting-icon">📅</div>
                            <div>
                                <h3 className="meeting-title">{nextMeeting.title}</h3>
                                <p className="meeting-description">{nextMeeting.description}</p>
                            </div>
                        </div> 

                        <div className="meeting-detail">
                            <div className="meeting-detail">
                                <span className="meeting-detail-icon">⏰</span>
                                <div>
                                    <p className="meeting-detail-label">Time</p>
                                    <p className="meeting-detail-value">{nextMeeting.time}</p>
                                </div>
                            </div>
                        </div> 
                        
                        <div className="meeting-detail">
                            <div className="meeting-detail">
                                <span className="meeting-detail-icon">📍</span>
                                <div>
                                    <p className="meeting-detail-label">Location</p>
                                    <p className="meeting-detail-value">{nextMeeting.location}</p>
                                </div>
                            </div>
                        </div> 

                         <div className="meeting-detail">
                            <div className="meeting-detail">
                                <span className="meeting-detail-icon">👥</span>
                                <div>
                                    <p className="meeting-detail-label">Attendees</p>
                                    <p className="meeting-detail-value">{nextMeeting.type}</p> {/* Type of meeting, 1:1, , Workshop,team meeting, cheif meenting, all hands, etc. */}
                                </div>
                            </div>
                        </div> 

                    </div>
                </section>
            </div>
        </div>

    )
}
    




// We are working in separate branches. Each person is responsible for their own pages and backend. I commented out the routes for the other pages because those files don't exist yet — if I import a file that doesn't exist, the whole app crashes.
// As each person finishes their branch and merges to main, I uncomment their route and connect it. This way main always stays stable and working."

// Why this is actually the correct professional way:
// Person 1 finishes LoginPage    → I uncomment /login route
// Person 3 finishes TimeSheet    → I uncomment /timesheet route
// Person 4 finishes Meetings     → I uncomment /meetings route
// Person 5 finishes Payslip      → I uncomment /payslip route
// Incremental integration" — you build and connect pieces one at a time as they become ready, instead of waiting for everyone to finish before anything works.