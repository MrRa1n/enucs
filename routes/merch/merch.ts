import { Router, Request, Response } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.redirect('https://shop.spreadshirt.co.uk/enucs1/');
});

export { router };
