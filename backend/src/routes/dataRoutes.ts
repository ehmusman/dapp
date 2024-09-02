// src/routes/dataRoutes.ts

import { Router } from 'express';
import { saveData } from '../controllers/dataController';

const router = Router();

router.post(`/save/bot${process.env.TELEGRAM_BOT_TOKEN}`, saveData);

export default router;
