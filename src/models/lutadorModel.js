const pool = require("../config/database");

const getLutadores = async () => {
    const result = await pool.query("SELECT * FROM lutadores");
    return result.rows;
};

const getLutadorById = async (id) => {
    const result = await pool.query("SELECT * FROM lutadores WHERE id = $1", [id]);
    return result.rows[0];
};

const deleteLutador = async (id) => {
    const result = await pool.query("DELETE FROM lutadores WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        return { error: "Lutador não encontrado." };
    }
    return { message: "Lutador deletado com sucesso." };
};

const updateLutador = async (id, data) => {
    const { 
        nome, 
        categoria_peso, 
        alcance_cm, 
        estilo_principal, 
        biografia, 
        cartel_vitorias, 
        cartel_derrotas, 
        cartel_empate, 
        principais_conquistas, 
        hall_da_fama, 
        destaque_home, 
        foto_url 
    } = data;
    
    const result = await pool.query(
        `UPDATE lutadores SET 
            nome = $1, 
            categoria_peso = $2, 
            alcance_cm = $3, 
            estilo_principal = $4, 
            biografia = $5, 
            cartel_vitorias = $6, 
            cartel_derrotas = $7, 
            cartel_empate = $8, 
            principais_conquistas = $9, 
            hall_da_fama = $10, 
            destaque_home = $11, 
            foto_url = $12 
        WHERE id = $13 RETURNING *`, 
        [nome, categoria_peso, alcance_cm, estilo_principal, biografia, cartel_vitorias, cartel_derrotas, cartel_empate, principais_conquistas, hall_da_fama, destaque_home, foto_url, id]
    );
    return result.rows[0];
};

const createLutador = async (nome, categoria_peso, alcance_cm, estilo_principal, biografia, cartel_vitorias, cartel_derrotas, cartel_empate, principais_conquistas, hall_da_fama, destaque_home, foto_url) => {
    const result = await pool.query(
        `INSERT INTO lutadores 
        (nome, categoria_peso, alcance_cm, estilo_principal, biografia, cartel_vitorias, cartel_derrotas, cartel_empate, principais_conquistas, hall_da_fama, destaque_home, foto_url) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`, 
        [nome, categoria_peso, alcance_cm, estilo_principal, biografia, cartel_vitorias, cartel_derrotas, cartel_empate, principais_conquistas, hall_da_fama, destaque_home, foto_url]
    );
    return result.rows[0];
};

module.exports = { getLutadores, getLutadorById, deleteLutador, updateLutador, createLutador };