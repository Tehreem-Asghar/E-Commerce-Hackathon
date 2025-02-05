# Day2: Marketplace Technical Foundation General E-Commerce

This project is an e-commerce application using **Sanity CMS** as the backend for managing product data and third-party APIs for shipping and payments. Below is a detailed breakdown of the project features, architecture, and workflow based on the provided diagram.

- click here & see diagram  : https://excalidraw.com/#json=StIWd1RTVxgqAaBaKJ-R6,HEJhsP9FOOOdxf3zAfoADg

## Features

1. **Sanity CMS Integration**
   - Acts as the backend to store and manage:
     - Product data (ID, Name, Old Price, New Price, Stock, Category, Description, Image, Rating).
     - Order records.
   - Categories: Furniture, Electronics, Accessories.

2. **Responsive Design**
   - Fully responsive user interface for all pages, ensuring a seamless experience on various screen sizes.

3. **Third-Party API Integration**
   - **ShipEngine**: Used for tracking orders.
   - **Stripe**: Used for processing payments securely.

4. **User Interface Workflow**
   - Home Page: Displays a responsive product listing.
   - Product Detail Page: Shows detailed information about the selected product.
   - Cart: Displays selected products with price and quantity.
   - Checkout: Processes shipping and payment information.
   - Login: Provides user authentication.
   - Order Confirmation: Displays a success message with order details.

## Application Workflow

### 1. Home Page (`localhost:3000/ base Url`)
   - Displays a list of products fetched from Sanity CMS.
   - Each product includes a name, image, price, and rating.
   - Users can click on a product to navigate to its detail page.

### 2. Product Detail Page (`localhost:3000/product/:id`)
   - Displays detailed information about a specific product, including:
     - Name, Image, Old Price, New Price, Description, Stock, and Rating.
   - Allows users to add the product to the cart.

### 3. Cart (`localhost:3000/cart`)
   - Lists all added products with their quantity and total price.
   - Users can modify quantities or remove products from the cart.

### 4. Checkout Page (`localhost:3000/cart/checkout`)
   - Collects shipping information and integrates **ShipEngine** to calculate shipping rates.
   - Processes payments using **Stripe**.

### 5. Payment Confirmation (`localhost:3000/cart/checkout/payment`)
   - Confirms the payment and redirects users to the order confirmation page.

### 6. Order Confirmation (`localhost:3000/confirmation`)
   - Displays a success message with order details.
   - Thanks the user and provides an option to continue shopping.

## Product Data Structure

Managed via Sanity CMS:
```json
{
  "ID": "string",
  "Name": "string",
  "Old Price": "number",
  "New Price": "number",
  "Stock": "number",
  "Category": "string (furniture, electronics, accessories)",
  "Description": "string",
  "Image": "string (URL)",
  "Rating": "number (1-5)"
}
