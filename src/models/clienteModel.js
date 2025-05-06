const pool = require("../config/database");

const getClientes = async () => {
    const result = await pool.query("SELECT * FROM clientes");
    return result.rows;
};

const getClienteById = async (id) => {
    const result = await pool.query("SELECT * FROM clientes WHERE id = $1", [id]);
    return result.rows[0];
};

const deleteClientes = async (id) => {
    const result = await pool.query("DELETE FROM clientes WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        return { error: "Cliente não encontrado." };
    }
    return { message: "Cliente deletado com sucesso." };
};
const updateClientes = async (id, data) => {
    const { name, idade, foto } = data;
    const result = await pool.query("UPDATE clientes SET name = $1, idade = $2, foto = $3 WHERE id = $4 RETURNING *", [name, idade, foto, id]);
    return result.rows[0];
};

const createClientes = async (name, idade, foto) => {
    const result = await pool.query("INSERT INTO clientes (name, idade, foto) VALUES ($1, $2, $3) RETURNING *", [name, idade, foto]);
    return result.rows[0];
};

module.exports = { getClientes, getClienteById, deleteClientes, updateClientes, createClientes };