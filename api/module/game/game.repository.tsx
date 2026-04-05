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

export const getListGameSessions = async(userId: string) => { 
    const listGameSessios = await sql`
    SELECT CONCAT(c.name,' - ',b.name) as game_name, a.id as game_session_id, 
    a.name as name_session, 
    TO_CHAR(a.deadline_date_from,'FMDD FMMonth YYYY') as deadline_date_from, 
    TO_CHAR(a.deadline_date_to,'FMDD FMMonth YYYY') AS deadline_date_to
    , COUNT(d.*) as total_participant
    FROM game_session a
    JOIN game_module b 
    ON a.game_module_id = b.id
    JOIN game_master c 
    ON b.game_id = c.id
    LEFT JOIN game_session_detail d
    ON a.id = d.game_session_id
    WHERE a.updated_by = ${userId}
    GROUP BY c.name,b.name,a.id , a.name , a.deadline_date_from, a.deadline_date_to
    ORDER BY a.created_at DESC
    `
    return listGameSessios
} 

