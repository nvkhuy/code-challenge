## Project Structure

```
src/problem5/
├── README.md
├── docker-compose.yml
├── prisma
│   ├── migrations
│   └── schema.prisma
└── src
    ├── controllers
    ├── services
    ├── routes
    └── index.ts
```

---

## Setup & Run

### 1. Start Postgres with Docker Compose
From the project root:

```bash
docker-compose up -d
````

This runs Postgres with:

* Host: `localhost`
* Port: `5432`
* User: `admin`
* Password: `admin`
* Database: `crude_server`

---

### 2. Configure Environment

Edit `.env` file:

```
DATABASE_URL="postgresql://admin:admin@localhost:5432/crude_server?schema=public"
```

---

### 3. Apply Prisma Migration

```bash
npx prisma migrate dev --name init
```

(Optional: view DB in browser)

```bash
npx prisma studio
```

---

### 4. Run the Server

```bash
npm run dev:problem5
```

Server will start on:
 `http://localhost:3000/api`

---

##  API Endpoints (with CURL examples)

### 1. Create a Resource

```bash
curl -X POST http://localhost:3000/api/resources \
  -H "Content-Type: application/json" \
  -d '{"name":"First Resource","description":"Hello from Prisma"}'
```

### 2. List Resources (supports pagination + filter by name)

```bash
# Default (page=1, limit=10)
curl http://localhost:3000/api/resources

# Paginated (page 2, limit 5)
curl "http://localhost:3000/api/resources?page=2&limit=5"

# Filter by name containing "Test"
curl "http://localhost:3000/api/resources?name=Test"
```

### 3. Get Resource by ID

```bash
curl http://localhost:3000/api/resources/1
```

### 4. Update Resource

```bash
curl -X PUT http://localhost:3000/api/resources/1 \
  -H "Content-Type: application/json" \
  -d '{"description":"Updated description"}'
```

### 5. Delete Resource

```bash
curl -X DELETE http://localhost:3000/api/resources/1
```

---

##  Features

* **CRUD API** with Prisma + Postgres
* **Pagination + filtering (name only)** on list endpoint
* **Error handling** for invalid filters & missing resources
* **Typed DTOs** with TypeScript (`CreateResourceDTO`, `UpdateResourceDTO`)
