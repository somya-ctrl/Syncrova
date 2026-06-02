# Syncrova
https://syncrova-phi.vercel.app/
Real-time community and messaging platform — Node.js backend + React frontend.

| Part | Progress | Details |
|------|----------|---------|
| **Backend** | ~70% | Auth, servers, channels, messaging, Socket.io |
| **Frontend** | ~35% | Landing, login & signup UI, routing — no API yet |

Frontend docs: [frontend/README.md](./frontend/README.md)

---

## 🚀 Features

### 🔐 Authentication

* User signup & login
* JWT access + refresh tokens
* Secure logout

### 👤 User Management

* Get user profile
* Update profile & avatar
* Online status management

### 🏠 Servers

* Create server
* Join / leave server
* Fetch user servers
* Delete server (owner only)

### 📺 Channels

* Create channel
* Create channel inside server
* Fetch channels per server
* Delete channel

### 💬 Messaging

* Send messages
* Edit messages
* Delete messages
* Paginated message fetch
* Real-time message broadcasting via Socket.io

### ⚡ Real-Time Capabilities

* Live messaging
* Channel-based socket rooms
* Instant updates

---

## 🛠 Tech Stack

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.io
* JWT Authentication
* bcrypt

**Architecture**

* Controller → Service → Repository pattern
* Modular routes
* Scalable structure

---

## 🖥 Frontend (summary)

**Location:** `frontend/` — see [frontend/README.md](./frontend/README.md) for full details.

### Done

* Landing page (hero, features, footer, mobile nav)
* Login & signup pages (UI and forms)
* React Router: `/`, `/login`, `/signup`
* Login ↔ signup navigation links
* Vite + Tailwind production build (Vercel-ready)

### Not started

* Backend API integration (auth, JWT)
* Dashboard: servers, channels, messaging
* Socket.io client & protected routes

---

## 📁 Project Structure

```
Syncrova/
├── frontend/          # React + Vite (see frontend/README.md)
│   └── src/pages/
└── src/               # Backend (Express)
    ├── controllers
    ├── services
    ├── repositories
    ├── models
    ├── routes
    ├── middlewares
    ├── app.js
    └── server.js
```

## ⚙️ Installation

### Backend

```bash
git clone <repo-url>
cd Syncrova
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 Socket Events

| Event          | Description                |
| -------------- | -------------------------- |
| newMsg         | Fired when message sent    |
| messageDeleted | Fired when message deleted |
| joinChannel    | User joins socket room     |

---

## 🎯 Upcoming Features

**Backend**

* Roles & permissions
* Message reactions
* Typing indicators
* Unread message tracking
* File uploads

**Frontend**

* Auth API integration & protected routes
* App shell (servers, channels, chat)
* Socket.io real-time messaging UI

