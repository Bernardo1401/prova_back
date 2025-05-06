const { format } = require("@fast-csv/format");

const clienteModel = require("../models/clienteModel");

const exportClientesCSV = async (req, res) => {
    try {
        const wizards = await clienteModel.getClientes();

        res.setHeader("Content-Disposition", "attachment; filename=clientes.csv");
        res.setHeader("Content-Type", "text/csv");

        const csvStream = format({ headers: true });
        csvStream.pipe(res);

        wizards.forEach((cliente) => {
            csvStream.write({
                id: cliente.id,
                name: cliente.name,
                idade: cliente.idade,
                foto: cliente.foto,
            });
        });
        csvStream.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o CSV" });
    }
};

module.exports = { exportClientesCSV};