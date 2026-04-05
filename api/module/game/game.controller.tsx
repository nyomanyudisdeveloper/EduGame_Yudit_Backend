import { Request, Response } from "express";
import * as gameService from './game.service';


export const getListGames = async (req: Request, res: Response) => {
    const result = await gameService.getListGames()
    res.json(result);
}

export const getGameById = async (req: Request, res: Response) => {
    
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

export const createGameSession = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    
    const { gameModuleId, name, deadlineDateFrom, deadlineDateTo } = req.body;
   
    if (!gameModuleId || !name || !deadlineDateFrom || !deadlineDateTo) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const sessionId = await gameService.createGameSession(gameModuleId, name, deadlineDateFrom, deadlineDateTo,userId);
        res.status(201).json({ id: sessionId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating game session' });
    }
}

export const getListGameSessions = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    try {
        const listGameSessions = await gameService.getListGameSessions(userId);
        res.status(201).json(listGameSessions);
    } catch (error) {
        res.status(500).json({ message: 'Error creating game session' });
    }
}