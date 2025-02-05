"use client";

import React, { useEffect, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import { IoCheckbox } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { toast } from "sonner"; 

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});


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

function Cart() {
  // State to store the cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Get data from localStorage and save it in the state
  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("cart");
    if (dataFromLocalStorage) {
      setCartItems(JSON.parse(dataFromLocalStorage));
    } else {
      setCartItems([]);
    }
  }, []);

  // Function to increase or decrease the quantity of a specific plant
  const handleQuantityChange = (id: string, increment: boolean) => {
    const updatedCart = cartItems.map((item) =>
      item.selectedPlant._id === String(id)
        ? {
            ...item,
            quantity: increment
              ? Math.min(item.quantity + 1, item.selectedPlant?.stockLevel ?? 0)
              : Math.max(1, item.quantity - 1),
          }
        : item
    );
    setCartItems(updatedCart); // Update state with the new quantities
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart to localStorage
  };

  // Function to remove an item from the cart based on its ID
  const handleRemove = (id: string) => {
    const updatedCart = cartItems.filter(
      (item) => item.selectedPlant._id !== String(id)
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // calculate items total
  const calculateSubtotal = () => {
    const amount = cartItems.reduce(
      (total, item) => total + Number(item.selectedPlant.price) * item.quantity,
      0
    );
    return amount;
  };

  const subTotal: number = calculateSubtotal();

  const SHIPPING_COST = 200; // Example flat shipping cost
  const total = calculateSubtotal() 

  // JSX Render
  return (
    <main className="max-w-[1920px] mx-auto">
      <section className="h-[286px] w-full bg-[#F6F5FF] grid items-center">
        <div className="sm:mx-[170px] mx-[30px] overflow-hidden  text-center sm:text-left">
          <h2
            className={`${josefinSans.className} text-[25px] sm:text-[36px] text-[#101750] font-bold`}
          >
            Shopping Cart
          </h2>
          <span className="flex sm:justify-start justify-center font-medium">
            <p>Home.Pages</p>
            <p className="text-[#FB2E86]">.shopping cart</p>
          </span>
        </div>
      </section>

      {cartItems.length > 0 ? (
        <section className="lg:mx-[170px] mx-[30px]">
          <div className="shadow-sm h-auto gap-9 w-full my-24 sm:my-36 flex lg:flex-row flex-col">
            {/* Cart Table */}
            <div className="w-full">
              <table className="w-full">
                <thead>
                  <tr className="text-[#1D3178]  ">
                    <th className="py-5 pl-2">Product</th>
                    <th className="py-5  pl-2">Price</th>
                    <th className="py-5  pl-2">Quantity</th>
                    <th className="py-5  pl-2">Total</th>
                  </tr>
                </thead>
                <tbody className="pt-3  md:text-[16px] sm:text-[14px]  text-[12px]">
                  {cartItems.map((item, index) => (
                    <>
                      <tr key={index} className=" my-9">
                        {/* Product Image */}
                        <td className="flex gap-4 sm:flex-row flex-col">
                          <div className="h-[100px] w-[100px] md:w-[150px]    relative">
                            <Image
                              src={item.selectedPlant.image}
                              height={150}
                              width={150}
                              className="h-full w-full"
                              alt={item.selectedPlant.name}
                            />
                            <div
                              onClick={() =>
                                handleRemove(String(item.selectedPlant._id))
                              }
                              className="h-3 w-3 text-[9px] rounded-full p-1 flex justify-center items-center bg-[#1b1b1b] text-white absolute top-0 right-0"
                            >
                              x
                            </div>
                          </div>
                          <div className="md:text-[16px] sm:text-[14px]  text-[12px]">
                            <h1>{item.selectedPlant.name}</h1>
                            <p className="text-[#A1A8C1]"> color:Brown</p>
                            <p className="text-[#A1A8C1]">size:XL</p>
                          </div>
                        </td>
                        {/* Product Price */}
                        <td className="text-center text-[#1D3178] md:text-[16px] sm:text-[14px]  text-[12px]">
                          {item.selectedPlant.price}
                        </td>
                        {/* Quantity */}
                        <td className="text-center">
                          <div className="flex justify-between items-center h-[15px] w-[51px] border text-[#BEBFC2]  bg-gray-200 overflow-hidden">
                            <button
                              className=" h-auto w-[10px] py-1 bg-gray-200 hover:bg-gray-300"
                              onClick={() =>
                                handleQuantityChange(
                                  String(item.selectedPlant._id),
                                  false
                                )
                              }
                            >
                              -
                            </button>
                            <span className=" py-1">{item.quantity}</span>
                            {item.quantity <
                            (item.selectedPlant.stockLevel
                              ? item.selectedPlant.stockLevel
                              : 0) ? (
                              <>
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      String(item.selectedPlant._id),
                                      true
                                    )
                                  }
                                  className="h-auto w-[10px] py-1 bg-gray-200 hover:bg-gray-300"
                                >
                                  +
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  // variant="outline"
                                  onClick={() =>
                                    toast("Out of Stock", {
                                      description:
                                        "Oops! You've reached the maximum stock available for this item.",
                                      action: {
                                        label: "Got It",
                                        onClick: () =>
                                          console.log(
                                            "User acknowledged the stock limit."
                                          ),
                                      },
                                    })
                                  }
                                  className="h-auto w-[10px] py-1 bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-[#BEBFC2]"
                                >
                                  +
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                        {/* Total Price */}
                        <td className="text-center text-[#1D3178]">
                          {" "}
                          {item.quantity &&
                            item.selectedPlant.price &&
                            (
                              item.quantity * Number(item.selectedPlant.price)
                            ).toFixed(2)}
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={4}>
                          <hr className="border border-b-[#E1E1E4]" />
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="text-right">
                      <div className="flex justify-between w-full mt-10">
                        <button className="bg-[#FB2E86] text-white w-[134px] h-[39px]">
                          Update Cart
                        </button>
                        <button
                          className="bg-[#FB2E86] text-white w-[134px] h-[39px]"
                          onClick={() => localStorage.clear()}
                        >
                          Clear Cart
                        </button>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Cart Totals Section */}
            <div className="lg:w-[40%]  w-[100%] ">
              <h2 className="my-5 text-center text-[#1D3178] font-bold">
                Cart Totals
              </h2>
              <div className="h-auto  w-full p-7  bg-[#E8E6F1]">
                <div className="flex justify-between text-[#1D3178]  border-[2px]  border-b-[#d0ced4]">
                  <h3>Subtotals:</h3>
                  <h3>{subTotal}</h3>
                </div>

                <div className="flex justify-between text-[#1D3178] mt-3  border-[2px]  border-b-[#d0ced4]">
                  <h3>Total:</h3>
                  <h3>{total}</h3>
                </div>

                <div className="flex gap-2 mt-4">
                  <IoCheckbox className="text-[#19D16F]" />
                  <p className="text-[#8A91AB] text-[10px]">
                    {" "}
                    Shipping & taxes calculated at checkout
                  </p>
                </div>

                <Button
                  asChild
                  className="h-[40px] w-full bg-[#19D16F] mt-4 hover:bg-[#19D16F] text-white"
                >
                  <Link href={"/cart/checkOut"}>Proceed To Checkout</Link>
                </Button>
              </div>

              {/* <h2 className="my-5 text-center text-[#1D3178] font-bold">
                Calculate Shopping
              </h2>

              <div className="h-auto  w-full p-7  bg-[#E8E6F1]">
                <div className="flex justify-between text-[#1D3178]  border-[2px]  border-b-[#d0ced4]">
                  <h3>Bangladesh</h3>
                </div>

                <div className="flex justify-between text-[#1D3178] mt-3  border-[2px]  border-b-[#d0ced4]">
                  <h3>Mirpur Dhaka - 1200</h3>
                </div>

                <div className="flex justify-between text-[#1D3178] mt-3  border-[2px]  border-b-[#d0ced4]">
                  <h3>Postal Code</h3>
                </div>

                <Button className="h-[40px] w-[179px] bg-[#FB2E86] mt-4 hover:bg-[#FB2E86] text-white">
                  {" "}
                  Calculate Shiping
                </Button>
              </div> */}
            </div>
          </div>
        </section>
      ) : (
        <section className="h-screen flex justify-center items-center ">
          <div className="text-center max-w-lg w-full  shadow-lg rounded-xl py-6 px-4 space-y-6">
            <h2 className="text-[#FB2E86]  font-extrabold text-2xl ">
              🛒 No items in the cart
            </h2>
            <p className="text-gray-600 text-lg md:text-xl">
              {`Looks like you haven't added anything yet.`}
            </p>
            <Link
              href="/"
              className="inline-block bg-[#FB2E86]  text-white font-medium py-2 px-4 rounded-md text-lg md:text-xl lg:text-2xl hover:bg-[#cf4450]  transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

export default Cart;
