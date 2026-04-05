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
        SELECT a.id,a.name, a.description, a.thumbnail_link, b.name AS subject_name, c.name AS category_name
        FROM game_master a
        LEFT JOIN subject_master b
        ON a.subject_id = b.id
        LEFT JOIN category_master c
        ON a.category_id = c.id
        WHERE a.id = ${id}
    `;
    return game[0];
}

export const getListModuleGameById = async (id: string) => {
    const game = await sql`
        SELECT b.id, b.name, b.description, b.level, b.thumbnail_link, b.path_trial_game
        FROM game_master a 
        JOIN game_module b
        ON b.game_id = a.id
        WHERE a.id = ${id}
        ORDER BY b.level
    `;
    return game;
}

export const createGameSession = async (gameModuleId: string, name: string, deadlineDateFrom: string, deadlineDateTo: string, userId: string) => {
    const session : { id: string }[] = await sql`
        INSERT INTO game_session (game_module_id, name, deadline_date_from, deadline_date_to, created_by, updated_by)
        VALUES (${gameModuleId}, ${name}, ${deadlineDateFrom}, ${deadlineDateTo}, ${userId}, ${userId})
        RETURNING id
    `;
    return session[0]?.id;
}   

