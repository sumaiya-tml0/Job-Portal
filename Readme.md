# Job Portal

The Job Portal is a full-stack web application that connects job seekers with employers. It allows companies to post job listings, manage applications, and find candidates, while job seekers can search for jobs, apply, and track their applications.


## Key Features

For Job Seekers:
- User registration and authentication
- Profile creation with resume upload
- Job search with filters (location, salary, type, category)
- Job application submission
- Application tracking dashboard
- Save/bookmark jobs
- Email notifications for application status

For Employers:
- Company registration and profile
- Post, edit, and delete job listings
- View and manage applications
- Candidate filtering and shortlisting
- Application status updates
- Analytics dashboard

For Admins:
- User management
- Company verification
- Job posting moderation
- Platform analytics
- Content management


## Tech Stack

**Frontend:** React, TanStack Router, TailwindCSS, Axios, TanStack Query, React Hook Form, Yup

**Backend:** Node, Express, Prisma, JWT, Bcrypt, Multer, Nodemailer

**Database:** PostgreSQL, NeonDB


## User Roles & Permissions

Role Definitions
1. JOB_SEEKER
Permissions:
- Create and manage personal profile
- Search and view job listings
- Apply to jobs
- Save/bookmark jobs
- Track application status
- Upload resume
- Update profile information

2. EMPLOYER
Permissions:
- Create and manage company profile
- Post job listings
- Edit and delete own job posts
- View applications for own jobs
- Update application status
- Search candidates
- View analytics for own jobs

3. ADMIN
Permissions:

- All Job Seeker permissions
- All Employer permissions
- Manage all users
- Verify companies
- Moderate job postings
- Delete inappropriate content
- View platform analytics
- Manage categories