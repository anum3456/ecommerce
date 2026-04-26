# 🛒 E-Commerce Full Stack Application (CI/CD Enabled)

A full-stack eCommerce web application built with modern technologies, integrated with a complete CI/CD pipeline using Jenkins and Docker.

---

## 🚀 Tech Stack

### 🔹 Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router

### 🔹 Backend

* Node.js
* Express.js
* MongoDB

### 🔹 DevOps / CI-CD

* Jenkins
* Docker & Docker Compose
* GitHub

---

## 📁 Project Structure

```
ecommerce/
│
├── backend/          # Express API
├── frontend/         # React App (Vite)
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

---

## ⚙️ Features

* Product listing
* Add to cart
* Order management
* REST API integration
* CI/CD pipeline automation
* Dockerized services

---

## 🧑‍💻 Local Development Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/anum3456/ecommerce.git
cd ecommerce
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🐳 Docker Setup

Run full application using Docker:

```bash
docker compose up --build
```

---

## ⚡ CI/CD Pipeline (Jenkins)

This project uses Jenkins for automation.

### Pipeline Stages:

1. Checkout Code from GitHub
2. Install Backend Dependencies
3. Install & Build Frontend
4. Run Tests (optional)
5. Docker Build (Frontend + Backend)
6. Deploy using Docker Compose

---

## 🔧 Jenkinsfile Overview

```groovy
stage('Install & Build Frontend') {
    steps {
        dir('frontend') {
            sh 'npm ci'
            sh 'npm run build'
        }
    }
}
```

---

## ❗ Important Notes

* Use `npm ci` in CI/CD instead of `npm install`
* Do NOT delete `package-lock.json` in Jenkins
* Ensure all dependencies (like Vite plugins) are installed
* Keep Tailwind version consistent

---

## 📌 Future Improvements

* Add unit & integration tests
* Implement payment gateway
* Add admin dashboard
* Kubernetes deployment

---

## 👩‍💻 Author

**Anum Tahzeem**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
