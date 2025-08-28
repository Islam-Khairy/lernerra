# Lernerra - E-Learning Platform

A comprehensive full-stack e-learning platform developed as a team graduation project for the ITI Post-Graduate Program (Angular & .NET Track).

## 🚀 Live Demo

[View Live Application](https://lernerra-platform.vercel.app/)

## 📋 Project Overview

Lernerra is a role-based online learning platform that connects students with instructors through a secure, feature-rich environment. The platform supports course creation, video streaming, payment processing, and comprehensive user management.

### Key Features by Role

**🎓 Students**

- explore and enroll in courses with secure Stripe payment
- Stream video lessons for enrolled courses
- Track learning progress
- Rate enroll courses
- Manage personal dashboard

**👨‍🏫 Instructors**

- Create (pending admin approval) and manage courses
- Full CRUD operations on courses and lessons
- Upload video content and course materials
- Maintain professional profile

**🛡️ Administrators**

- Review and approve/reject instructor applications
- Moderate course submissions with feedback
- Manage platform user accounts
- Ensure content quality standards

**🌐 Public Access**

- explore course catalog
- View course details and ratings
- Check instructor profiles
- Submit instructor applications

## 🛠️ Tech Stack

### Frontend

- **Framework:** Angular v20 (latest)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

### Backend

- **Framework:** .NET Core 9.0 (latest)
- **Database:** SQL Server
- **ORM:** Entity Framework Core
- **Query:** LINQ
- **API:** RESTful APIs

### Security & Integration

- **Authentication:** JWT (JSON Web Tokens)
- **Authorization:** Role-based access control (RBAC)
- **Payment:** Stripe API integration
- **File Storage:** Cloudinary (for images/videos)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- .NET SDK 6+
- SQL Server
- Angular CLI

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Islam-Khairy/lernerra.git
   cd lernerra

   cd BackEnd/ELearning.API
   dotnet restore
   ```

# Update connection string in appsettings.json

dotnet ef database update
dotnet run

cd FrontEnd
npm install
ng serve


📄 License
This project is part of an educational program and is available for portfolio demonstration purposes.

👥 Contributors
Islam Khairy - GitHub
sherifali20
AhmedAbdelmoaty-dev
MohamedMustafaSaber
mariemkaram