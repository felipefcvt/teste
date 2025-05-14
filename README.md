# 🧪 Teste Prático FullStack — NestJS + React (Next.js)

Este projeto consiste em uma aplicação fullstack para gerenciamento de tarefas (to-do list), utilizando **NestJS** no backend e **Next.js + TailwindCSS** no frontend.

---

## 📁 Estrutura do Projeto

```
teste/
├── backend/     # API desenvolvida com NestJS e Prisma
└── frontend/    # Interface web criada com Next.js (App Router)
```

---

## ✅ Pré-requisitos

Certifique-se de ter instalado:

- [Node.js (v18+)](https://nodejs.org)

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/felipefcvt/teste.git
cd teste
```

---

### 2. Configure o backend

```bash
cd backend
cp .env.example .env
```

> Atualize as credenciais do banco no arquivo `.env` (variável `DATABASE_URL`).

#### 📦 Instale as dependências:

```bash
npm install
```

#### 🔧 Rode as migrations:

```bash
npx prisma migrate dev
```

#### ▶️ Inicie o servidor:

```bash
npm run start:dev
```

A API estará disponível em: [http://localhost:3000](http://localhost:3000)

Você também pode acessar a documentação Swagger em: [http://localhost:3000/docs](http://localhost:3000/docs)

---

### 3. Configure o frontend

Em outro terminal:

```bash
cd frontend
npm install
```

#### ▶️ Inicie o app:

```bash
npm run dev
```

O frontend estará disponível em: [http://localhost:3001](http://localhost:3001) (ou outra porta definida)

---

## 🧪 Funcionalidades

- Login fictício com armazenamento do nome no `localStorage`
- Listagem de tarefas
- Criação, edição e exclusão de tarefas
- Marcar tarefa como concluída
- Toasts de feedback
- Modal para criar e editar tarefas
- Layout responsivo com Tailwind

---

## 🧰 Tecnologias

### Backend
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Swagger](https://swagger.io/tools/swagger-ui/)

### Frontend
- [Next.js (App Router)](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Hot Toast](https://react-hot-toast.com/)

---

## 🧪 Testes automatizados (Backend)

O backend utiliza o **Jest** para testes unitários dos serviços e controllers.

### ▶️ Executar todos os testes:

```bash
cd backend
npm run test
```

### ▶️ Testes em modo watch:

```bash
npm run test:watch
```

### ▶️ Testes com cobertura:

```bash
npm run test:cov
```

Os testes estão localizados dentro da pasta:

```
backend/src/
├── tasks/
│   ├── tasks.service.spec.ts
│   └── tasks.controller.spec.ts
```

Esses testes cobrem:

- Regras de negócio da criação, edição e remoção de tarefas
- Validação de título duplicado
- Verificação de tarefas inexistentes
