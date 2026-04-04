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