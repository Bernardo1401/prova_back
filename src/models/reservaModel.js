const pool = require("../config/database");

const getReservas = async (mes_reserva) => {
    if(!mes_reserva) {
        const result = await pool.query (`SELECT reservas.*, cliente.name AS cliente_name 
            FROM reserva 
            LEFT JOIN clientes ON reservas.cliente_id = cliente.id`
        );
            return result.rows
    } else {
        const result = await pool.query (`SELECT reservas.*, cliente.name AS cliente_name 
            FROM reserva 
            LEFT JOIN clientes ON reservas.cliente_id = cliente.id WHERE reservas.mes_reserva ILIKE $1`,[`%${mes_reserva}%`]
        );
        return result.rows
    }
}

const getReservaById = async (id) => {
    const result = await pool.query (`SELECT reservas.*, clientes.name AS cliente_name 
        FROM reservas 
        LEFT JOIN clientes ON reservas.cliente_id = clientes.id 
        WHERE reservas.id = $1`, [id])
        return result.rows
}
const createReserva = async (mes_reserva, tipo_reserva, cliente_id) => {
    const result = await pool.query (`INSERT INTO reservas (mes_reserva, tipo_reserva, cliente_id) VALUES ($1, $2, $3) RETURNING *`, [mes_reserva, tipo_reserva, cliente_id])
    return result.rows[0]
}
const editReserva = async (mes_reserva, tipo_reserva, id) => {
    const result = await pool.query (`UPDATE post SET mes_reserva = $1, tipo_reserva = $2 WHERE id = $3 RETURNING *`, [mes_reserva, tipo_reserva, id])
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