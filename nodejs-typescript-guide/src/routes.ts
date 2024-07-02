import { Router, Request, Response } from 'express';
import axios from 'axios';
import { map } from './utils';

const router = Router();


router.get('/files', async (req: Request, res: Response) => {
    try {
        const response = await axios.get("https://rest-test-eight.vercel.app/api/test");
        const data = response.data.items;
        const result = map(data);

        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    } catch (error) {
        res.status(500).send('Error fetching files');
    }
});

export default router; 
