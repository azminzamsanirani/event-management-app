# Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/azminzamsanirani/event-management-app.git
```

### Navigate to the Backend Folder

```bash
cd event-management-app
cd backend
```

### Install Dependencies
```bash
npm install
```

### Set Up the Database in PostgreSQL

- Create a new database on your PostgreSQL server.

- You can name it event-management-app.

- Remember the database name, username, and password for the next step.

### Configure Environment Variables

- Edit the .env file inside the backend folder and set up the database URL:

```bash
DATABASE_URL="postgresql://your-user:your-password@localhost:5432/your-database"
```

Example:

```bash
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/event-management-app"
```

### Run Prisma Migrations

```bash
npx prisma migrate deploy
```

### Seed the Database

```bash
npx prisma db seed
```

###  Start the Backend Server

```bash
npm run start
```

### Navigate to the Frontend Folder

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

### Install Frontend Dependencies

```bash
npm install
```

### Start the Frontend Server

```bash
npm run dev
```

### Open the App in Your Browser