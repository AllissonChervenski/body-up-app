# BodyUp - Workout Tracker 🏋️‍♂️

> Uma aplicação Full Stack para gerenciamento e monitoramento de treinos de musculação, focado em progressão de carga e volume de treino.

![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📋 Sobre o Projeto

O **BodyUp** foi desenvolvido para substituir o caderno de papel na academia. Ele permite registrar fichas de treino completas, calculando automaticamente o **Volume Load** (Carga × Repetições) de cada exercício e do treino total. O sistema conta com paginação otimizada no backend e uma interface responsiva.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** (Estilização e Responsividade)
- **Lucide React** (Ícones)
- **Fetch API** (Integração com Backend)

### Backend
- **Python 3.10+**
- **FastAPI** (API REST performática)
- **SQLAlchemy** (ORM)
- **Pydantic** (Validação de Dados e Schemas)
- **MySQL** (Banco de Dados Relacional)

---

## ✨ Funcionalidades Principais

- [x] **CRUD Completo:** Criação, Leitura, Edição e Exclusão de treinos.
- [x] **Cálculo Automático:** O sistema calcula o volume total (kg) em tempo real enquanto você digita.
- [x] **Paginação no Server-Side:** Carregamento eficiente de dados via API (Limit/Offset).
- [x] **Cascading Deletes:** Ao apagar uma ficha, todos os exercícios e séries vinculados são removidos automaticamente do banco.
- [x] **Design Responsivo:** Funciona bem em Desktop e Mobile.

---

## 📂 Estrutura do Projeto

O projeto é um Monorepo organizado da seguinte forma:

```bash
body-up-project/
├── backend/      # API em Python/FastAPI
├── frontend/     # Interface em React/Vite
└── README.md     # Documentação
```

## 🔧 Instalação e Execução

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- **Node.js** (v18 ou superior) e **npm**
- **Python** (v3.10 ou superior)
- **MySQL Server** rodando localmente

---

### 1. Configurando o Banco de Dados
Acesse seu terminal MySQL (ou Workbench) e crie um banco de dados vazio:

```sql
CREATE DATABASE bodyup;
```
---
### 2. Configurando o Backend (API)
- Entre na pasta do backend
```bash
cd backend
```
- Crie um ambiente virtual (Recomendado)
```bash
python3 -m venv venv
```
- Ative o ambiente virtual
- No Linux/Mac:
```bash
source venv/bin/activate
```
- No Windows:
```console
 venv\Scripts\activate
```

- Instale as dependências listadas
```bash
pip install -r requirements.txt
```
- Configure as variáveis de ambiente
- Crie um arquivo .env na pasta backend e adicione sua conexão MySQL:

```python
DATABASE_URL="mysql+pymysql://USUARIO:SENHA@localhost/bodyup"
```
- Inicie o servidor
```bash
uvicorn app.main:app --reload
```
A API estará rodando em: http://127.0.0.1:8000

---

### 3. Rodando o Frontend

- Entre na pasta do frontend
```bash
cd frontend
```

- Instale as dependências
```bash
npm install
```
- Rode o projeto
```bash
npm run dev
```
 O Frontend estará rodando em: http://localhost:5173 (ou porta similar)

---

### 🛣️ Próximos Passos (Roadmap)
- [ ] Implementar Dashboard com gráficos de evolução de carga.

- [ ] Adicionar sistema de Busca e Filtros por data.

- [ ] Implementar Autenticação (Login/JWT).
### 🤝 Contribuição
Este é um projeto de portfólio desenvolvido por ***Allisson Chervenski***. Sugestões e feedbacks são bem-vindos!
