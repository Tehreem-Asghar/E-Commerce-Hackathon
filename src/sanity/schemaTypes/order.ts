const order = {
    name: "order",
    title: "Order",
    type: "document",
    fields: [
      {
        name: "customer",
        title: "Customer Email",
        type: "string",
      },
      {
        name: "shippingAddress",
        title: "Shipping Address",
        type: "object",
        fields: [
          { name: "line1", type: "string", title: "Address Line 1" },
          { name: "city", type: "string", title: "City" },
          { name: "postal_code", type: "string", title: "Postal Code" },
          { name: "country", type: "string", title: "Country" },
        ],
      },
      {
        name: "shippingAmount",
        title: "Shipping Amount",
        type: "number",
      },
      {
        name: "totalAmount",
        title: "Total Amount",
        type: "number",
      },
      {
        name: "orderItems",
        title: "Order Items",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              { name: "id", type: "string", title: "Product ID" },
              { name: "quantity", type: "number", title: "Quantity" },
            ],
          },
        ],
      },
    ],
  };
  
  export default order