# 📚 Learning Management System (LMS)

## 🚀 Project Overview

A full-featured **Learning Management System (LMS)** designed to provide a seamless online learning experience with course management, student enrollment, progress tracking, and interactive features.

## 🎯 Key Features

### Core Functionality
- 📝 Course Creation & Management
- 👨‍🎓 Student Enrollment & Progress Tracking
- 📂 File & Resource Sharing
- 🏆 Quiz & Assessment System

### User Experience
- 📊 Role-Based Dashboard (Admin/Instructor/Student)
- 🔔 Real-time Notifications & Announcements
- 🎯 Course Purchasing System
- 📊 Analytics & Reporting

## 🛠️ Technology Stack

### Frontend
- Next.js (React Framework)
- State Management: Redux
- Styling: Tailwind CSS + Shadcn
- Animations: Framer-motion

### Backend
- Node.js with Express.js
- Real-time: Socket.IO
- Scheduling: Node-cron
- Caching: Redis

### Database & Authentication
- Primary Database: MongoDB (Mongoose ODM)
- Authentication: JWT, NextAuth
- Payment Processing: Stripe

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB Atlas or local instance
- Redis server (for caching)
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ahmdpolash/LMS.git
   cd LMS
   ```
2. Navigate to the project folder (frontend) :

   ```bash
   - cd frontend

   - npm i  /  yarn i
   ```

3. Navigate to the project folder (backend) :

   ```bash
   - cd backend

   - npm i  /  yarn i
   ```

4. Create a .env file in the root directory of both folder and add your env credientials :

```bash
# Common Variables
DATABASE_URI=your_mongodb_connection_string
NODE_ENV=development/production

# Backend Specific
SERVER_PORT=5000
ORIGIN=http://localhost:3000
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_SECRET_KEY=your_cloudinary_secret
VDOCIPHER_API_SECRET=your_vdocipher_key
STRIPE_SECRET_KEY=your_stripe_secret

# Frontend Specific
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

```

## Contributing

### Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature-branch).
5. Open a pull request.

### Feel free to reachout for any queries :

```
Email :  ahmedpolash732@gmail.com

WhatsApp : +8801756213028
```


