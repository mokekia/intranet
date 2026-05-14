// Run with: npm run db:migrate
// Creates all tables: employees, news, meetings, meeting_participants, shifts, payslips
const dotenv = require('dotenv')
dotenv.config()
const pool = require('./db.js')

const migrate = async () => {
  try {
    await pool.query(`DROP TABLE IF EXISTS payslips;`)
    await pool.query(`DROP TABLE IF EXISTS meeting_participants;`)
    await pool.query(`DROP TABLE IF EXISTS meetings;`)
    await pool.query(`DROP TABLE IF EXISTS news;`)
    await pool.query(`DROP TABLE IF EXISTS employees;`)
    
    await pool.query(`
      CREATE TABLE employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        hourly_rate FLOAT NOT NULL,
        role VARCHAR(20) CHECK (role IN ('Employee', 'Manager', 'Admin')) NOT NULL
    );`);
    
    await pool.query(`
      CREATE TABLE news (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_by INTEGER REFERENCES employees(id)
      );
      `);
    
    await pool.query(`
      CREATE TABLE meetings (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(255) NOT NULL,
        location VARCHAR(100) NOT NULL,
        start_time TIMESTAMP,
        type_of_meeting VARCHAR(20) CHECK (type_of_meeting IN ('Online', 'In-Person')),
        created_by INTEGER REFERENCES employees(id)
      );
      `);
    
    await pool.query(`
      CREATE TABLE meeting_participants (
        meeting_id INTEGER REFERENCES meetings(id),
        employee_id INTEGER REFERENCES employees(id)
      );
      `);
    
    await pool.query(`
      CREATE TABLE shifts (
        id SERIAL PRIMARY KEY,
        working_time INTEGER NOT NULL,
        late_time INTEGER,
        shift_type VARCHAR(50) CHECK (shift_type IN ('Working', 'Sick', 'Vacation')),
        status VARCHAR(50) CHECK (status IN ('Pending', 'Approved', 'Rejected')),
        date DATE NOT NULL,
        employee_id INTEGER REFERENCES employees(id)
      )
      `);
    
    await pool.query(`
      CREATE TABLE payslips (
        id SERIAL PRIMARY KEY,
        month DATE NOT NULL,
        total_hours FLOAT NOT NULL,
        total_salary FLOAT NOT NULL,
        employee_id INTEGER REFERENCES employees(id)
      )      
      `)

    console.log('Migration is complete, tables have been created')  
  } catch (error) {
    console.error(error)
  }
}
migrate()