const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes.js')
const timesheetRoutes = require('./routes/timesheetRoutes.js')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoutes)
app.use('/api/timesheet', timesheetRoutes)

app.get('/', (req, res) => {
  res.json({message: 'Server is running'})
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})