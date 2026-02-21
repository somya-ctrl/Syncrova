
# Syncrova(Real-Time Communication Platform (Backend))

A scalable backend for a real-time community and messaging platform built with Node.js, Express, MongoDB, and Socket.io.
Supports authentication, servers, channels, messaging, and real-time events.

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

## 📁 Project Structure

```
src/
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

git clone <
cd project
npm install


Run:

npm run dev


## 📡 Socket Events

| Event          | Description                |
| -------------- | -------------------------- |
| newMsg         | Fired when message sent    |
| messageDeleted | Fired when message deleted |
| joinChannel    | User joins socket room     |

---

## 🎯 Upcoming Features

* Roles & permissions
* Message reactions
* Typing indicators
* Unread message tracking
* File uploads
* Frontend (React)

