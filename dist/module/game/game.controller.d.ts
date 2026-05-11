import { Request, Response } from "express";
export declare const getListGames: (req: Request, res: Response) => Promise<void>;
export declare const getGameById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getListModuleGameById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createGameSession: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getListGameSessions: (req: Request, res: Response) => Promise<void>;
export declare const createGameSessionDetail: (req: Request, res: Response) => Promise<void>;
export declare const getGameSession: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getGameSessionDetail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateGameSessionDetail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getListGameSessionDetail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=game.controller.d.ts.map