import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { DB_CONFIG } from './config/config';
import { supportTicketsRouter } from './api/routes/supportTickets';
import { supportAgentsRouter } from './api/routes/supportAgents';
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const port = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URI || '',DB_CONFIG)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    });

app.use('/api/support-tickets', supportTicketsRouter);

app.use("/api/support-agents",supportAgentsRouter);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
