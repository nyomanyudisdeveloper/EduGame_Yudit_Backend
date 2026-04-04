import { Request, Response } from "express";
import * as gameService from './game.service';


export const getListGames = async (req: Request, res: Response) => {
    const result = await gameService.getListGames()
    res.json(result);
}

export const getGameById = async (req: Request, res: Response) => {
    console.log("getGameById");
    const { id } = req.params;
    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid id' });
    }
    const result = await gameService.getGameById(id)
    res.json(result);
}

export const getListModuleGameById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid id' });
    }
    const result = await gameService.getListModuleGameById(id)
    res.json(result);
}