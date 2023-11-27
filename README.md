# REST Template

[![Express.js](https://img.shields.io/badge/Express.js-4.18.2-blue.svg)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.2-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

This is a simple template for kickstarting your RESTful API development. It provides a foundation with basic configurations and structure to help you build robust APIs quickly

## Features

- **Node.js** Backend server using Node.js for handling HTTP requests
- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js
- **Typescript:** Typed superset of JavaScript for enhanced code quality and development experience
- **PostgreSQL:** Database management system for data storage and retrieval
- **Zod:** TypeScript-first schema declaration and validation library for ensuring data integrity and validation
- **Path Aliases:** Custom path aliases for easier module imports
- **Powerful Architecture:** Scalable and maintainable architecture suitable for medium and large projects
- **JWT Authentication:** JSON Web Token implementation for secure user authentication and authorization

## Getting Started

### Prerequisites

- Node.js installed
- PostgreSQL database set up
- Basic knowledge of TypeScript and Node.js

### Installation

1. Clone the repository:
```bash
git clone http://github.com/temarych/rest-template.git your-project-directory
```

2. Navigate to your project directory:
```bash
cd your-project-directory
```

3. Install packages
```bash
npm install
```

## Usage

### Development

1. Start the server and watch for file updates: `npm run dev`
2. The API will be available at `http://localhost:3000`

### Production

1. Build the server: `npm run build`
2. Start the server: `npm run start`
3. The API will be available at `http://localhost:3000`

## Configuration

### Environment Variables

- `PORT`: Port on which the server will run (default is `3000`)
- `JWT_SECRET`: Secret key for JWT authentication (default is `SECRET`)
- `JWT_EXPIRES_IN`: Time after which access token expires (default is `5min`)
- `PASSWORD_HASH_ROUNDS`: Number of rounds used for hashing passwords (default is `10`)
- `DATABASE_HOST`: Hostname of the server where the database is located
- `DATABASE_USER`: Username used to authenticate and access the database
- `DATABASE_PASSWORD`: Password required to authenticate the specified database user

## Architecture

### Entities

Entities represent tables and relations stored in the database such as user, post, favorite post etc

- `*.dto.ts`: Data which can be sent to client
- `*.model.ts`: Data which can be used for internal operations
- `*.repository.ts`: A set of methods for CRUD operations in the database

### Modules

Modules represent features of your API such as authorization, search etc.

- `*.controller.ts`: Handlers for API subroutes
- `*.request.ts`: Schemas for request body validation
- `*.route.ts`: Route mapping

### Services

Services represent a set of methods for working with entities, external APIs etc

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
