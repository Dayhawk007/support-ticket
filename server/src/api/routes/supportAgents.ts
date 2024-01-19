import express from 'express'
import { createSupportAgent } from '../controllers/supportAgents';

const router=express.Router();

router.post("/",createSupportAgent);

export {router as supportAgentsRouter};