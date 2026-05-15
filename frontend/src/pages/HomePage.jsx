// Home page matching the design:
// - Dark hero banner with background image: "Welcome back Joe!" (name in gold)
// - SHORTCUTS section: three buttons — Time Sheets, Payslip, Meetings
// - NEWS section: grid of up to 4 news cards (image placeholder + title + body), fetched from GET /api/news
// - MEETINGS section: shows the next upcoming meeting card (title, description, date, time, location, type), fetched from GET /api/meetings/next

export default function HomePage() {
    return (
        <div style={{background: '#0d0d0f', minHeight: '100vh'}}>
            <h1 style={{color: 'white', padding: '40px'}}>
                Home Page is coming soon!
            </h1>
        </div>
    );
}




// We are working in separate branches. Each person is responsible for their own pages and backend. I commented out the routes for the other pages because those files don't exist yet — if I import a file that doesn't exist, the whole app crashes.
// As each person finishes their branch and merges to main, I uncomment their route and connect it. This way main always stays stable and working."

// Why this is actually the correct professional way:
// Person 1 finishes LoginPage    → I uncomment /login route
// Person 3 finishes TimeSheet    → I uncomment /timesheet route
// Person 4 finishes Meetings     → I uncomment /meetings route
// Person 5 finishes Payslip      → I uncomment /payslip route
// Incremental integration" — you build and connect pieces one at a time as they become ready, instead of waiting for everyone to finish before anything works.