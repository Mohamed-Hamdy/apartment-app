import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';  // Your sequelize instance
import apartmentRoutes from './routes/apartmentRoutes';  // Your routes

dotenv.config();

const app = express();
app.use(express.json());

app.use('/apartments', apartmentRoutes);

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        // Sync the Sequelize models with the database
        await sequelize.sync({ force: false });  // You can set to true during development, but false in production

        // Start the server
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error syncing database:', error);
        process.exit(1);  // Exit the process if sync fails
    }
};

startServer();
