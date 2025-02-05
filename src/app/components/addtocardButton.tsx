"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface PT {
  price: string;
  name: string;
  discountPercentage: number;
  description: string;
  image: string;
  _id: string;
  stockLevel: number;
  category :string;
  tags :string[]
}

interface CartItem {
  selectedPlant: PT;
  quantity: number;
}

function AddtocardButton({ product }: any) {
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();

  // Custom Button Component for the action
  const ViewCartButton = () => (
    <button
      onClick={() => router.push("/cart")}
      className="bg-[#FB2E86] text-white   py-2 px-4 rounded "
    >
      View Cart
    </button>
  );

  const addToCard: () => any = () => {
    if (product) {
      // Check if 'cart' already exists in localStorage
      const cartItems = localStorage.getItem("cart");

      // If cart exists, parse it, otherwise initialize as an empty array
      const cart: CartItem[] = cartItems ? JSON.parse(cartItems) : [];

      // Check if the selected product is already in the cart
      const existingItem: CartItem | undefined = cart.find(
        (item: CartItem) => item.selectedPlant?._id === product._id
      );

      if (existingItem) {
        // Update the quantity if the plant is already in the cart
        existingItem.quantity += quantity;
      } else {
        // Add the new product with its quantity
        const data: CartItem = {
          selectedPlant: product,
          quantity: quantity,
        };
        cart.push(data);
      }

      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      toast("Item successfully added to the cart!", {
        description:
          "You can continue shopping or proceed to checkout from the cart page.",
        action: <ViewCartButton />,
      });
    }
  };

  return (
    <Button
      onClick={() => addToCard()}
      className="bg-inherit  hover:text-white hover:bg-[#FB2E86] text-[#151875]"
    >
      Add To cart
    </Button>
  );
}

export default AddtocardButton;
