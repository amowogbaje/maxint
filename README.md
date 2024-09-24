
# Maxint

## Description

A brief description of your project, its purpose, and functionality.

## Prerequisites

- Node.js 
- npm (Node Package Manager)
- PostgreSQL database

## Getting Started

Follow these instructions to set up the project on your local machine.

### 1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/amowogbaje/maxint.git
```

### 2. Navigate to the Project Directory

Change your working directory to the project folder:

```bash
cd maxint
```

### 3. Install Dependencies

Install the required packages using npm:

```bash
npm install
```

### 4. Create a `.env` File

rename the env.example to .env and put your parameters there


### 5. Configure the Database

Ensure that your PostgreSQL database is set up and accessible with the provided credentials. You may need to create the database if it doesn't already exist.

### 6. Run Migrations

If your project uses Sequelize for database migrations, you can run the following command to create the necessary tables:

```bash
npx sequelize-cli db:migrate
```

### 7. Start the Development Server

You can start the development server using:

```bash
npm start
```

The server will typically run on `http://localhost:3000`, but check your configuration if this is different.

## Usage

Swagger Docs: `https://app.swaggerhub.com/apis/AMOWOGBAJEGIDEON/Account-Feature/1.0.0`
