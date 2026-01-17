# Clean Architecture & SOLID NestJS Boilerplate

A robust, production-ready scaffolding for building scalable Node.js applications using **NestJS**, following **Clean Architecture** principles and **SOLID** design patterns.

## 🎯 Purpose

This repository serves as a starting point (bootstrap) for projects that aim for:
- **Decoupling**: Business rules are independent of frameworks, databases, and external interfaces.
- **Maintainability**: Clear separation of concerns makes the code easier to understand and explicit.
- **Testability**: Core logic can be tested in isolation (Unit Tests) without side effects.

## 🚀 Key Features

- **Clean Architecture Layers**:
  - `Domain`: Enterprise business rules, Entities (pure TS, no dependencies).
  - `Application`: Use Cases, application-specific business rules.
  - `Infra`: Frameworks, drivers, database implementations (TypeORM, etc).
- **High Performance**:
  - **Fastify**: Utilizes Fastify instead of Express for improved throughput and lower latency.
  - **SWC**: Configured with SWC builder for up to 20x faster compilation speeds.
- **Package Management**: Built with **Yarn 4 (Berry)** using **Plug'n'Play (PnP)** for zero-install and faster CI/CD.
- **Docker Support**: Ready-to-go `Dockerfile` and `docker-compose.yml` for containerized environments.
- **Testing**: Jest configured for Unit and Integration tests.

## 📦 Yarn PnP & IDE Support

This project uses **Yarn Zero-Installs (PnP)**. This means there is **no `node_modules` folder**. Dependencies are stored as zip files in `.yarn/cache`.

### Why PnP?
- **Speed**: Installs are nearly instantaneous.
- **Stability**: Prevents "phantom dependencies" (you can only require what you declare).
- **CI/CD**: No `yarn install` needed in CI if you commit the `.yarn` folder.

### IDE Configuration (VSCode)

To ensure your editor (VSCode) understands the imports and provides IntelliSense, we use **@yarnpkg/sdks**.

If you see errors like `Cannot find module...` in VSCode, run:

```bash
yarn dlx @yarnpkg/sdks vscode
```

This command generates/updates the `.vscode/settings.json` and `.yarn/sdks` to tell VSCode how to locate dependencies within the PnP zip files.

> **Tip**: If you use a different editor (Vim, Emacs, IntelliJ), replace `vscode` with `base` or check the [Yarn SDK documentation](https://yarnpkg.com/getting-started/editor-sdks).

## 🛠️ Getting Started

### Local Development

1. **Install Dependencies** (if not versioning cache):
   ```bash
   yarn install
   ```

2. **Environment Setup**:
   The application supports multiple environment files with the following precedence:
   1. `.env.local` (Local overrides, gitignored)
   2. `.env.staging` / `.env.development` (Based on `NODE_ENV`)
   3. `.env` (Base defaults)

   Copy the example environment file to start:
   ```bash
   cp .env.example .env.local
   ```

3. **Run Development Server**:
   ```bash
   yarn start:dev
   ```

4. **Run Tests**:
   ```bash
   yarn test
   ```

### 🐳 Docker Support

To run the complete environment (API + PostgreSQL) using Docker Compose:

```bash
docker compose up -d
```

- **API URL**: [http://localhost:3000](http://localhost:3000)
- **Database**: Port `5432`

If you make changes to the code or dependencies, rebuild the container:

```bash
docker compose up -d --build
```

## 📂 Project Structure

```
src/
├── application/       # Use Cases, Interfaces, Application Business Rules
├── domain/            # Entities, Domain Services (Pure TS, framework agnostic)
└── infra/             # External Details
    ├── db/            # Database implementations (TypeORM, InMemory)
    ├── http/          # HTTP Framework (NestJS controllers, modules)
    └── main.ts        # Entry point (Fastify + SWC enabled)
```

---
Happy Coding! 🚀
