const clienteModel = require('../models/clienteModel');

const getAllClientes = async (req, res) => {
    try {
        const cliente = await clienteModel.getClientes(id);
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar cliente." });
    }
};

const getClienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await clienteModel.getClienteById(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado.' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cliente.' });
    }
}

const deleteCliente = async (req, res) => {
    try {
        const result = await clienteModel.deleteClientes(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);

    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: 'Erro ao deletar clientes.' });
    }
}

const updateCliente = async (req, res) => {
    try {
        const cliente = await clienteModel.updateClientes(req.params.id, req.body);
        if (!cliente) {
            return res.status(404).json({ message: "cliente não encontrado." });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o cliente." });
    }
}

const createCliente = async (req, res) => {
    try {
        const { name, idade} = req.body;
        const foto = req.file ? req.file.filename : null;
        const cliente = await clienteModel.createUsuarios(name, idade, foto);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar o cliente." });
    }
}

module.exports = {getAllClientes, getClienteById, deleteCliente, updateCliente, createCliente};