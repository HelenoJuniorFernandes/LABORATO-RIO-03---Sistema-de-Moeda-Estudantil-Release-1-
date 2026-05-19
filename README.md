<a href="https://classroom.github.com/online_ide?assignment_repo_id=99999999&assignment_repo_type=AssignmentRepo"><img src="https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg" width="200"/></a> <a href="https://classroom.github.com/open-in-codespaces?assignment_repo_id=99999999"><img src="https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg" width="250"/></a>

---

# 🪙 Sistema de Moeda Estudantil 🎓

> [!NOTE]
> Um sistema de recompensas para o ambiente universitário. O **Sistema de Moeda Estudantil** permite que professores reconheçam o mérito e o esforço dos alunos através da distribuição de moedas virtuais. Os alunos podem acumular essas moedas e trocá-las por vantagens exclusivas oferecidas por empresas parceiras na Loja de Vantagens.

<table>
  <tr>
    <td width="800px">
      <div align="justify">
        Este repositório contém a implementação completa do Sistema de Moeda Estudantil, cobrindo tanto o Back-end (construído com Java e Spring Boot) quanto o Front-end (desenvolvido em React e TypeScript). O sistema tem como objetivo principal engajar os alunos no ambiente acadêmico, transformando o mérito escolar em recompensas reais, e aproximar empresas da comunidade estudantil através de parcerias de benefícios. O projeto apresenta arquitetura em camadas, autenticação JWT, integração entre serviços RESTful e uma interface de usuário moderna focada em usabilidade (UX) e design de excelência.
      </div>
    </td>
    <td>
      <div>
        <img src="projeto/frontend/public/logo.png" alt="Logo do Projeto" width="120px" style="border-radius: 12px"/>
      </div>
    </td>
  </tr> 
</table>

---

## 🚧 Status do Projeto

[![Versão](https://img.shields.io/badge/Versão-v1.0.0-blue)](https://github.com/HelenoJuniorFernandes/LABORATO-RIO-03---Sistema-de-Moeda-Estudantil-Release-1-/releases)
![React](https://img.shields.io/badge/React-18-007ec6?style=for-the-badge&logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-5.0-007ec6?style=for-the-badge&logo=vite&logoColor=white) ![Java](https://img.shields.io/badge/Java-17-007ec6?style=for-the-badge&logo=openjdk&logoColor=white) ![Maven](https://img.shields.io/badge/Maven-3.9-007ec6?style=for-the-badge&logo=apachemaven&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3-007ec6?style=for-the-badge&logo=springboot&logoColor=white) ![GitHub repo size](https://img.shields.io/github/repo-size/HelenoJuniorFernandes/LABORATO-RIO-03---Sistema-de-Moeda-Estudantil-Release-1-?style=for-the-badge&logo=files) ![GitHub stars](https://img.shields.io/github/stars/HelenoJuniorFernandes/LABORATO-RIO-03---Sistema-de-Moeda-Estudantil-Release-1-?style=for-the-badge&logo=github)

---

## 🔗 Links Úteis
* 🌐 **Aplicação Online (Render):** [https://laborato-rio-03-sistema-de-moeda-5ts5.onrender.com](https://laborato-rio-03-sistema-de-moeda-5ts5.onrender.com)

---

## 📚 Índice
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Instalação e Execução](#-instalação-e-execução)
- [Deploy](#-deploy)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Autores](#-autores)
- [Licença](#-licença)

---

## 📝 Sobre o Projeto
O **Sistema de Moeda Estudantil** nasceu da necessidade de motivar os alunos e recompensar o bom desempenho acadêmico, o comportamento proativo e a participação em eventos institucionais. O sistema atua como uma ponte gamificada entre três perfis principais:

- **Alunos:** Recebem moedas, acompanham seu extrato e resgatam prêmios.
- **Professores:** Avaliam e enviam as moedas (com saldo ilimitado concedido pela instituição).
- **Empresas Parceiras:** Cadastram benefícios e recebem visibilidade na plataforma em troca dos descontos e prêmios fornecidos aos estudantes.

---

## ✨ Funcionalidades Principais

- 🔐 **Autenticação Segura (JWT):** Login para Alunos, Professores e Empresas.
- 💸 **Transferência de Moedas:** Professores podem enviar moedas para alunos informando um motivo.
- 🛍️ **Loja de Vantagens:** Catálogo de benefícios onde os alunos resgatam vantagens usando o saldo de moedas.
- 🎁 **Cadastro de Vantagens:** Painel exclusivo onde as Empresas Parceiras inserem novas ofertas (com foto, descrição e custo).
- 📄 **Extrato Dinâmico:** Histórico de transações em tempo real tanto para quem envia quanto para quem recebe.
- 👤 **Gestão de Perfil:** Atualização de dados pessoais individualizada para cada tipo de usuário.
- 🏢 **Cadastro Administrativo:** Painel de gestão de Alunos, Instituições e Empresas.

---

## 🛠 Tecnologias Utilizadas

### 💻 Front-end
* **Framework:** React v18
* **Linguagem:** TypeScript
* **Build Tool:** Vite
* **Estilização:** CSS3 puro (com design premium em *Glassmorphism* e CSS Grid/Flexbox)
* **Comunicação:** Axios (Consumo de API REST)

### 🖥️ Back-end
* **Linguagem:** Java 17
* **Framework:** Spring Boot 3.3.5
* **Autenticação:** Spring Security + JWT
* **Banco de Dados Local:** H2 Database (Em memória)
* **Banco de Dados Produção:** PostgreSQL
* **Documentação de API:** Swagger / OpenAPI

---

## 🏗 Arquitetura

O projeto adota uma arquitetura monolítica no back-end dividida nas camadas padrão do Spring (Controller, Service, Repository, Entity, DTO) para máxima organização e separação de responsabilidades. O Front-end utiliza componentes isolados em React para reutilização e contextos (AuthContext) para gerenciamento global de estado da sessão do usuário.

---

## 🔧 Instalação e Execução

### Pré-requisitos
* **Java JDK:** Versão **17**
* **Node.js:** Versão **v18+**
* **Maven** (Opcional, mas há o wrapper `./mvnw` incluso)

### 🔑 Variáveis de Ambiente

No diretório `projeto/frontend`, crie um arquivo `.env` para apontar para a API:
```env
VITE_API_URL=http://localhost:8080
```

### ⚡ Como Executar a Aplicação

#### Terminal 1: Back-end (Spring Boot)
```bash
cd projeto/backend
./mvnw spring-boot:run
```

#### Terminal 2: Front-end (React, Vite)
```bash
cd projeto/frontend
npm install
npm run dev
```

*Por padrão, ao iniciar a aplicação as tabelas serão geradas automaticamente pelo Hibernate e o `DataInitializer` preencherá o banco com contas de teste.*

Contas de teste padrão:
- `aluno@teste.com` (Senha: 123456)
- `professor@teste.com` (Senha: 123456)
- `empresa@teste.com` (Senha: 123456)

---

## 🚀 Deploy

A aplicação está configurada para deploy na nuvem.

- **Frontend:** Pode ser publicado no Render ou Vercel conectando a raiz à pasta `projeto/frontend`.
- **Backend:** Pode ser publicado no Render (via Web Service) utilizando o `Dockerfile` presente na pasta `projeto/backend`. O banco de dados configurado no Dockerfile é migrado automaticamente de H2 para PostgreSQL injetando as variáveis do ambiente na plataforma.

---

## 📂 Estrutura de Pastas

```text
moeda-estudantil-sprint02/
├── /projeto
│   ├── /backend                 # ☕ API em Java (Spring Boot)
│   │   ├── Dockerfile
│   │   ├── pom.xml
│   │   └── /src/main/java/com/moedaestudantil
│   │       ├── /config          # Configurações de Segurança e Dados iniciais
│   │       ├── /controller      # Controladores REST
│   │       ├── /dto             # Data Transfer Objects
│   │       ├── /model           # Entidades JPA
│   │       ├── /repository      # Repositórios
│   │       ├── /security        # Autenticação JWT
│   │       └── /service         # Regras de Negócio
│   │
│   └── /frontend                # ⚛️ Interface em React + Vite
│       ├── package.json
│       ├── /public
│       │   └── logo.png         # Logomarca do sistema
│       └── /src
│           ├── /components      # Componentes (Navbar, Sidebar)
│           ├── /contexts        # Contexto de Autenticação Global
│           ├── /pages           # Telas do Sistema
│           ├── /services        # Integração Axios com a API
│           ├── /types           # Definições de Tipos (TypeScript)
│           ├── App.tsx          # Roteamento Principal
│           └── index.css        # Estilos globais
```

---

## 👥 Autores

| 👤 Nome | 💼 Perfil |
|---------|-------------|
| Heleno Junior Fernandes | [GitHub](https://github.com/HelenoJuniorFernandes) |
| Nalanda | Colaboradora |

---

## 📄 Licença

Este projeto é distribuído sob a **Licença MIT**.
