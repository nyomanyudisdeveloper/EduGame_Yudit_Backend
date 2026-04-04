import sql from "../../config/database"


export const getListGames = async () => {
    const games = await sql`
        SELECT id,name, description, thumbnail_link
        FROM game_master
    `;
    return games;
}

export const getGameById = async (id: string) => {
    const game = await sql`
        SELECT id,name, description, thumbnail_link
        FROM game_master
        WHERE id = ${id}
    `;
    return game[0];
}

export const getListModuleGameById = async (id: string) => {
    const game = await sql`
        SELECT b.id, b.name, b.description, b.level
        FROM game_master a 
        JOIN game_module b
        ON b.game_id = a.id
        WHERE a.id = ${id}
        ORDER BY b.level
    `;
    return game;
}
