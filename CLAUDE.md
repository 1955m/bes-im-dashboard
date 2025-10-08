# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BES IM Dashboard - An Activity Management System built with Next.js 15, React 19, and deployed on Cloudflare Workers via OpenNext.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run deploy` - Build and deploy to Cloudflare Workers
- `npm run preview` - Build and preview on Cloudflare Workers locally
- `npm run cf-typegen` - Generate TypeScript types for Cloudflare environment bindings

## Architecture

### Deployment Platform

This application is built for **Cloudflare Workers** using the `@opennextjs/cloudflare` adapter, not traditional Node.js hosting. Key implications:

- Configuration happens in `wrangler.jsonc` and `open-next.config.ts`
- Cloudflare-specific bindings available via `getCloudflareContext()` in Next.js code
- Cloudflare environment types defined in `cloudflare-env.d.ts`
- Build output goes to `.open-next/` directory with worker and static assets
- Dev mode initializes Cloudflare context via `initOpenNextCloudflareForDev()` in `next.config.ts`

### Project Structure

**Next.js App Router** (app directory):
- `app/layout.tsx` - Root layout with Geist font configuration, sets app title/description
- `app/activity-management/` - Main feature module for activity management
  - `page.tsx` - Main page component with state management (filters, pagination, drawer)
  - `types/index.ts` - TypeScript interfaces for forms, filters, table data
  - `constants/index.ts` - Shared constants (options, labels, default values)
  - `components/` - Feature components (Sidebar, FilterSection, ActivityTable, ActivityDrawer, TemplatePreview)
  - `components/ui/` - Reusable UI components (CustomSelect, CustomCheckbox, CustomRadio, ConfirmModal)

### State Management

The activity management page uses React useState for local state:
- Form data (FormData type) - managed in page.tsx, passed to ActivityDrawer
- Filters (Filters type) - search term, language, template, status, merchant, isScheduled
- UI state - drawer open/close, pagination (currentPage, pageSize), advanced filters toggle
- Currently uses **mock data** in page.tsx - no API integration yet

### TypeScript Configuration

- Path alias: `@/*` maps to project root
- Strict mode enabled
- Cloudflare types included via `cloudflare-env.d.ts`
- Target ES2017 for Cloudflare Workers compatibility

### Styling

Tailwind CSS 4 with PostCSS configured. Light mode enforced via `colorScheme: 'light'` in main layout.

## Key Implementation Details

### Activity Management Domain

The app manages "activities" (promotional content, exchange rates) with:
- Multi-language support (7 languages: zh-cn, zh-hant-cn, us, vi, th, id, pt-br)
- Template types: Activity Center (活动中心), Exchange Rate (交易汇率)
- Status workflow: pending → published/failed/inactive
- Scheduled publishing with repeat rules (once, daily, weekly, custom)
- Merchant association (Pay, 足篮聊球, 444体育)
- View counting and sort ordering

### Data Flow Pattern

1. Page component (page.tsx) maintains all state
2. Filter/form components receive state and setters as props
3. Table component receives data and pagination handlers
4. Drawer component manages form editing with controlled inputs
5. All data currently mocked - API integration pending

### Important Files to Reference

- Form data structure: `app/activity-management/types/index.ts`
- Dropdown options: `app/activity-management/constants/index.ts`
- Main state logic: `app/activity-management/page.tsx:11-26`
- Status badge styling: `app/activity-management/constants/index.ts:77-82`

### Always use shadcn component when creating new UI: https://context7.com/shadcn-ui/ui/llms.txt
### Dev Server is now on http://localhost:4100
### Always use Devtools MCP to inspect UI issue