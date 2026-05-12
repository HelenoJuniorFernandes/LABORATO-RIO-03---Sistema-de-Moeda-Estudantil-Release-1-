# 🪙 Sistema de Moeda Estudantil — Sprint 02

## Descrição
Sistema para estimular o reconhecimento do mérito estudantil através de uma moeda virtual. Professores distribuem moedas aos alunos, que podem trocá-las por vantagens em empresas parceiras.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Backend | Spring Boot 3.3.3 (Java 17) |
| ORM | Spring Data JPA / Hibernate |
| Banco de Dados | PostgreSQL |
| Frontend | React 18 + TypeScript + Vite |
| Comunicação | REST API + Axios |

---

## 📁 Estrutura do Projeto

```
LAB03-SistemaDeMoedaEstudantil/
├── backend/
│   ├── src/main/java/com/moedaestudantil/
│   │   ├── MoedaEstudantilApplication.java
│   │   ├── config/
│   │   │   └── DataInitializer.java       # Carrega instituições iniciais
│   │   ├── controller/
│   │   │   ├── AlunoController.java
│   │   │   ├── EmpresaParceiraController.java
│   │   │   └── InstituicaoEnsinoController.java
│   │   ├── dto/
│   │   │   ├── AlunoDTO.java
│   │   │   ├── EmpresaParceiraDTO.java
│   │   │   └── InstituicaoEnsinoDTO.java
│   │   ├── exception/
│   │   │   ├── GlobalExceptionHandler.java
│   │   │   └── ResourceNotFoundException.java
│   │   ├── model/
│   │   │   ├── Usuario.java               # Entidade base (herança JOINED)
│   │   │   ├── Aluno.java
│   │   │   ├── Professor.java
│   │   │   ├── EmpresaParceira.java
│   │   │   └── InstituicaoEnsino.java
│   │   ├── repository/
│   │   │   ├── AlunoRepository.java
│   │   │   ├── EmpresaParceiraRepository.java
│   │   │   └── InstituicaoEnsinoRepository.java
│   │   └── service/
│   │       ├── AlunoService.java
│   │       ├── EmpresaParceiraService.java
│   │       └── InstituicaoEnsinoService.java
│   └── src/main/resources/
│       └── application.properties
└── frontend/
    └── src/
        ├── App.tsx
        ├── main.tsx
        ├── index.css
        ├── pages/
        │   ├── Dashboard.tsx
        │   ├── AlunosPage.tsx
        │   ├── EmpresasPage.tsx
        │   └── InstituicoesPage.tsx
        ├── services/
        │   └── api.ts
        └── types/
            └── index.ts
```

---

## ⚙️ Configuração e Execução

### Pré-requisitos
- Java 17+
- Maven 3.9+
- PostgreSQL (porta 5432)
- Node.js 18+ / npm

### 1. Banco de Dados

```sql
-- Criar o banco
CREATE DATABASE moedaestudantil_db;
```

### 2. Backend

```bash
# Edite a senha no application.properties
cd backend
mvn spring-boot:run
# API disponível em http://localhost:8080
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
# Frontend disponível em http://localhost:5173
```

---

## 🔌 Endpoints da API

### Alunos — `/api/alunos`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/alunos` | Listar todos |
| GET | `/api/alunos/{id}` | Buscar por ID |
| POST | `/api/alunos` | Criar novo |
| PUT | `/api/alunos/{id}` | Atualizar |
| DELETE | `/api/alunos/{id}` | Deletar |

### Empresas Parceiras — `/api/empresas`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/empresas` | Listar todas |
| GET | `/api/empresas/{id}` | Buscar por ID |
| POST | `/api/empresas` | Criar nova |
| PUT | `/api/empresas/{id}` | Atualizar |
| DELETE | `/api/empresas/{id}` | Deletar |

### Instituições de Ensino — `/api/instituicoes`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/instituicoes` | Listar todas |
| GET | `/api/instituicoes/{id}` | Buscar por ID |
| POST | `/api/instituicoes` | Criar nova |
| PUT | `/api/instituicoes/{id}` | Atualizar |
| DELETE | `/api/instituicoes/{id}` | Deletar |

---

## 🗄️ Modelo ER (Sprint 02)

```
usuarios (base)
  ├── alunos          (herança JOINED)
  ├── professores     (herança JOINED)
  └── empresas_parceiras (herança JOINED)

instituicoes_ensino
  └── referenciada por alunos e professores
```

### Estratégia de Herança
Utilizado **JOINED TABLE INHERITANCE** do JPA/Hibernate:
- Tabela `usuarios` contém campos comuns (id, nome, email, senha)
- Cada subclasse tem sua própria tabela com campos específicos
- Relacionamento via FK (id = PK compartilhada)

---

## ✅ Entregas da Sprint 02

- [x] Modelo ER definido
- [x] Estratégia de acesso ao banco: **Spring Data JPA (ORM)**
- [x] CRUD completo de Aluno (backend + frontend)
- [x] CRUD completo de Empresa Parceira (backend + frontend)
- [x] CRUD de Instituições de Ensino
- [x] Dados iniciais carregados automaticamente
- [x] Tratamento global de erros
- [x] Validações no backend (Bean Validation)
- [x] Comunicação frontend ↔ backend via REST/Axios
