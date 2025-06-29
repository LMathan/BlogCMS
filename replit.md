# Blog CMS - Modern Content Management System

## Overview

This is a full-stack blog content management system built with React, Express, and PostgreSQL. The application provides both public blog viewing and admin management capabilities with a rich text editor for content creation.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **Rich Text Editor**: TipTap for WYSIWYG content editing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **API Design**: RESTful API with separate public and admin endpoints
- **Validation**: Zod schemas for request/response validation

### Key Components

#### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Posts Table**: Blog posts with full content management (id, title, slug, content, excerpt, published status, timestamps)

#### API Endpoints
- **Public Routes**:
  - `GET /api/posts` - Fetch published posts
  - `GET /api/posts/:slug` - Fetch single post by slug
- **Admin Routes**:
  - `GET /api/admin/posts` - Fetch all posts (including drafts)
  - `POST /api/posts` - Create new post
  - `PUT /api/posts/:id` - Update existing post
  - `DELETE /api/posts/:id` - Delete post

#### Frontend Pages
- **Home**: Public blog listing with post previews
- **Post View**: Individual post reading page
- **Admin Dashboard**: Post management interface
- **Create/Edit Post**: Rich text editor for content creation

## Data Flow

1. **Content Creation**: Admin creates posts using TipTap rich text editor
2. **Data Validation**: Zod schemas validate post data on both client and server
3. **Database Storage**: Drizzle ORM handles type-safe database operations
4. **Content Retrieval**: TanStack Query manages server state and caching
5. **Public Display**: Posts are rendered with sanitized HTML content

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@tiptap/react**: Rich text editor
- **@radix-ui/**: UI primitive components
- **wouter**: Lightweight React router
- **zod**: Runtime type validation
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **TypeScript**: Static type checking
- **Vite**: Fast build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations handle schema changes

### Environment Configuration
- **Development**: `npm run dev` - starts both frontend and backend in development mode
- **Production**: `npm run build && npm start` - builds and runs production server
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### File Structure
- `client/`: React frontend application
- `server/`: Express backend application
- `shared/`: Shared TypeScript schemas and types
- `migrations/`: Database migration files

## Changelog
- June 29, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.