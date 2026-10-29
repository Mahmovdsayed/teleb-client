# Teleb Furniture

A modern, bilingual furniture storefront built with Next.js, React, and TypeScript, backed by a custom API and administration dashboard.

**Live website:** [teleb-furniture.com](https://www.teleb-furniture.com/en)

## Overview

Teleb Furniture is a full-stack web project focused on creating a premium digital experience for a furniture brand. The platform combines a responsive storefront with a custom content management system, allowing the business to manage products, collections, promotional banners, offers, and customer inquiries.

The project covers both the customer-facing experience and the backend infrastructure that powers it.

## Features

- Responsive furniture storefront
- Arabic and English localization with RTL support
- Product and collection browsing
- Product image galleries
- Dynamic banners and promotional offers
- Custom administration dashboard
- Product, collection, and offer management
- Customer messages inbox
- Dashboard analytics
- Redis caching and cache invalidation
- Cloudinary image processing and delivery
- AI-assisted customer message classification workflow

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Internationalization | next-intl |
| Backend | Bun, Hono |
| Database | PostgreSQL, Neon |
| ORM | Drizzle ORM |
| Caching | Redis |
| Media | Cloudinary |
| AI | Vercel AI Gateway, typesafe-ai/jev |
| Deployment | Vercel |

## Architecture

The application separates the customer-facing storefront from the backend API and administrative interface.

- **Storefront:** Renders the public website and handles product discovery.
- **API:** Handles application logic, validation, data access, and business operations.
- **Database:** Stores structured application data in PostgreSQL.
- **Admin dashboard:** Provides tools for managing catalog content, promotions, and customer messages.
- **Supporting services:** Redis handles caching, while Cloudinary manages media processing and delivery.

## Engineering Highlights

- Built a bilingual interface supporting both LTR and RTL layouts.
- Organized backend functionality into domain-specific modules.
- Implemented caching with explicit invalidation for relevant data changes.
- Integrated image optimization into the media workflow.
- Designed customer-message classification and priority-based notification workflows.

## Case Study

Read the full project case study in [`CASE_STUDY.md`](./CASE_STUDY.md) for the challenges, architectural decisions, implementation details, and future improvements.

## Links

- **Live website:** https://www.teleb-furniture.com/en