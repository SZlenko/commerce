# Fashion Shop E-commerce Application Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [State Management](#state-management)
5. [Component Documentation](#component-documentation)
6. [Page Documentation](#page-documentation)
7. [Data Schemas](#data-schemas)
8. [Routing Structure](#routing-structure)
9. [Styling System](#styling-system)
10. [API Integration](#api-integration)
11. [Development Guidelines](#development-guidelines)

## Project Overview

Fashion Shop is a modern React-based e-commerce application that provides a complete shopping experience for fashion and lifestyle products. The application features product browsing, advanced filtering, cart management, and a responsive design optimized for all devices. Built with a focus on performance, user experience, and maintainability.

**⚠️ IMPORTANT: This is a CLIENT-SIDE ONLY application** - it runs entirely in the browser with no backend server, database, or real API integrations. All data persistence is handled through Redux state and browser localStorage. Features like authentication, payments, and data persistence are simulated for demonstration purposes.

## Technology Stack

### Core Technologies
- **React 18.2.0** - Frontend framework
- **React Router DOM 6.6.0** - Client-side routing
- **Redux Toolkit 1.9.2** - State management
- **Redux Persist 6.0.0** - State persistence
- **Tailwind CSS 3.2.4** - Utility-first CSS framework

### UI & Animation Libraries
- **Framer Motion 8.0.2** - Animation library
- **React Icons 4.7.1** - Icon components
- **React Slick 0.29.0** - Carousel component
- **Slick Carousel 1.8.1** - Carousel functionality

### Development Tools
- **Create React App** - Build tooling
- **PostCSS 8.4.20** - CSS processing
- **Autoprefixer 10.4.13** - CSS vendor prefixing
- **Tailwind Scrollbar 2.1.0** - Custom scrollbar styling

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Banner/          # Banner components
│   ├── designLayouts/   # Layout and utility components
│   ├── home/           # Home page specific components
│   ├── pageProps/      # Page-specific components
│   └── SpecialCase/    # Special UI components
├── pages/              # Main application pages
├── redux/              # State management
├── assets/             # Static assets
├── constants/          # Application constants
└── App.js             # Main application component
```

## State Management

### Redux Store Configuration
The application uses Redux Toolkit with Redux Persist for state management.

**⚠️ CLIENT-SIDE ONLY**: All state is stored locally in the browser using Redux state and localStorage. No server synchronization occurs.

**Store Setup (`src/redux/store.js`):**
```javascript
const persistConfig = {
  key: "root",
  version: 1,
  storage, // Uses browser localStorage
};

export const store = configureStore({
  reducer: { orebiReducer: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
```

### Redux Slice (`src/redux/orebiSlice.js`)

**Initial State:**
```javascript
const initialState = {
  userInfo: [],
  products: [],
};
```

**Available Actions:**
- `addToCart(payload)` - Adds item to cart or increases quantity if exists
- `increaseQuantity(payload)` - Increases item quantity by 1
- `decreaseQuantity(payload)` - Decreases item quantity by 1 (minimum 1)
- `deleteItem(payload)` - Removes item from cart
- `resetCart()` - Clears entire cart

**Action Payloads:**
```javascript
// addToCart payload
{
  _id: string,
  name: string,
  quantity: number,
  image: string,
  badge: boolean,
  price: string,
  colors: string
}
```

## Component Documentation

### Core Components

#### Product Component (`src/components/home/Products/Product.js`)
**Purpose:** Displays individual product cards with add to cart functionality

**Props:**
- `_id` (string) - Product unique identifier
- `img` (string) - Product image URL
- `productName` (string) - Product name
- `price` (string) - Product price
- `color` (string) - Product color
- `badge` (boolean) - Whether to show sale badge
- `des` (string) - Product description

**Key Functions:**
- `idString(_id)` - Converts product name to URL-friendly string
- `handleProductDetails()` - Navigates to product details page

#### HeaderBottom Component (`src/components/home/Header/HeaderBottom.js`)
**Purpose:** Main navigation header with search functionality

**State:**
- `show` (boolean) - Controls dropdown visibility
- `showUser` (boolean) - Controls user menu visibility
- `searchQuery` (string) - Current search input
- `filteredProducts` (array) - Search results

**Key Functions:**
- `handleSearch(e)` - Updates search query
- Search filtering logic using `paginationItems`

#### SpecialCase Component (`src/components/SpecialCase/SpecialCase.js`)
**Purpose:** Fixed floating action buttons for profile and cart

**Features:**
- Profile link with animation
- Cart link with item count badge
- Responsive design (hidden on mobile)

### Layout Components

#### Flex Component (`src/components/designLayouts/Flex.js`)
**Purpose:** Utility component for flexbox layouts

#### Image Component (`src/components/designLayouts/Image.js`)
**Purpose:** Optimized image component with loading states

#### List Components (`src/components/designLayouts/List.js`, `ListItem.js`)
**Purpose:** Semantic list components for navigation

### Page-Specific Components

#### ProductInfo Component (`src/components/pageProps/productDetails/ProductInfo.js`)
**Purpose:** Displays detailed product information and add to cart functionality

**Props:**
- `productInfo` (object) - Complete product data

**Features:**
- Product details display
- Add to cart functionality
- Price and color information

#### Pagination Component (`src/components/pageProps/shopPage/Pagination.js`)
**Purpose:** Handles product pagination in shop page

**Props:**
- `itemsPerPage` (number) - Number of items per page

**State:**
- `itemOffset` (number) - Current page offset
- `itemStart` (number) - Starting item number for display

**Key Functions:**
- `handlePageClick(event)` - Handles page navigation
- Uses ReactPaginate for pagination controls

## Page Documentation

### Home Page (`src/pages/Home/Home.js`)
**Route:** `/`
**Components Used:**
- Banner
- BannerBottom
- Sale
- NewArrivals
- BestSellers
- YearProduct
- SpecialOffers

### Shop Page (`src/pages/Shop/Shop.js`)
**Route:** `/shop`
**Features:**
- Product filtering sidebar
- Pagination
- Product grid display
- Items per page selection

**State:**
- `itemsPerPage` (number) - Controls pagination

### Product Details Page (`src/pages/ProductDetails/ProductDetails.js`)
**Route:** `/product/:_id`
**Features:**
- Product image display
- Detailed product information
- Related products
- Breadcrumb navigation

**State:**
- `prevLocation` (string) - Previous page for breadcrumbs
- `productInfo` (object) - Product data from navigation state

### Cart Page (`src/pages/Cart/Cart.js`)
**Route:** `/cart`
**Features:**
- Cart item display
- Quantity management
- Price calculations
- Shipping charge calculation
- Coupon application
- Checkout button

**State:**
- `totalAmt` (number) - Total cart amount
- `shippingCharge` (number) - Calculated shipping cost

**Shipping Logic:**
- ≤ $200: $30 shipping
- ≤ $400: $25 shipping
- > $401: $20 shipping

### Authentication Pages
- **Sign In** (`/signin`) - User login
- **Sign Up** (`/signup`) - User registration

### Other Pages
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact information
- **Journal** (`/journal`) - Blog/journal
- **Offer** (`/offer`) - Special offers
- **Payment** (`/paymentgateway`) - Payment processing

## Data Schemas

### Product Schema
```javascript
{
  _id: string,           // Unique identifier
  img: string,           // Image URL
  productName: string,   // Product name
  price: string,         // Price as string
  color: string,         // Color description
  badge: boolean,        // Sale badge indicator
  des: string           // Product description
}
```

### Cart Item Schema
```javascript
{
  _id: string,           // Product ID
  name: string,          // Product name
  quantity: number,      // Item quantity
  image: string,         // Product image
  badge: boolean,        // Sale badge
  price: string,         // Product price
  colors: string        // Product colors
}
```

### Navigation Schema
```javascript
{
  _id: number,           // Navigation ID
  title: string,         // Link text
  link: string          // Route path
}
```

## Routing Structure

### Main Layout Routes
All routes under the main layout include Header, HeaderBottom, SpecialCase, Footer, and FooterBottom:

```
/ (Home)
├── /shop (Shop)
├── /about (About)
├── /contact (Contact)
├── /journal (Journal)
├── /offer (Offer)
├── /product/:_id (Product Details)
├── /cart (Cart)
└── /paymentgateway (Payment)
```

### Standalone Routes
Routes without the main layout:
- `/signin` (Sign In)
- `/signup` (Sign Up)

### Route Parameters
- `:_id` - Product ID for product details page

## Styling System

### Tailwind Configuration (`tailwind.config.js`)

**Custom Breakpoints:**
```javascript
screens: {
  xs: "320px",
  sm: "375px", 
  sml: "500px",
  md: "667px",
  mdl: "768px",
  lg: "960px",
  lgl: "1024px",
  xl: "1280px"
}
```

**Custom Colors:**
```javascript
colors: {
  primeColor: "#262626",    // Primary brand color
  lightText: "#6D6D6D"     // Secondary text color
}
```

**Custom Fonts:**
```javascript
fontFamily: {
  bodyFont: ["DM Sans", "sans-serif"],    // Body text
  titleFont: ["Poppins", "sans-serif"]   // Headings
}
```

**Custom Utilities:**
- `max-w-container` - 1440px max width
- `testShadow` - Custom box shadow
- `font-bodyFont` - DM Sans font family
- `font-titleFont` - Poppins font family

### CSS Classes Usage
- Use Tailwind utility classes for styling
- Apply custom classes for brand-specific styling
- Maintain consistent spacing using Tailwind's spacing scale
- Use responsive prefixes for mobile-first design

## API Integration

**⚠️ CLIENT-SIDE ONLY**: This application does not integrate with real APIs. All data is static and stored locally.

### Current Implementation
The application uses static data from `src/constants/index.js`:

**Data Sources:**
- `paginationItems` - Complete product catalog (504 items)
- `SplOfferData` - Special offer products
- `navBarList` - Navigation menu items

### Note on Backend Integration
This is a demonstration application. If integrating with a real backend API, consider:

**Product Endpoints:**
- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch single product
- `GET /api/products/search?q=query` - Search products

**Cart Endpoints:**
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item

**User Endpoints:**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/user/profile` - User profile

## Development Guidelines

### Code Organization
1. **Components:** Place in appropriate directories based on functionality
2. **Pages:** Keep page components simple, delegate complex logic to child components
3. **State:** Use Redux for global state, local state for component-specific data
4. **Styling:** Prefer Tailwind classes over custom CSS

### Performance Considerations
1. **Images:** Use WebP format for better compression
2. **Components:** Implement React.memo() for expensive components
3. **Lists:** Use proper key props for list items
4. **Lazy Loading:** Consider code splitting for large components

### Accessibility
1. **Semantic HTML:** Use proper HTML elements
2. **ARIA Labels:** Add labels for screen readers
3. **Keyboard Navigation:** Ensure all interactive elements are keyboard accessible
4. **Color Contrast:** Maintain proper contrast ratios

### Testing Strategy
1. **Unit Tests:** Test utility functions and Redux actions
2. **Component Tests:** Test component rendering and user interactions
3. **Integration Tests:** Test complete user flows
4. **E2E Tests:** Test critical user journeys

### Deployment
1. **Build Process:** Use `npm run build` for production builds
2. **Environment Variables:** Configure for different environments
3. **Static Assets:** Optimize images and assets
4. **Performance:** Monitor bundle size and loading times

## Recent Updates and Changes

### Version History
- **v0.1.0** - Initial release with core e-commerce functionality
- Current features include product browsing, cart management, and basic authentication

### Known Issues
1. Static data implementation - needs API integration
2. Payment gateway integration pending

### Future Enhancements
1. User authentication and profile management
2. Order history and tracking
3. Product reviews and ratings
5. Advanced search and filtering
6. Admin dashboard
7. Mobile app development

---

*This documentation is maintained alongside the codebase and should be updated whenever new features, components, or significant changes are made to the application.*
