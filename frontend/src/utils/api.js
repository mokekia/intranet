// Creates and exports an axios instance with baseURL '/api'
// Request interceptor: attaches the JWT from localStorage as Authorization: Bearer <token>
// Response interceptor: on 401, clears localStorage and redirects to /login
