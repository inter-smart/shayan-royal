# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shayan Royal is a luxury car dealership website built with Next.js 15, featuring an inventory system, blog, services showcase, and car fabrication portfolio. The site connects to an external CRM API for dynamic content and uses server-side rendering with comprehensive SEO optimization.

## Development Commands

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives with custom components
- **Animation**: Framer Motion, GSAP, CountUp.js
- **Forms**: React Hook Form with Zod validation
- **Content**: External CRM API integration
- **PDF Handling**: PDF.js for vehicle documentation

### Project Structure

```
src/
├── app/                 # App Router pages
│   ├── (routes)/       # Route groups (about, blog, contact, etc.)
│   ├── layout.js       # Root layout with Header/Footer
│   └── page.js         # Homepage with comprehensive sections
├── components/
│   ├── common/         # Reusable components (Cards, Forms, etc.)
│   ├── features/       # Page-specific feature components
│   │   ├── home/       # Homepage sections (Banner, About, etc.)
│   │   ├── inventory/  # Car inventory and details
│   │   ├── blog/       # Blog listing and detail pages
│   │   ├── fabrication/# Custom car fabrication showcase
│   │   └── service/    # Service pages and fitment types
│   ├── layout/         # Layout components (Header, Footer)
│   ├── forms/          # Form components
│   └── ui/            # Shadcn/ui components
├── lib/
│   ├── api.js         # API utilities with error handling
│   ├── constants.js   # SEO metadata and constants
│   └── utils.js       # Utility functions
└── data/              # Static data (countries, etc.)
```

### API Integration

The site connects to an external CRM system:
- **Base URL**: `NEXT_PUBLIC_API_BASE_URL` environment variable
- **Endpoints**: `/api/web/{endpoint}` pattern
- **Error Handling**: Graceful fallbacks to default content
- **Caching**: Force-cache with 60-second revalidation
- **Response Format**: `{ success: boolean, data: object }`

### Key Features

1. **Dynamic Content Management**: All content fetched from external CRM API
2. **SEO Optimization**: Dynamic meta tags, Open Graph, Twitter cards per page
3. **Car Inventory**: Detailed car listings with specifications, colors, PDFs
4. **Blog System**: Dynamic blog with slug-based routing
5. **Service Showcase**: Multiple service types including fabrication
6. **Contact Forms**: Multiple inquiry forms with validation
7. **Media Management**: Optimized images with WebP/AVIF formats

### Component Patterns

- **Feature-based Organization**: Components grouped by page/feature
- **Common Components**: Reusable across multiple pages
- **Server Components**: Default for data fetching
- **Client Components**: Only when interactivity needed
- **Form Handling**: React Hook Form + Zod for validation
- **Error Boundaries**: Graceful error handling throughout

### Styling Conventions

- **Tailwind CSS 4**: Latest version with enhanced features
- **Custom Fonts**: StretchPro (local) + Barlow (Google Fonts)
- **Responsive Design**: Mobile-first approach
- **Animation Libraries**: Framer Motion for interactions, GSAP for complex animations
- **Component Variants**: Class Variance Authority for component styling

### Environment Variables

Required for proper functionality:
- `NEXT_PUBLIC_API_BASE_URL`: CRM API base URL
- `NEXT_PUBLIC_SITE_URL`: Site canonical URL for SEO

### Image Handling

- **Formats**: WebP and AVIF for optimization
- **Remote Patterns**: Configured for CRM and YouTube
- **SVG Support**: Enabled with CSP for security
- **Cache**: 1-year TTL for static assets

### PDF Integration

- **PDF.js**: For viewing vehicle documentation
- **Webpack Config**: Custom loader for PDF worker files
- **Display**: In-browser PDF viewing for specifications

### Testing

No specific test framework detected. Check with project maintainers for testing approach before adding tests.

## Development Notes

- Uses App Router exclusively (no Pages Router)
- Server-side rendering with dynamic metadata generation
- Comprehensive error handling with fallbacks
- Form validation using Zod schemas
- Responsive design with mobile-first approach
- Performance optimized with Next.js features (Image, Font optimization)