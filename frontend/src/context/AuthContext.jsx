// Creates AuthContext — AuthProvider stores user and token in state and localStorage
// Exports: useAuth() hook with { user, login(email, password), logout(), loading }
// login() calls POST /api/auth/login, saves token and user to localStorage
// logout() clears localStorage and resets user to null
