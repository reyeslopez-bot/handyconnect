import express, { json } from 'express';
import { query } from './db';
const app = express();
app.use(json()); // Allows us to access request body as JSON

// Endpoint to create a new appointment
app.post('/appointments', async (req, res) => {
    try {
        const { date, time, description } = req.body;
        const newAppointment = await query(
            "INSERT INTO appointments (date, time, description) VALUES ($1, $2, $3) RETURNING *",
            [date, time, description]
        );
        res.json(newAppointment.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Endpoint to get all appointments
app.get('/appointments', async (req, res) => {
    try {
        const allAppointments = await query("SELECT * FROM appointments");
        res.json(allAppointments.rows);
    } catch (err) {
        console.error(err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
