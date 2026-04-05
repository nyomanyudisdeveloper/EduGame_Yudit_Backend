import * as gameRepo from './game.repository'

export const getListGames = async () => {
    return await gameRepo.getListGames();;
}

export const getGameById = async (id: string) => {
    return await gameRepo.getGameById(id);
}

export const getListModuleGameById = async (id: string) => {
    return await gameRepo.getListModuleGameById(id);
}

export const createGameSession = async (gameModuleId: string, name: string, deadlineDateFrom: string, deadlineDateTo: string, userId:string) => {
    return await gameRepo.createGameSession(gameModuleId, name, deadlineDateFrom, deadlineDateTo,userId);
}

export const getListGameSessions = async (userId: string) => {
    return await gameRepo.getListGameSessions(userId)
}

export const createGameSessionDetail = async(game_session_id:string,student_name:string) => {
    return await gameRepo.createGameSessionDetail(game_session_id,student_name)
}

export const getGameSession = async(sessionId:string) => {
    return await gameRepo.getGameSession(sessionId)
} 

export const getGameSessionDetail = async(sessionDetailID: string) => {
    return await gameRepo.getGameSessionDetail(sessionDetailID)
}

export const updateGameSessionDetail = async(sessionDetailID: string, level: number, score: number, duration: Date) => {
    return await gameRepo.updateGameSessionDetail(sessionDetailID,level,score,duration)
}
