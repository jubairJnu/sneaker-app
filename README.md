
# Sneaker Drop

A high concurrency Sneaker limited editon reservation system where thousands of users might try to reserve the same item simultaneously.


## How to Setup

Clone the project

```bash
  git clone https://github.com/jubairJnu/sneaker-app.git
```

Go to the project directory

```bash
  cd sneaker-app
```

### 1. Backend Setup
1. Navigate to the `backend` folder: `cd sneaker-backend`
2. Install dependencies: `bun install`
3. Create a `.env` file and add your database URL:
   ```env
   DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
   PORT=3001
   NODE_ENV=development
   ```

4. Database Schema Setup
```bash
bunx prisma db push
bunx prisma generate
```
5. Start the Server `bun dev`

### 2. Frontend Setup
1. Navigate to the frontend folder: cd frontend

2. Install dependencies: `bun install`

3. Start the app: `bun run dev`

4. Access the app at http://localhost:5173


## Architecture Choices
#### 1. 60-Second Expiration Logic
To handle the 60-second reservation window, I implemented a Passive-Active Hybrid Approach:

 **1. Database Tracking:** Every reservation is stored with an expiresAt timestamp (Current Time + 60s).

 **2.Background Worker (Cron Job):** A Node-Cron service runs every 10 seconds. It scans for PENDING reservations where expiresAt < NOW().

**3. Automatic Recovery:** When the Cron finds an expired item, it:

  - Reverts the availableStock by incrementing it (+1).
  - Updates the reservation status to EXPIRED.
  - Emits a Real-time Socket.io event to notify all connected clients that stock has been recovered.

### 2. Real-Time Synchronization
- Used **Socket.io** for bi-directional communication.

- Instead of the user refreshing the page, the stock count and the "Recent Purchasers" activity feed update instantly across all screens using a global React Context.

### Concurrency & Race Conditions
Preventing multiple users from claiming the same last item was the biggest challenge. I handled this using **Database-Level Atomic Transactions**:

### The "Over-Selling" Prevention Strategy:
  - **Atomic Decrement:** I used Prisma's $transaction with a checked update. When a user clicks "Reserve", the backend executes a query that only decrements the stock if availableStock > 0.

 - **Strict Validation:** Before creating a reservation record, the transaction ensures the product is still within its *startTime* and *endTime* window.

 - **Idempotency Key:** I implemented a clientId (stored in the browser's LocalStorage). This prevents a user from triggering multiple concurrent reservations for the same drop by clicking the button rapidly.


### Tech Stack
- **Frontend:** React, Tailwind CSS, Shadcn UI, Socket.io-client.

- **Backend:** Node.js, TypeScript, Express, Prisma ORM.

- **Database:** PostgreSQL (Neon).

- **Real-time:** Socket.io.