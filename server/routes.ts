import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPostSchema, updatePostSchema } from "@shared/schema";
import { z } from "zod";
import slugify from "slugify";
import sanitizeHtml from "sanitize-html";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all published posts for public view
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await storage.getPublishedPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  // Get all posts for admin view
  app.get("/api/admin/posts", async (req, res) => {
    try {
      const posts = await storage.getAllPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  // Get single post by slug
  app.get("/api/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Only return published posts for public API
      if (!post.published && !req.query.admin) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  // Get post by ID for editing
  app.get("/api/admin/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const post = await storage.getPostById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  // Create new post
  app.post("/api/posts", async (req, res) => {
    try {
      const validatedData = insertPostSchema.parse(req.body);
      
      // Generate slug from title if not provided
      let slug = validatedData.slug;
      if (!slug && validatedData.title) {
        slug = slugify(validatedData.title, { lower: true, strict: true });
      }

      // Sanitize HTML content
      const sanitizedContent = sanitizeHtml(validatedData.content, {
        allowedTags: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'p', 'br', 'strong', 'em', 'u', 'strike',
          'ul', 'ol', 'li',
          'blockquote', 'pre', 'code',
          'a', 'img',
          'div', 'span'
        ],
        allowedAttributes: {
          a: ['href', 'target'],
          img: ['src', 'alt', 'width', 'height'],
          '*': ['class', 'style']
        }
      });

      // Generate excerpt from content if not provided
      let excerpt = validatedData.excerpt;
      if (!excerpt) {
        const textContent = sanitizedContent.replace(/<[^>]*>/g, '');
        excerpt = textContent.length > 150 
          ? textContent.substring(0, 150) + '...'
          : textContent;
      }

      const postData = {
        ...validatedData,
        slug,
        content: sanitizedContent,
        excerpt,
      };

      const post = await storage.createPost(postData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      
      if (error.code === '23505') { // Unique constraint violation
        return res.status(400).json({ message: "A post with this slug already exists" });
      }
      
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  // Update post
  app.put("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const validatedData = updatePostSchema.parse(req.body);
      
      // Generate slug from title if title is being updated
      if (validatedData.title && !validatedData.slug) {
        validatedData.slug = slugify(validatedData.title, { lower: true, strict: true });
      }

      // Sanitize HTML content if provided
      if (validatedData.content) {
        validatedData.content = sanitizeHtml(validatedData.content, {
          allowedTags: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'br', 'strong', 'em', 'u', 'strike',
            'ul', 'ol', 'li',
            'blockquote', 'pre', 'code',
            'a', 'img',
            'div', 'span'
          ],
          allowedAttributes: {
            a: ['href', 'target'],
            img: ['src', 'alt', 'width', 'height'],
            '*': ['class', 'style']
          }
        });

        // Update excerpt if content is being updated
        if (!validatedData.excerpt) {
          const textContent = validatedData.content.replace(/<[^>]*>/g, '');
          validatedData.excerpt = textContent.length > 150 
            ? textContent.substring(0, 150) + '...'
            : textContent;
        }
      }

      const post = await storage.updatePost(id, validatedData);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      
      if (error.code === '23505') { // Unique constraint violation
        return res.status(400).json({ message: "A post with this slug already exists" });
      }
      
      res.status(500).json({ message: "Failed to update post" });
    }
  });

  // Delete post
  app.delete("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const deleted = await storage.deletePost(id);
      if (!deleted) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
