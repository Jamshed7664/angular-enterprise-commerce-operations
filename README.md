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


### Screenshots

### login 

<img width="1917" height="992" alt="login" src="https://github.com/user-attachments/assets/18288ad3-d30c-4009-8ccc-c1e1edcfbd4b" />

### Command Center light Mode

---

<img width="1917" height="986" alt="Command Center light Mode" src="https://github.com/user-attachments/assets/aab5368b-2edb-429a-8792-7d362a0f82c8" />


### Command Center

---

<img width="1917" height="992" alt="Command Center" src="https://github.com/user-attachments/assets/7c4c1e37-6ae2-478b-ad6d-43e2e92f5878" />

### Catalog

---


<img width="1917" height="991" alt="Catalog" src="https://github.com/user-attachments/assets/b37e95dc-6111-4798-8fd2-5ee31cd6d0f5" />

### Customers

---


<img width="1917" height="1046" alt="Customers" src="https://github.com/user-attachments/assets/7ce7661a-cd4c-4718-a996-630719779d9b" />

### Orders

---


<img width="1917" height="987" alt="Orders" src="https://github.com/user-attachments/assets/f35351db-f9f8-4c74-b2db-48add4fb63ee" />

### Fullfilment

---


<img width="1917" height="987" alt="Fullfilment" src="https://github.com/user-attachments/assets/0c6d76e7-f2f1-427d-b205-17418f59d144" />

### Shipment

---


<img width="1917" height="987" alt="Shipment" src="https://github.com/user-attachments/assets/bbf0142a-c8b5-41c8-84df-ef7c27765b98" />

### Returns

---


<img width="1917" height="987" alt="Returns" src="https://github.com/user-attachments/assets/677f5f11-ffb7-4e16-862d-c682cc6f77ca" />

### Refund

---


<img width="1917" height="992" alt="Refund" src="https://github.com/user-attachments/assets/2e59a3c8-2ead-4250-b08e-56b701ee49dc" />

### Promotions

---


<img width="1917" height="987" alt="Promotions" src="https://github.com/user-attachments/assets/d5c6a4fb-99ff-4a13-a6da-82bfc24bd038" />

### Reviews

---


<img width="1917" height="990" alt="Reviews" src="https://github.com/user-attachments/assets/81e43c0d-5ffd-4006-8578-5fb313fb5bd5" />

### Analytics

---


<img width="1917" height="987" alt="Analytics" src="https://github.com/user-attachments/assets/0c5a15ef-a8a4-483d-8a4f-ec2ebb3582a7" />

### Notification

---


<img width="1917" height="980" alt="Notification" src="https://github.com/user-attachments/assets/202b9f75-ed09-407b-96ef-79b609da6299" />

### Administration

---


<img width="1917" height="990" alt="Administration" src="https://github.com/user-attachments/assets/ecc1c5a9-2e3e-450f-8696-6fc24a26ce92" />

### Setting

---


<img width="1917" height="987" alt="Setting" src="https://github.com/user-attachments/assets/99eed2e1-9302-460a-aada-7faf1b0a4c05" />

