import express from 'express';
import { createSupportTicket, getAllSupportTickets } from '../controllers/supportTickets';

const router=express.Router();

router.get("/",getAllSupportTickets);

router.post("/",createSupportTicket);

export {router as supportTicketsRouter};