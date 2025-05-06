const ReservaModel = require('../models/reservaModel');

const getAllReservas = async (req, res) => {
    try {
        const { mes_reserva } = req.query;
        const reservas = await ReservaModel.getReservas(mes_reserva);
        res.json(reservas) 
    } catch (error) {
        console.error('Erro ao buscar reservas:', error);
        res.status(500).json({ error: 'Erro ao buscar reservas.' });
    }
}

const getReservaById = async (req, res) => {
    try {
        const reserva = await ReservaModel.getReservaById(req.params.id);
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva não encontrada.' });
        }
        res.json(reserva);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar reserva.' });
    }
}
const createReserva = async (req, res) => {
    try {
        const { mes_reserva, tipo_reserva, cliente_id } = req.body;
        const newReserva = await ReservaModel.createReserva(mes_reserva, tipo_reserva, cliente_id);
        res.status(201).json(newReserva);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar reserva.' });
        
    }
}
const editReserva = async (req, res) => {
    try {
        const { mes_reserva, tipo_reserva, cliente_id } = req.body;
        const updatedReserva = await ReservaModel.editReserva(mes_reserva, tipo_reserva, cliente_id, req.params.id);
        if (!updatedReserva) {
            return res.status(404).json({ error: 'Reserva não encontrada.' });
        }
        res.json(updatedReserva);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar reserva.' });
    }
}
const deleteReserva = async (req, res) => {
    try {
        const result = await ReservaModel.deleteReserva(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar reserva.' });
    }
}

module.exports = { getAllReservas, getReservaById, createReserva, editReserva, deleteReserva };