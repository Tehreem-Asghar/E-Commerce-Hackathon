"use client";
import React, { useEffect, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import { FaCheck } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

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
  category: string;
  tags: string[];
}

interface CartItem {
  selectedPlant: PT;
  quantity: number;
}

function Confirm() { // Updated name
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleUpdate = async () => {
    try {
      const updatePromises = cartItems.map(async (item: any) => {
        if (
          item.selectedPlant.stockLevel &&
          item.quantity &&
          item.selectedPlant._id
        ) {
          await client
            .patch(item.selectedPlant._id)
            .set({
              stockLevel: item.selectedPlant.stockLevel - item.quantity,
            })
            .commit();
        }
      });

      await Promise.all(updatePromises);

      localStorage.clear();

      console.log("Stock has been updated successfully!");
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dataFromLocalStorage = localStorage.getItem("cart");
      if (dataFromLocalStorage) {
        setCartItems(JSON.parse(dataFromLocalStorage));
      } else {
        setCartItems([]);
      }
    }
  }, [setCartItems]);

  return (
    <main className="max-w-[1920px] mx-auto">
      <section className="h-[286px] w-full bg-[#F6F5FF] grid items-center ">
        <div className="sm:mx-[170px] mx-[30px] overflow-hidden text-center sm:text-left">
          <h2
            className={`${josefinSans.className} text-[25px] sm:text-[36px] text-[#101750] font-bold`}
          >
            Order Completed
          </h2>
          <span className="flex sm:justify-start justify-center font-medium">
            <p>Home.Pages</p>
            <p className="text-[#FB2E86]">.Order Completed</p>
          </span>
        </div>
      </section>

      <section className="lg:mx-[170px] mx-[30px] my-24 flex justify-center items-center">
        <div className="flex flex-col justify-center  items-center gap-4 h-auto w-[635px] ">
          <div className="h-[65px] w-[65px] rounded-full flex justify-center items-center bg-white shadow-md">
            <FaCheck className="text-[#FF1788] text-[36px] font-bold " />
          </div>
          <h1 className="text-[#101750]  text-[24px] sm:text-[36px] font-bold text-center ">
            Your Order Is Completed!{" "}
          </h1>
          <p className="text-[#8D92A7] text-center  text-[14px] sm:text-[16px] ">
            Thank you for your order! Your order is being processed and will be
            completed within 3-6 hours. You will receive an email confirmation
            when your order is completed.
          </p>

          <Button
            onClick={handleUpdate}
            asChild
            className="text-white w-[208px] h-[59px]  hover:bg-[#FB2E86] bg-[#FB2E86]"
          >
            <Link href={"/"}>Continue Shopping</Link>
          </Button>
        </div>
      </section>

      <div className="h-[93px] sm:mx-[170px] mx-[30px]  mb-4">
        <Image
          src={"/images/tags/tags.png"}
          height={93}
          width={400}
          alt="tag"
          className="h-[93px] w-full"
        />
      </div>
    </main>
  );
}

export default Confirm; // Updated export















































// "use client"
// import React, { useEffect, useState } from "react";
// import { Josefin_Sans } from "next/font/google";
// import { FaCheck } from "react-icons/fa6";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";
// import { client } from "@/sanity/lib/client";

// const josefinSans = Josefin_Sans({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });


// interface PT {
//   price: string;
//   name: string;
//   discountPercentage: number;
//   description: string;
//   image: string;
//   _id: string;
//   stockLevel: number;
//   category: string;
//   tags: string[];
// }

// interface CartItem {
//   selectedPlant: PT;
//   quantity: number;
// }


// function confirm( ) {
//    const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   const handleUpdate = async () => {
//     try {
//       const updatePromises = cartItems.map(async (item : any) => {
//         if (
//           item.selectedPlant.stockLevel &&
//           item.quantity &&
//           item.selectedPlant._id
//         ) { 
//           // Ensure stock and quantity are numbers before updating
//           await client
//             .patch(item.selectedPlant._id)
//             .set({
//               stockLevel: item.selectedPlant.stockLevel - item.quantity,
//             })
//             .commit();
//         }
//       });

//       // Wait for all update operations to complete
//       await Promise.all(updatePromises);

//       // After updates, clear the local storage
//       localStorage.clear();

//       console.log("Stock has been updated successfully!");
//     } catch (error) {
//       console.error("Error updating stock:", error);
//     }
//   };


//   // Get data from localStorage and save it in the state
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const dataFromLocalStorage = localStorage.getItem("cart");
//       if (dataFromLocalStorage) {
//         setCartItems(JSON.parse(dataFromLocalStorage));
//       } else {
//         setCartItems([]);
//       }
//     }
//   }, [setCartItems]);

//   return (
//     <main className="max-w-[1920px] mx-auto">
//       <section className="h-[286px] w-full bg-[#F6F5FF] grid items-center ">
//         <div className="sm:mx-[170px] mx-[30px] overflow-hidden text-center sm:text-left">
//           <h2
//             className={`${josefinSans.className} text-[25px] sm:text-[36px] text-[#101750] font-bold`}
//           >
//             Order Completed
//           </h2>
//           <span className="flex sm:justify-start justify-center font-medium">
//             <p>Home.Pages</p>
//             <p className="text-[#FB2E86]">.Order Completed</p>
//           </span>
//         </div>
//       </section>

//       <section className="lg:mx-[170px] mx-[30px] my-24 flex justify-center items-center">
//         <div className="flex flex-col justify-center  items-center gap-4 h-auto w-[635px] ">
//           <div className="h-[65px] w-[65px] rounded-full flex justify-center items-center bg-white shadow-md">
//             <FaCheck className="text-[#FF1788] text-[36px] font-bold " />
//           </div>
//           <h1 className="text-[#101750]  text-[24px] sm:text-[36px] font-bold text-center ">
//             Your Order Is Completed!{" "}
//           </h1>
//           <p className="text-[#8D92A7] text-center  text-[14px] sm:text-[16px] ">
//             Thank you for your order! Your order is being processed and will be
//             completed within 3-6 hours. You will receive an email confirmation
//             when your order is completed.
//           </p>

//           <Button
//              onClick={handleUpdate}
//             asChild
//             className="text-white w-[208px] h-[59px]  hover:bg-[#FB2E86] bg-[#FB2E86]"
//           >
//             <Link href={"/"}>Continue Shoping</Link>
//           </Button>
//         </div>
//       </section>

//       <div className="h-[93px] sm:mx-[170px] mx-[30px]  mb-4">
//         <Image
//           src={"/images/tags/tags.png"}
//           height={93}
//           width={400}
//           alt="tag"
//           className="h-[93px] w-full"
//         />
//       </div>
//     </main>
//   );
// }

// export default confirm;
