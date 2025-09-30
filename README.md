# 🥊 API Lendas Brasileiras do UFC

Uma API RESTful dedicada às maiores lendas brasileiras do Ultimate Fighting Championship (UFC), fornecendo informações detalhadas sobre lutadores icônicos que marcaram a história das artes marciais mistas.

## 📋 Sobre o Projeto

Esta API foi desenvolvida para centralizar informações sobre os lutadores brasileiros mais importantes da história do UFC, incluindo dados sobre carreiras, conquistas, estatísticas e curiosidades. Ideal para desenvolvedores que desejam criar aplicações relacionadas ao mundo das MMA ou para pesquisadores interessados na história do esporte no Brasil.

## 🚀 Funcionalidades

- ✅ Listagem completa de lendas brasileiras do UFC
- ✅ Busca detalhada por lutador específico
- ✅ Filtros por categoria de peso e status
- ✅ Estatísticas de carreira e recordes
- ✅ Informações sobre títulos e conquistas
- ✅ Dados biográficos e curiosidades
- ✅ Operações CRUD completas

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **pg** - Driver PostgreSQL para Node.js
- **Cors** - Configuração de CORS
- **Dotenv** - Variáveis de ambiente

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL (versão 13 ou superior)
- npm ou yarn

### Passos de Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Bernardo1401/api-lendas-ufc.git
cd proejto_back
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Configure o arquivo `.env` com suas credenciais do PostgreSQL:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=7777
DB_NAME=lendas_ufc_db
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
```

5. Configure o banco de dados PostgreSQL:
```sql
-- Conecte ao PostgreSQL e execute:
CREATE DATABASE lendas_ufc_db;

-- Use o banco criado
\c lendas_ufc_db;

-- Crie a tabela lutadores
CREATE TABLE lutadores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    categoria_peso VARCHAR(50) NOT NULL,
    alcance_cm INTEGER,
    estilo_principal VARCHAR(100),
    biografia TEXT,
    cartel_vitorias INTEGER DEFAULT 0,
    cartel_derrotas INTEGER DEFAULT 0,
    cartel_empate INTEGER DEFAULT 0,
    principais_conquistas TEXT,
    hall_da_fama BOOLEAN DEFAULT FALSE,
    destaque_home BOOLEAN DEFAULT FALSE,
    foto_url TEXT,
    genero VARCHAR(10) NOT NULL DEFAULT 'Masculino'
);
```

6. Execute a aplicação:
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📚 Documentação da API

### Base URL
```
http://localhost:3000/api
```

### Endpoints Principais

#### 🥊 Lutadores

##### Listar todos os lutadores
```http
GET /api/lutadores
```

**Parâmetros de Query:**
- `page` (number): Página da paginação (padrão: 1)
- `limit` (number): Itens por página (padrão: 10)
- `categoria` (string): Categoria de peso

**Exemplo de Response:**
```json
{
  "success": true,
  "message": "Lutadores encontrados",
  "data": [
{
  "id": 3,
  "nome": "Antonio Rodrigo Nogueira",
  "categoria_peso": "Peso Pesado",
  "alcance_cm": 191,
  "estilo_principal": "Jiu-Jitsu",
  "biografia": "Lenda do MMA mundial, \"Minotauro\", nascido em Vitoria da Conquista.",
  "cartel_vitorias": 34,
  "cartel_derrotas": 10,
  "cartel_empate": 1,
  "principais_conquistas": "Campeao Pride, Campeao Interino UFC",
  "hall_da_fama": true,
  "destaque_home": false,
  "foto_url": "https://a.espncdn.com/i/headshots/mma/players/full/2335521.png",
  "genero": "Masculino"
}  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

##### Buscar lutador por ID
```http
GET /api/lutadores/:id
```

##### Criar novo lutador
```http
POST /api/lutadores
```

**Body:**
```json
{
 {
  "id": 3,
  "nome": "Antonio Rodrigo Nogueira",
  "categoria_peso": "Peso Pesado",
  "alcance_cm": 191,
  "estilo_principal": "Jiu-Jitsu",
  "biografia": "Lenda do MMA mundial, \"Minotauro\", nascido em Vitoria da Conquista.",
  "cartel_vitorias": 34,
  "cartel_derrotas": 10,
  "cartel_empate": 1,
  "principais_conquistas": "Campeao Pride, Campeao Interino UFC",
  "hall_da_fama": true,
  "destaque_home": false,
  "foto_url": "https://a.espncdn.com/i/headshots/mma/players/full/2335521.png",
  "genero": "Masculino"
}
```

##### Atualizar lutador
```http
PUT /api/lutadores/:id
```

##### Deletar lutador
```http
DELETE /api/lutadores/:id
```

### Estrutura da Tabela Lutadores (PostgreSQL)

```sql
CREATE TABLE lutadores (
    id SERIAL PRIMARY KEY, 
    nome VARCHAR(100) UNIQUE NOT NULL,   
    categoria_peso VARCHAR(50) NOT NULL,
    alcance_cm INTEGER,
    estilo_principal VARCHAR(100),
    biografia TEXT,
    cartel_vitorias INTEGER DEFAULT 0,
    cartel_derrotas INTEGER DEFAULT 0,
    cartel_empate INTEGER DEFAULT 0,
    principais_conquistas TEXT,
    hall_da_fama BOOLEAN DEFAULT FALSE,
    destaque_home BOOLEAN DEFAULT FALSE,
    foto_url TEXT,
    genero VARCHAR(10) NOT NULL DEFAULT 'Masculino'
);
```

### Códigos de Status HTTP

- `200` - Sucesso na requisição
- `201` - Recurso criado com sucesso
- `400` - Requisição inválida (dados malformados)
- `404` - Recurso não encontrado
- `422` - Entidade não processável (validação falhou)
- `500` - Erro interno do servidor

### Exemplo de Uso

#### JavaScript/Node.js
```javascript
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';

// Buscar todos os lutadores
async function getLutadores() {
  try {
    const response = await axios.get(`${API_BASE_URL}/lutadores`);
    return response.data;
  } catch (error) {
    console.error('Erro:', error.response.data);
  }
}

// Buscar lutador por ID
async function getLutadorPorId(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/lutadores/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro:', error.response.data);
  }
}

// Criar novo lutador
async function criarLutador(dadosLutador) {
  try {
    const response = await axios.post(`${API_BASE_URL}/lutadores`, dadosLutador, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro:', error.response.data);
  }
}

// Atualizar lutador
async function atualizarLutador(id, dadosLutador) {
  try {
    const response = await axios.put(`${API_BASE_URL}/lutadores/${id}`, dadosLutador, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro:', error.response.data);
  }
}

// Deletar lutador
async function deletarLutador(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/lutadores/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro:', error.response.data);
  }
}
```

#### cURL
```bash
# Listar todos os lutadores
curl -X GET http://localhost:3000/api/lutadores

# Buscar lutador por ID
curl -X GET http://localhost:3000/api/lutadores/1

# Criar novo lutador
curl -X POST http://localhost:3000/api/lutadores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Charles Oliveira",
    "apelido": "Do Bronx",
    "idade": 34,
    "categoria": "Peso Leve",
    "nacionalidade": "Brasil",
    "vitorias": 33,
    "derrotas": 9,
    "empates": 1,
    "biografia": "Ex-campeão peso leve do UFC...",
    "titulos": ["Ex-Campeão Peso Leve UFC"],
    "ativo": true
  }'

# Atualizar lutador
curl -X PUT http://localhost:3000/api/lutadores/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Anderson Silva",
    "apelido": "The Spider",
    "idade": 49,
    "vitorias": 34,
    "derrotas": 11,
    "ativo": false
  }'

# Deletar lutador
curl -X DELETE http://localhost:3000/api/lutadores/1
```

## 🎯 Lendas Cadastradas

A API inclui informações sobre lendas como:

- **Anderson Silva** - "The Spider" - Ex-campeão peso médio (10 defesas de título consecutivas)
- **José Aldo** - "Scarface" - Ex-campeão peso pena (9 defesas de título)
- **Charles Oliveira** - "Do Bronx" - Ex-campeão peso leve (mais finalizações na história do UFC)
- **Amanda Nunes** - "The Lioness" - Ex-campeã dupla (peso galo e peso pena)
- **Lyoto Machida** - "The Dragon" - Ex-campeão meio-pesado
- **Maurício Shogun** - Ex-campeão meio-pesado
- **Vitor Belfort** - "The Phenom" - Lenda do octógono
- **Antônio Rodrigo Nogueira** - "Minotauro" - Hall da Fama do UFC
- **Fabricio Werdum** - Ex-campeão peso pesado
- **Junior dos Santos** - "Cigano" - Ex-campeão peso pesado

## 🔧 Configuração do Banco de Dados

### Scripts SQL para Inicialização

```sql
-- Criar banco de dados
CREATE DATABASE lendas_ufc_db;

-- Usar o banco
\c lendas_ufc_db;

-- Criar tabela de lutadores
CREATE TABLE lutadores (
   id SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    categoria_peso VARCHAR(50) NOT NULL,
    alcance_cm INTEGER,
    estilo_principal VARCHAR(100),
    biografia TEXT,
    cartel_vitorias INTEGER DEFAULT 0,
    cartel_derrotas INTEGER DEFAULT 0,
    cartel_empate INTEGER DEFAULT 0,
    principais_conquistas TEXT,
    hall_da_fama BOOLEAN DEFAULT FALSE,
    destaque_home BOOLEAN DEFAULT FALSE,
    foto_url TEXT,
    genero VARCHAR(10) NOT NULL DEFAULT 'Masculino'
);

-- Inserir dados de exemplo
INSERT INTO lutadores (nome, categoria_peso, alcance_cm, estilo_principal, biografia, cartel_vitorias, cartel_derrotas, cartel_empate, principais_conquistas, hall_da_fama, destaque_home, foto_url, genero) VALUES
('Fabricio Werdum', 'Peso Pesado', 196, 'Jiu-Jitsu', 'Ex-campeao mundial dos pesos pesados do UFC, nascido em Porto Alegre.', 24, 9, 1, 'Campeao UFC Peso Pesado, Campeao Strikeforce', TRUE, FALSE, 'https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/2354533.png', 'Masculino'),
('Junior dos Santos', 'Peso Pesado', 198, 'Boxe', 'Ex-campeao dos pesos pesados do UFC, nascido em Salvador, conhecido como "Cigano".', 21, 10, 0, 'Campeao UFC Peso Pesado', TRUE, FALSE, 'https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/2335725.png', 'Masculino'),
('Antonio Rodrigo Nogueira', 'Peso Pesado', 191, 'Jiu-Jitsu', 'Lenda do MMA mundial, "Minotauro", nascido em Vitoria da Conquista.', 34, 10, 1, 'Campeao Pride, Campeao Interino UFC', TRUE, FALSE, 'https://a.espncdn.com/i/headshots/mma/players/full/2335521.png', 'Masculino'),
('Glover Teixeira', 'Meio-Pesado', 193, 'Boxe', 'Ex-campeao meio-pesado do UFC, nascido em Sobralia, Minas Gerais.', 33, 9, 0, 'Campeao UFC Meio-Pesado', TRUE, FALSE, 'https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/2504929.png', 'Masculino'),
('Mauricio "Shogun" Rua', 'Meio-Pesado', 193, 'Muay Thai', 'Ex-campeao do UFC e Pride, nascido em Curitiba.', 27, 14, 1, 'Campeao UFC, Campeao Pride GP 2005', TRUE, TRUE, 'https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/2335514.png', 'Masculino'),
('Lyoto Machida', 'Meio-Pesado', 188, 'Karate', 'Ex-campeao meio-pesado do UFC, nascido em Salvador.', 26, 12, 0, 'Campeao UFC Meio-Pesado', TRUE, FALSE, 'https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/2335524.png', 'Masculino'),
('Anderson Silva', 'Peso Medio', 188, 'Muay Thai', 'Maior campeao da historia dos medios, nascido em Sao Paulo.', 34, 11, 0, 'Campeao UFC Peso Medio (16 defesas)', TRUE, TRUE, 'https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/2335447.png', 'Masculino'),


## 🧪 Testando a API

### Usando PostgreSQL diretamente
```sql
-- Verificar lutadores cadastrados
SELECT * FROM lutadores;

-- Buscar por categoria
SELECT * FROM lutadores WHERE categoria = 'Peso Médio';
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Padrões de Código

- Use ESLint para formatação
- Siga os padrões REST
- Documente todas as funções
- Teste todas as operações CRUD

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Equipe de Desenvolvimento

- **Bernardo Marques** - *Desenvolvedor Full Stack* - [@Bernardo1401](https://github.com/Bernardo1401)

## 📞 Suporte e Contato

Para suporte técnico e dúvidas:

- 📧 **Email**: suporte@lendas-ufc-api.com
- 📖 **Documentação**: [Wiki do Projeto](https://github.com/Bernardo1401/api-lendas-ufc.git/wiki)

## 🔄 Histórico de Versões

### v1.1.0 (2024-01-20)
- ✅ Migração para PostgreSQL
- ✅ Remoção da autenticação JWT
- ✅ Simplificação da arquitetura
- ✅ Documentação atualizada

### v1.0.0 (2024-01-15)
- ✅ Lançamento inicial da API
- ✅ CRUD completo de lutadores
- ✅ Configuração com PostgreSQL
- ✅ Documentação completa

## 🚀 Roadmap

### Próximas Funcionalidades

- [ ] Sistema de estatísticas avançadas
- [ ] Filtros mais complexos
- [ ] API de rankings
- [ ] Sistema de cache
- [ ] Documentação Swagger/OpenAPI
- [ ] Testes automatizados

---

<div align="center">

**⚡ Desenvolvido com ❤️ para os fãs das artes marciais mistas brasileiras**

![UFC](https://img.shields.io/badge/UFC-Legends-red)
![Brazil](https://img.shields.io/badge/Brazil-🇧🇷-green)
![API](https://img.shields.io/badge/API-REST-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)

</div>
