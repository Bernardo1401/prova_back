const pool = require("../config/database");

const getReservas = async (mes_reserva) => {
    if(!mes_reserva) {
        const result = await pool.query (`SELECT reservas.*, clientes.name AS cliente_name
            FROM reservas 
            LEFT JOIN clientes ON reservas.clinte_id = clientes.id`);
            return result.rows
    } else {
        const result = await pool.query (`SELECT reservas.*, clientes.name AS cliente_name
            FROM reservas 
            LEFT JOIN clientes ON reservas.clinte_id = clientes.id 
            WHERE reservas.mes_reserva = $1`, [mes_reserva]
        );
        return result.rows
    }
}

const getReservaById = async (id) => {
    const result = await pool.query (`SELECT reservas.*, clientes.name AS cliente_name
        FROM reservas
        LEFT JOIN clientes ON reservas.clinte_id = clientes.id 
        WHERE reservas.id = $1`, [id])
        return result.rows
}
const createReserva = async (mes_reserva, tipo_reserva, cliente_id) => {
    const result = await pool.query (`INSERT INTO reservas (mes_reserva, tipo_reserva, clinte_id) VALUES ($1, $2, $3) RETURNING *`, [mes_reserva, tipo_reserva, cliente_id])
    return result.rows[0]
}
const editReserva = async (mes_reserva, tipo_reserva, clinte_id, id) => {
    const result = await pool.query (`UPDATE reservas SET mes_reserva = $1, tipo_reserva = $2, clinte_id = $3 WHERE id = $4 RETURNING *`, [mes_reserva, tipo_reserva, clinte_id, id])
    return result.rows[0]
}
const deleteReserva = async (id) => {
    const result = await pool.query (`DELETE FROM reservas WHERE id = $1 RETURNING *`, [id])
    if (result.rowCount === 0) {
        return { error: "Reserva não encontrada." };
    }
    return { message: "Reserva deletada com sucesso." };
}


module.exports = { getReservas, getReservaById, createReserva, editReserva, deleteReserva };