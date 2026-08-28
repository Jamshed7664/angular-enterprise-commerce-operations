# Angular Enterprise Commerce Operations

> **E-Commerce Admin + Order Management + Fulfillment + Returns**  
> **Portfolio Project | Code With Jamshed**

A modern **Angular 20 commerce operations platform** for managing the complete e-commerce back-office lifecycle:

```text
Catalog → Order → Payment → Fulfillment → Shipment → Delivery → Return → Refund
```

Built with a visually distinct **indigo + lime + magenta** UI, Angular Signals, Reactive Forms, RxJS, JSON Server REST APIs, responsive layouts, dark mode, and reliable local product images.

## Key Features

- Commerce Command Center with GMV, Net Sales, AOV and order KPIs
- Product catalog with variants, categories, pricing and images
- Customer 360 with order, return and refund history
- Order management with operational Order Detail workspace
- Payment, fulfillment, shipment and delivery workflows
- Returns inspection and refund processing
- Promotions, coupons and review moderation
- Analytics and operations queue
- Notifications, administration and settings
- Light / Dark / System themes
- Responsive desktop, tablet and mobile UI

## Tech Stack

| Technology | Usage |
| --- | --- |
| Angular 20 | Frontend |
| TypeScript | Strong typing |
| Standalone Components | Architecture |
| Angular Signals | State |
| RxJS | API workflows |
| Reactive Forms | Forms and validation |
| Angular Router | Lazy-loaded routes |
| Angular CDK | UI utilities |
| JSON Server | REST API / demo backend |
| SCSS + CSS Variables | Design system |
| Font Awesome | Icons |

## UI Theme

```text
Primary      #312E81  Deep Indigo
Success      #84CC16  Electric Lime
Accent       #DB2777  Magenta
Background   #F0F9FF  Ice Blue
Dark         #111827  Charcoal
```

Typography:

```text
Century Gothic, Avenir Next, Segoe UI Variable, Segoe UI, system-ui
```

## Product Images

Product images are stored locally:

```text
public/assets/images/products/
```

The reusable product image component supports lazy loading, alt text, stable aspect ratios and automatic fallback images.

## JSON Server API

API base URL:

```text
http://localhost:3000
```

Main resources:

```text
products
categories
customers
orders
fulfillments
shipments
returns
refunds
promotions
reviews
notifications
activities
storeSettings
```

Example:

```http
GET    /products
POST   /products
PATCH  /products/:id

GET    /orders
POST   /orders
PATCH  /orders/:id
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run Angular + JSON Server:

```bash
npm start
```

Frontend:

```text
http://localhost:4200
```

API:

```text
http://localhost:3000
```

PowerShell alternative:

```powershell
npm.cmd install
npm.cmd start
```

## Demo Login

```text
Email: admin@commerce.dev
Password: password
```

## Project Structure

```text
src/app/
├── core/
├── shared/
│   └── commerce-ui/
├── layout/
│   └── commerce-shell/
└── features/
    ├── auth/
    ├── command-center/
    ├── catalog/
    ├── customers/
    ├── orders/
    ├── fulfillment/
    ├── shipments/
    ├── returns/
    ├── refunds/
    ├── promotions/
    ├── reviews/
    ├── analytics/
    ├── notifications/
    ├── administration/
    └── settings/
```

## Screenshots

Store screenshots in:

```text
docs/screenshots/
```

Recommended names:

```text
command-center.png
catalog.png
product-details.png
customer-360.png
orders.png
order-details.png
fulfillment.png
shipments.png
returns.png
refunds.png
analytics.png
dark-theme.png
mobile-view.png
```

## Build & Quality

```bash
npm run build
npm run format
npm run format:check
npm run lint
npm test
```

## Roadmap

### v1.0.0

- [x] Catalog
- [x] Customer 360
- [x] Orders
- [x] Fulfillment
- [x] Shipments
- [x] Returns
- [x] Refunds
- [x] Promotions
- [x] Reviews
- [x] Analytics
- [x] Notifications
- [x] Administration
- [x] Themes
- [x] JSON Server API

### Future

- [ ] Spring Boot backend
- [ ] MySQL
- [ ] JWT authentication
- [ ] Real payment gateway
- [ ] Shipping carrier integration
- [ ] Real image upload
- [ ] WebSockets

## Author

**Jamshed Ahmad**  
Software Engineer | Frontend Developer  
**Brand:** Code With Jamshed

---

<p align="center">
  <b>Built with Angular 20 ❤️ by Code With Jamshed</b>
</p>
