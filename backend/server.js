const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({message: 'Server is running'})
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})