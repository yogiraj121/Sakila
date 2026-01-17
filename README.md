# Sakila Dashboard

A full-stack dashboard application to visualize data from the Sakila DVD rental database.

![Dashboard Screenshot](screenshot.png)
*(Save a screenshot of your dashboard as `screenshot.png` in this directory. You can use the image you provided earlier: `uploaded_image_0_1768627927114.png` or `uploaded_image_1_1768627927114.png`)*

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MySQL](https://www.mysql.com/) installed and running
- **Sakila Database**: Ensure you have the Sakila sample database installed in your MySQL instance.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd sakila-dashboard
    ```

2.  **Install dependencies for Backend:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install dependencies for Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

## Configuration

1.  **Backend Environment:**
    - Navigate to the `backend` folder.
    - Create a `.env` file (if it doesn't exist) with your database credentials:
      ```env
      DB_USER=root
      DB_PASSWORD=your_password
      DB_HOST=127.0.0.1
      DB_PORT=3306
      DB_NAME=sakila
      PORT=4000
      ```

## Running the Application

### 1. Start the Backend

Open a terminal and run:

```bash
cd backend
npm start
```

The backend server usually runs at `http://localhost:4000`.

### 2. Start the Frontend

Open a **new** terminal window and run:

```bash
cd frontend
npm run dev
```

The frontend will start (usually at `http://localhost:5173`). Open this URL in your browser to view the dashboard.

## Features

- **Top Rented Films**: Visualizes the most popular movies.
- **Revenue by Category**: Shows which genres generate the most revenue.
- **Top Customers**: Lists the best customers by spending.
- **Key Metrics**: Displays total revenue and active rentals.
- **Recent Transactions**: Shows the latest payments.
