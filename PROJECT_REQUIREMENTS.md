# Angular Enterprise Commerce Operations — Requirement Coverage

This repository implements the Project 6 commerce-operations portfolio specification with an Angular 20 frontend and JSON Server REST API.

## Core lifecycle

Catalog → Customer Order → Payment → Pick/Pack → Shipment → Delivery → Return → Refund

## Implemented MVP domains

- Authentication and protected commerce shell
- Commerce Command Center
- Catalog, variants, categories, collections and pricing
- Customer list and Customer 360
- Order list, manual order creation/editing, signature Order Detail workspace
- Payment status demo transitions
- Fulfillment queue and pick/pack transitions
- Shipment creation and shipment status transitions
- Returns, inspection/resolution and reverse logistics
- Refund queue and partial/full refund state handling
- Coupons and promotions
- Review moderation
- Analytics
- Notifications and command search
- Administration/RBAC presentation
- Store/theme/settings
- Local product image assets with deterministic fallback

## Data layer adaptation

The original requirement permits a mock REST / JSON DB for v1. This implementation uses JSON Server at `http://localhost:3000` and Angular `HttpClient` for all business data access.

## Engineering standards

- Standalone Angular components
- Signals for UI and derived state
- RxJS for HTTP workflows
- Reactive Forms
- Lazy-loaded feature routes
- Strict TypeScript
- External HTML/SCSS for medium/large screens
- Prettier + ESLint configuration
- Local committed product imagery
- Light, Dark and System themes
