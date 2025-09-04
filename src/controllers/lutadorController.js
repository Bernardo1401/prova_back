const lutadorModel = require('../models/lutadorModel');

const getAllLutadores = async (req, res) => {
    try {
        const lutadores = await lutadorModel.getLutadores();
        res.json(lutadores);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar lutadores." });
    }
};

const getLutadorById = async (req, res) => {
    const { id } = req.params;
    try {
        const lutador = await lutadorModel.getLutadorById(id);
        if (!lutador) {
            return res.status(404).json({ error: 'Lutador não encontrado.' });
        }
        res.json(lutador);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar lutador.' });
    }
}

const deleteLutador = async (req, res) => {
    try {
        const result = await lutadorModel.deleteLutador(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);

    } catch (error) {
        console.error('Erro ao buscar lutadores:', error);
        res.status(500).json({ error: 'Erro ao deletar lutador.' });
    }
}

const updateLutador = async (req, res) => {
    try {
        const lutador = await lutadorModel.updateLutador(req.params.id, req.body);
        if (!lutador) {
            return res.status(404).json({ message: "Lutador não encontrado." });
        }
        res.json(lutador);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o lutador." });
    }
}

const createLutador = async (req, res) => {
    try {
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
            destaque_home 
        } = req.body;
        const foto_url = req.file ? req.file.filename : null;
        const lutador = await lutadorModel.createLutador(
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
        );
        res.status(201).json(lutador);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar o lutador." });
    }
}

module.exports = {getAllLutadores, getLutadorById, deleteLutador, updateLutador, createLutador};