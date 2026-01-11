# International Law Application

A professional Node.js/Express application for an International Law Organization.

## Features
- **Treaty Management**
- **Multilingual Support** (EN, FR, ES)
- **Role-Based Authentication**
- **Dockerized Environment**

## Quick Start (Docker)
The easiest way to run this application is with Docker.

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd international-law-app
    ```
2.  Run with Docker Compose:
    ```bash
    docker-compose up --build
    ```
3.  Open `http://localhost:3000`

## Manual Installation
1.  **Install MySQL** and create a database named `international_law_db`.
2.  **Configure `.env`**: Copy `.env.example` to `.env` and update credentials.
3.  **Install Dependencies**:
    ```bash
    npm install
    ```
4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Project Structure
- `/models`: Sequelize schemas
- `/views`: EJS templates
- `/controllers`: Business logic
- `/routes`: Endpoint definitions
