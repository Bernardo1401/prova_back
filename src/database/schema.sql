CREATE DATABASE prova_back;

\c prova_back;

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    idade INTEGER NOT NULL,
    foto  TEXT
);

CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    mes_reserva VARCHAR(100) NOT NULL,
    tipo_reserva VARCHAR(30) NOT NULL,
    clinte_id INTEGER REFERENCES clientes(id) ON DELETE SET NULL
);

INSERT INTO clientes (name, idade) VALUES 
    ('Thiago', 27),
    ('Felipe', 32),
    ('Eduardo', 64),
    ('Marcelo', 95);

INSERT INTO reservas (mes_reserva, tipo_reserva, clinte_id) VALUES 
    ('janeiro', 'Premium', 1),
    ('dezembro', 'Gold', 2),
    ('abril', 'Silver', 3),
    ('março', 'Gold', 4);
