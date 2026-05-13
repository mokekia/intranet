// Time sheet page:
// - Month navigator (prev / month+year / next)
// - Color-coded calendar grid:
//     green  = Approved
//     yellow = Vacation
//     pink   = Sick
//     blue   = Remote
//     grey   = Pending
// - Click an empty day → modal to log hours, type, and notes (POST /api/timesheet)
// - Employee view: fetches own shifts for the selected month (GET /api/timesheet/my?month=YYYY-MM)
// - Manager/Admin view: also shows a list of Pending shifts with Approve / Reject buttons (PUT /api/timesheet/:id/status)
