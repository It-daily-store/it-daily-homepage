<div align="center">
  <img src="public/logo/logo-dark.png" alt="Gadget Grid Logo" width="200" height="auto">
  <h1>Gadget Grid It Shop</h1>
  <p>A modern, full-featured e-commerce platform specializing in IT products, gadgets, and electronics. Built with Next.js 15, TypeScript, and Tailwind CSS, offering a seamless shopping experience with advanced features like PC building, product comparison, and comprehensive order management.</p>
</div>


## 🚀 Project Overview

Gadget Grid is a comprehensive e-commerce solution designed for selling IT products and electronics. The platform provides users with an intuitive interface to browse, compare, and purchase technology products, with special features like a PC builder tool and advanced product filtering.


## ✨ Key Features

### 🏠 Homepage

- **Hero Banner** - Dynamic slider with promotional content
- **Featured Categories** - Highlighted product categories
- **Featured Products** - Showcase of popular items
- **SEO Optimized** - Structured data and meta tags

### 🛍️ E-commerce Core

- **Product Catalog** - Comprehensive product browsing
- **Advanced Filtering** - Category, price, brand, and attribute filters
- **Product Search** - Real-time search functionality
- **Product Details** - Detailed product information with galleries
- **Shopping Cart** - Persistent cart with local storage
- **Wishlist** - Save products for later

### 🖥️ PC Builder Tool

- **Custom PC Building** - Interactive PC configuration
- **Component Selection** - Choose from various PC parts
- **Compatibility Checking** - Ensure component compatibility
- **Price Calculation** - Real-time total price updates
- **PDF Export** - Generate build specifications
- **Save Builds** - Store custom configurations

### 🔍 Product Comparison

- **Side-by-side Comparison** - Compare multiple products
- **Feature Comparison** - Detailed specifications comparison
- **Quick Add to Cart** - Add compared items to cart

### 👤 User Management

- **User Registration** - Account creation with email verification
- **Authentication** - Secure login/logout system
- **Profile Management** - User account settings
- **Address Management** - Multiple shipping addresses
- **Order History** - Complete order tracking

### 🛒 Checkout & Orders

- **Secure Checkout** - Multi-step checkout process
- **Payment Integration** - Multiple payment methods
- **Order Tracking** - Real-time order status updates
- **Invoice Generation** - PDF invoice creation

### 📱 Responsive Design

- **Mobile-First** - Optimized for all device sizes
- **Dark/Light Theme** - User preference themes
- **Touch-Friendly** - Mobile-optimized interactions

## 🛠️ Technologies Used

### Core Framework

- **Next.js 15.4.5** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety and development experience

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Pre-built component library
- **Lucide React** - Icon library
- **next-themes** - Theme management (light/dark mode)

### State Management

- **Redux Toolkit** - Predictable state container
- **React Redux** - React bindings for Redux
- **Redux Persist** - State persistence

### Form Handling & Validation

- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation resolvers

### HTTP Client & Data Fetching

- **Axios** - HTTP client for API requests
- **Next.js built-in fetch** - Server-side data fetching

### Additional Libraries

- **dayjs** - Date manipulation
- **js-cookie** - Cookie management
- **jwt-decode** - JWT token decoding
- **file-saver** - File download functionality
- **@react-pdf/renderer** - PDF generation
- **sonner** - Toast notifications
- **nextjs-toploader** - Page loading indicator

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

## 📁 Project Structure

```
itdaily-homepage/
├── public/                          # Static assets
│   ├── logo/                       # Brand logos (light/dark)
│   ├── payment-logos/              # Payment method logos
│   └── *.svg, *.png               # Images and icons
├── src/
│   ├── actions/                    # Server actions
│   │   ├── address.ts             # Address management
│   │   ├── auth.ts                # Authentication
│   │   ├── checkout.ts            # Checkout process
│   │   ├── compare.ts             # Product comparison
│   │   ├── order.ts               # Order management
│   │   └── product.ts             # Product operations
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/               # Authentication routes
│   │   │   └── signup/           # User registration
│   │   ├── (authenticated)/      # Protected routes
│   │   │   ├── (dashboard)/      # User dashboard
│   │   │   │   ├── addresses/    # Address management
│   │   │   │   ├── notifications/ # User notifications
│   │   │   │   └── orders/       # Order history
│   │   │   └── checkout/         # Checkout process
│   │   ├── api/                  # API routes
│   │   │   └── pc-builder/       # PC builder API
│   │   ├── compare/              # Product comparison
│   │   ├── pc-builder/           # PC building tool
│   │   ├── product/              # Product pages
│   │   ├── [slug]/               # Dynamic category pages
│   │   └── *.tsx                 # Static pages (terms, privacy, etc.)
│   ├── components/               # React components
│   │   ├── category/             # Category-specific components
│   │   ├── common/               # Shared components
│   │   ├── dashboard/            # Dashboard components
│   │   ├── global/               # Global UI components
│   │   ├── homepage/             # Homepage components
│   │   ├── pcBuilder/            # PC builder components
│   │   ├── product/              # Product-related components
│   │   ├── shared/               # Reusable components
│   │   └── ui/                   # Base UI components (shadcn/ui)
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utility libraries
│   ├── providers/                # Context providers
│   ├── redux/                    # Redux store and reducers
│   ├── types/                    # TypeScript type definitions
│   └── utils/                    # Utility functions
├── components.json               # shadcn/ui configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd itdaily-homepage
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_BASE_URL=your_api_base_url
   NEXT_PUBLIC_SITE_URL=your_site_url
   NEXT_PUBLIC_GTM_ID=your_google_tag_manager_id
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:4000](http://localhost:4000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run dev:prod` - Start development server with production environment
- `npm run build` - Build for production
- `npm run build:prod` - Build with production environment
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run prettier` - Format code with Prettier

## 🎨 Design System

### Color Palette

- **Primary**: #f85a16 (Orange)
- **Secondary**: #4ac5b7 (Teal)
- **Background**: Light/Dark theme support
- **Text**: High contrast for accessibility

### Typography

- **Font Family**: Be Vietnam Pro
- **Weights**: 400, 500, 600, 700, 800, 900

### Components

Built with shadcn/ui components for consistency and accessibility:

- Buttons, Cards, Forms, Modals, Navigation
- Responsive grid system
- Custom scrollbars and animations

## 🔧 Configuration

### Next.js Configuration

- Image optimization enabled
- Remote image patterns configured
- Custom port (4000) for development

### TypeScript Configuration

- Strict mode enabled
- Path aliases configured (@/_ for src/_)
- Next.js plugin integration

### Tailwind Configuration

- Custom color variables
- Responsive breakpoints
- Custom utility classes

## 📊 State Management

### Redux Store Structure

- **Auth State** - User authentication and profile
- **Cart State** - Shopping cart items and totals
- **Compare State** - Product comparison data
- **UI State** - Modal states and UI preferences

### Persistence

- Cart data persisted in localStorage
- User authentication state managed
- Theme preferences saved

## 🚀 Deployment

### Production Build

```bash
npm run build:prod
npm run start
```

### Environment Variables

Ensure all required environment variables are set:

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GTM_ID`

## 📄 License

This project is private and proprietary.

## 📞 Support

For support and questions, please contact the development team.

---

**Gadget Grid** - Your One-Stop Shop for IT Products & Gadgets
