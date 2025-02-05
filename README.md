# E-Commerce Marketplace Project

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Pages Overview](#pages-overview)
- [API Integration Details](#api-integration-details)
- [Development Process](#development-process)
- [Deployment](#deployment)
- [Acknowledgments](#acknowledgments)

---

## Overview

This project is a fully functional e-commerce marketplace built during a 7-day hackathon. It integrates modern technologies like Stripe, ShipEngine, and Sanity to provide a seamless shopping experience. The project includes dynamic data handling, payment processing, shipping management, and more.

## Features

- Dynamic homepage with featured products and blog posts.
- Secure payment processing using **Stripe**.
- Real-time stock updates post-payment.
- Advanced shipping functionalities with **ShipEngine**:
  - Label generation.
  - Shipping rates calculation.
  - Tracking orders.
- Wishlist and cart management.
- Full-text search functionality.
- Backend powered by **Sanity** for content management.
- Responsive design for desktop and mobile.

## Technologies Used

- **Frontend:** React.js, Next.js, Tailwind CSS.
- **Backend:** Sanity CMS.
- **Payment:** Stripe API.
- **Shipping:** ShipEngine API.
- **Other Tools:** TypeScript, Node.js.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the required API keys for Stripe, ShipEngine, and Sanity.
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Navigate to `https://ui-ux-hackathon-sable.vercel.app/` to explore the website.
2. Use the search bar to find products.
3. Add items to your cart or wishlist.
4. Proceed to checkout for payment.
5. Track your orders post-purchase.

## Pages Overview

- **Home:** Highlights featured products and latest blog posts.
- **Shop:** Browse all products with filtering options.
- **Product:** Detailed view of individual products.
- **Blog:** Read informative posts.
- **Contact:** Get in touch with customer support.
- **About:** Learn more about our marketplace.
- **Wishlist:** Save your favorite products.
- **Cart:** Manage your selected items for checkout.
- **FAQ:** Commonly asked questions.

## API Integration Details

- **Sanity CMS:**
  - Fetch and display product and blog data.
  - Handle dynamic stock updates.
- **Stripe:**
  - Secure payment processing.
  - Post-payment stock updates.
- **ShipEngine:**
  - Generate shipping labels.
  - Calculate shipping rates.
  - Provide real-time order tracking.

## Development Process

### Day 1: Marketplace Business Goals
- Selected "General E-Commerce" as the marketplace type.

### Day 2: Marketplace Technical Foundation
- Set up the foundational architecture for an e-commerce platform.

### Day 3: API Integration and Data Migration
- Integrated Sanity CMS, Stripe, and ShipEngine APIs.
- Migrated sample data.

### Day 4: Building Dynamic Frontend Components
- Created dynamic pages for products, blogs, and categories.

### Day 5: Testing and Backend Integration Refinement
- Conducted thorough testing.
- Refined error handling.

### Day 6: Deployment Preparation
- Set up a staging environment.

## Deployment

The project has been deployed and is live at:
[https://ui-ux-hackathon-sable.vercel.app/](#)

## Acknowledgments

This project was made possible by the tools and APIs provided by:

- [Sanity CMS](https://www.sanity.io/)
- [Stripe](https://stripe.com/)
- [ShipEngine](https://www.shipengine.com/)

---

Thank you for exploring this project! If you have any feedback or suggestions, feel free to open an issue or reach out. 😊
