# VIP Medwork - Frontend

This is the frontend application for the VIP Medwork system. It allows users to manage patients, assign providers, and track clinical statuses.

## Technologies Used

 • Next.js
 • TypeScript
 • Tailwind CSS
 • Zustand
 • TanStack Query (React Query)
 • Formik + Yup
 • Axios

---

Requirements
 • Node.js v18+
 • npm or yarn
 • Docker (if running inside container)

---

## Run Locally

1. Install dependencies

```bash
pnpm install
```

2. Start development server

```bash
pnpm run dev
```

By default, it runs on <http://localhost:3000>

---

## Build with Docker

1. Build the image

```bash
docker build -t vip-medwork-frontend .
```

2. Run the container

```bash
docker run -d -p 3000:3000 vip-medwork-frontend
```

You can now access the app at <http://localhost:3000>

---

### .dockerignore Example

node_modules
.next
*.log
dist
docker-compose*
.env*

---

### Folder Structure

/src
  /components        → Reusable UI components
  /hooks             → Custom React hooks (e.g. Zustand stores, React Query wrappers)
  /pages             → Application routes (Next.js)
  /services          → API services (commands & queries)
  /store             → Zustand stores
  /lib               → Shared utilities and configuration (e.g. react-query client)

---

### Notes
 • Ensure the backend services are up and reachable via environment variables.
 • All patient and provider operations assume backend endpoints are working and return responses wrapped in GenericResponse<T>.
 • Statuses should be preloaded into the backend with proper parent-child relationships (refer to backend seeding strategy).

---

### Author

Built by Inyer 👨‍💻
