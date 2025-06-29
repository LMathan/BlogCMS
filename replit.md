# Blog CMS - Modern Content Management System

## Overview

This is a full-stack blog content management system built with React, Express, and MongoDB. The application provides both public blog viewing and admin management capabilities with a rich text editor for content creation and image upload functionality.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **Rich Text Editor**: TipTap for WYSIWYG content editing with image upload
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB Atlas with Mongoose ODM for document management
- **File Uploads**: Multer for handling image uploads with local storage
- **API Design**: RESTful API with separate public and admin endpoints
- **Validation**: Zod schemas for request/response validation
- **Content Security**: HTML sanitization to prevent XSS attacks

### Key Components

#### Database Schema (MongoDB)
- **Users Collection**: Basic user authentication (_id, username, password, timestamps)
- **Posts Collection**: Blog posts with full content management (_id, title, slug, content, excerpt, published status, timestamps)

#### API Endpoints
- **Public Routes**:
  - `GET /api/posts` - Fetch published posts
  - `GET /api/posts/:slug` - Fetch single post by slug
- **Admin Routes**:
  - `GET /api/admin/posts` - Fetch all posts (including drafts)
  - `GET /api/admin/posts/:id` - Fetch single post by MongoDB _id
  - `POST /api/posts` - Create new post
  - `PUT /api/posts/:id` - Update existing post
  - `DELETE /api/posts/:id` - Delete post
- **Upload Routes**:
  - `POST /api/upload` - Upload image files (5MB limit, images only)
  - `GET /uploads/:filename` - Serve uploaded images

#### Frontend Pages
- **Home**: Public blog listing with post previews
- **Post View**: Individual post reading page with SEO meta tags
- **Admin Dashboard**: Post management interface with statistics
- **Create/Edit Post**: Rich text editor with image upload for content creation

## Data Flow

1. **Content Creation**: Admin creates posts using TipTap rich text editor with image upload
2. **Image Handling**: Images uploaded via drag-and-drop or file picker, stored locally
3. **Data Validation**: Zod schemas validate post data on both client and server
4. **Database Storage**: Mongoose handles MongoDB document operations
5. **Content Retrieval**: TanStack Query manages server state and caching
6. **Public Display**: Posts are rendered with sanitized HTML content

## External Dependencies

### Core Dependencies
- **mongoose**: MongoDB object document mapper
- **mongodb**: MongoDB driver for Node.js
- **@tanstack/react-query**: Server state management
- **@tiptap/react**: Rich text editor with extensions
- **@radix-ui/**: UI primitive components
- **wouter**: Lightweight React router
- **zod**: Runtime type validation
- **tailwindcss**: Utility-first CSS framework
- **multer**: File upload handling middleware
- **sanitize-html**: HTML content sanitization

### Development Tools
- **TypeScript**: Static type checking
- **Vite**: Fast build tool and dev server
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: Direct TypeScript execution with tsx
- **Database**: MongoDB Atlas cloud database connection
- **File Storage**: Local uploads directory for images

### Environment Configuration
- **Development**: `npm run dev` - starts both frontend and backend in development mode
- **Database**: MongoDB Atlas connection string configured directly in code
- **Uploads**: Local file system storage in `/uploads` directory

### File Structure
- `client/`: React frontend application
- `server/`: Express backend application
- `shared/`: Shared TypeScript schemas and types
- `uploads/`: Local image storage directory

## Recent Changes
- **June 29, 2025**: Migrated from PostgreSQL to MongoDB Atlas
- **June 29, 2025**: Added image upload functionality with multer
- **June 29, 2025**: Enhanced rich text editor with image upload capability
- **June 29, 2025**: Updated frontend to work with MongoDB string-based IDs

## User Preferences

Preferred communication style: Simple, everyday language.