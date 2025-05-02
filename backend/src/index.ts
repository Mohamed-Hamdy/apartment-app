import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import apartmentRoutes from './routes/apartmentRoutes';

dotenv.config();

const app = express();

// CORS middleware to solve
// cors error when sending request from frontend
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true, // if you're using cookies/auth headers
}));

app.use(express.json());

// Routes
app.use('/api/apartments', apartmentRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error('Error syncing DB:', err);
    });
