# 🛒 Shop-Co

**Shop-Co** is a modern, full-stack e-commerce platform featuring real-time order tracking, role-based authentication (Client, Delivery Boy, Admin), and a clean scalable architecture. Built with **Next.js**, **Node.js**, **Express**, **TypeScript**, **MongoDB**, **Redis**, and **WebSockets**, it offers a powerful and responsive shopping experience.

## 🔗Links
- [Frontned](https://studioivory.art/) 
- [Backend](https://api.studioivory.art/health) 
- [Admin](https://admin.studioivory.art/)     
---


## 📌 Project Overview

- **Frontend**: Next.js (React) + React Query
- **Backend**: Node.js, Express.js, TypeScript
- **Architecture**: Clean Architecture
- **Authentication**: Role-based (Client, Delivery Boy, Admin)
- **Real-time**: WebSocket (Socket.io) with Redis Pub/Sub
- **Database**: MongoDB
- **Caching**: Redis
- **Deployment**: Self-hosted on EC2 (Frontend + Backend + Redis + MongoDB)

---


## 📹 Videos

### 1. Introduction to Shop-Co (Client Side)  
📽️ [Watch on Google Drive](https://drive.google.com/file/d/1Tcm3Ktl4lR64hCmnSd3aTjgHjA-I1Rwg/view?usp=drive_link)

### 2. Admin Side Works  
📽️ [Watch on Google Drive](https://drive.google.com/file/d/1ojhEpk5EtKuyZGPhSOgpCOMOygHHxJ60/view)

### 3. Real-time Order Tracking Demo  
📽️ [Watch on Google Drive](https://drive.google.com/file/d/1ojhEpk5EtKuyZGPhSOgpCOMOygHHxJ60/view?usp=drive_link)


## 🧱 System Architecture Diagram

```plaintext
+----------------+       +----------------+       +----------------+
|   Client App   | <---> |   API Server   | <---> |    MongoDB     |
|  (Next.js)     |       | (Express.js)   |       |                |
+----------------+       |                |       +----------------+
        |                |                ^
        |                |                |
        |                v                |
        |         +-------------+         |
        |         |    Redis    |---------+
        |         | (Cache &    |
        |         |  Pub/Sub)   |
        |         +-------------+
        |                ^
        |                |
        v                v
+----------------+  <--> +----------------+
| WebSockets via |       | Delivery App   |
|   Socket.io    |       | (Real-time)    |
+----------------+       +----------------+
```


## ⚙️ Stack Used

- **Frontend**: Next.js, React, TypeScript, React Query  
- **Backend**: Node.js, Express.js, TypeScript, clean architecture
- **Database**: MongoDB  
- **Cache & Messaging**: Redis (with Pub/Sub and caching)  
- **Real-time**: Socket.io  
- **Deployment**: Docker, Docker Compose, EC2 Instance (self-hosted)  

---

## 📁 Folder Structure

```plaintext
shop-co/
├── frontend/ # Next.js frontend application
├── backend/ # Express.js backend API (clean architecture)
├── admin/ # Admin dashboard 
└── docker-compose.yml # Docker Compose file
```
## 🚀 Setup Instructions

### 🔐 SSH Login (for EC2 Hosting)

```bash
ssh -i "shop-co3.pem" ubuntu@ec2-3-109-142-4.ap-south-1.compute.amazonaws.com
```

### 📥 Clone Repository

```bash
git clone https://github.com/Abshar777/shop-co.git
cd shop-co
```

### 🐳 Docker Compose Setup
```bash
docker-compose up --build
```

This command builds and starts the following services:

- **Frontend**: Next.js application
- **Backend**: Node.js + Express API
- **Redis**: For caching and WebSocket message brokering
- **MongoDB**: NoSQL database for storing user, product, and order data

---

### 🌍 Environment Variables

Ensure the following `.env` files are created for proper configuration.

#### Backend (`/backend/.env`)

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/shopco
JWT_SECRET=_jwt_secret
REDIS_HOST=redis
REDIS_PORT=6379
```
#### Frontend (/frontend/.env)

```env
NEXT_PUBLIC_BACKEND_URL=https://api.studioivory.art

NEXTAUTH_SECRET= _next_auth_SCRETE

NEXT_PUBLIC_FRONTEND_URL=https://studioivory.art
```


#### Admin (/admin/.env)

```env
NEXT_PUBLIC_BACKEND_URL=https://api.studioivory.art

NEXTAUTH_SECRET= _next_auth_SCRETE

NEXT_PUBLIC_FRONTEND_URL=https://studioivory.art
```

## 🌐 Hosting & Deployment Steps (on EC2)

1. SSH into your EC2 instance:
   - `ssh -i path-to-your-key.pem ubuntu@your-ec2-ip`

2. Install Docker & Docker Compose (if not already installed):
   - `sudo apt update`
   - `sudo apt install docker.io docker-compose -y`

3. Clone the repository:
   - `git clone https://github.com/Abshar777/shop-co.git`
   - `cd shop-co`

4. Add your `.env` files in `frontend/` and `backend/`.

5. Start the services:
   - `docker-compose up -d`

6. Set up **NGINX** reverse proxy and **SSL** using **Certbot** for secure HTTPS connections.

7. Ensure that the EC2 security group allows access to the following ports:
   - **Port `80`** (HTTP)
   - **Port `443`** (HTTPS)
   - **Port `8000`** (Backend API )
   - **Port `3000`** (Frontend)
   -  **Port `3001`** (Admin)

---

## 📡 WebSocket Flow Explanation

- When a user places or updates an order, the backend emits a WebSocket event using `Socket.IO`.
- The backend publishes the event message to **Redis** using **Pub/Sub**.
- Redis broadcasts the message to all subscribed backend instances.
- **Clients** (users, admins) and **delivery agents** receive the updates in real-time.

The WebSocket flow ensures that all relevant parties get the updates instantly:
- The **user** sees the real-time order status.
- The **admin** sees the real-time status of all orders.
- The **delivery agent** is notified of any new deliveries or updates in their queue.

---

## 📈 Scaling Plan

### 🔁 Redis for WebSocket Scaling

- The current setup uses **Redis Pub/Sub** to manage real-time communication.
- Redis Pub/Sub ensures that any message sent through WebSockets is broadcast across all backend instances.
- This allows the system to scale horizontally by adding more backend instances without losing real-time data synchronization.

### 🧱 Horizontal Scaling via Load Balancer

- Deploy multiple backend containers using **Docker Swarm** or **Kubernetes**.
- Use **NGINX** or **AWS ALB (Application Load Balancer)** to distribute traffic across multiple backend containers.
- For session management, consider storing session tokens and user data in **Redis** for shared access.


---

## 🔮 Future Improvements

- **Payment gateway integration**: Add payment options like Stripe or Razorpay for processing payments.
- **Order analytics dashboard**: Provide an admin panel to analyze order trends, delivery times, and more.
- **OTP authentication (OTP)**: Implement multi-factor authentication for enhanced security.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Abshar777/shop-co/blob/main/LICENSE.txt) file for details.
