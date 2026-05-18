// Meetings page matching the design:
// - "MEETINGS" heading
// - NEXT MEETING: single card showing the next meeting (icon, title, description, date/time/location/type pills)
// - UPCOMING MEETINGS: 2-column grid of green cards, fetched from GET /api/meetings/upcoming
// - PREVIOUS MEETINGS: 2-column grid of blue/purple cards, fetched from GET /api/meetings/previous
// - Manager/Admin only: form to create a new meeting (title, description, start/end datetime, location, type, participant checkboxes), posts to POST /api/meetings
// - Auto-refreshes every 30 seconds using setInterval inside useEffect (cleanup on unmount)

function MeetingsPage() {
  return(
    <div>
      Meetings Page
    </div>
  )
}
export default MeetingsPage