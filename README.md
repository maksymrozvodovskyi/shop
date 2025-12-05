# Fullstack App (Next.js + Strapi)

An pplication built using **Next.js 16 (App Router)** and **Strapi CMS**.  
This project includes:

- User registration and login using Strapi Auth  
- Authentication via HttpOnly JWT cookies  
- Middleware-protected private routes  
- Product listing with category filtering and pagination  
- Shopping cart powered by Zustand  
- Checkout with a dynamic shipping form  
- Order creation + order-items relations in Strapi  
- Order history page for authenticated users  

---

## Tech Stack

### **Frontend**
- Next.js 16 (App Router, Route Handlers, Server Actions)
- React 19
- Tailwind CSS
- Zustand (global state)
- React Query (TanStack Query)
- JWT cookies via `next/headers`

### **Backend (CMS)**
- Strapi v4 (REST API)
- Users & Permissions plugin
- Models: Products, Categories, Orders, Order Items, Users
- Role-based access control

# 📦 1. Project Setup

## 1.1 Clone the repository
```bash
git clone <repository-url>
cd <project-folder>

# 2. Running the Strapi Backend

# 2.1 Navigate to the backend folder
cd backend

# 2.2 Install Strapi dependencies
npm install

# 2.3 Start Strapi in development mode
npm run develop

Strapi admin panel will be available at:
http://localhost:1337/admin

Inside Strapi, configure:
- Products  
- Categories  
- Orders  
- Order Items  
- Users  

Make sure to enable the correct permissions:
- Public: allow reading products & categories  
- Authenticated: allow creating orders & order-items  

---

# 3. Running the Next.js Frontend

# 3.1 Go back to the frontend root
cd ../

# 3.2 Start development server
npm run dev

Application will be available at:
http://localhost:3000

---

# 4. Authentication Flow

User logs in using:
POST /api/auth/local

{
  "identifier": "email",
  "password": "password"
}

The backend returns a JWT.  
Next.js stores the JWT in an HttpOnly cookie using Route Handlers:

cookies().set("jwt", token, {
  httpOnly: true,
  path: "/",
  maxAge: 7 * 24 * 60 * 60
});

---

# 5. Middleware Protection

Private routes:
- /checkout
- /orders
- /products

If user has no JWT cookie → redirect to /sign-in  
If user is already authenticated → prevent access to /sign-in and /sign-up

Middleware config:

matcher:
  "/checkout/:path*",
  "/orders/:path*",
  "/products/:path*",
  "/sign-in",
  "/sign-up"

---

# 6. Shopping Cart (Zustand)

Features:
- Add item  
- Remove item  
- Change quantity  
- Calculate total  
- Clear cart  

Cart is fully client-side.

---

# 7. Checkout Flow

# 7.1 User fills shipping form
Fields:
- fullName
- country
- city
- postalCode
- addressLine
- phone

# 7.2 Payload example

{
  "total": 1299,
  "shippingAddress": {
    "fullName": "John Doe",
    "country": "USA",
    "city": "NY",
    "postalCode": "10001",
    "addressLine": "5th Avenue 10",
    "phone": "+123456789"
  },
  "items": [
    {
      "quantity": 1,
      "price": 1299,
      "product": "documentId"
    }
  ]
}

# 7.3 Server creates order + items
Handled by /api/checkout Route Handler.

---

# 8. Orders Page

Authenticated user can view their orders:

GET /api/orders?populate=*

Returned data includes:
- Total
- Status
- Created date
- Shipping address
- Order items
