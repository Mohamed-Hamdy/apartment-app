import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import apartmentRoutes from './routes/apartmentRoutes';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/apartments', apartmentRoutes);
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }) // or use { force: true } during development
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error('Error syncing DB:', err);
    });

