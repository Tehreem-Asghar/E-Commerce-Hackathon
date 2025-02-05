"use client"
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LuHeartOff } from "react-icons/lu";
import AddtocardButton from "../components/addtocardButton";
import product from "@/sanity/schemaTypes/product";
import Link from "next/link";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});


interface Product {
    price: string;
    name: string;
    discountPercentage: number;
    description: string;
    image: string;
    _id: string;
    stockLevel?: number;
    category? :string;
    tags? :string[]
  }


function Wishlist() {
  const [parsedItems, setParsedItems] = useState<Product[]>([]);

  useEffect(() => {
    const wishListItems  = localStorage.getItem("wishlist") || "[]"; // Default to an empty array as a string
    setParsedItems(JSON.parse(wishListItems)); // Parse and store the data in state
  }, []);

  console.log(parsedItems);

const removeFromWishList = (RemoveId : any)=>{

    // Step 1: Retrieve the array from localStorage
const wishListItems = JSON.parse(localStorage.getItem("wishlist") || "[]");

// Step 2: Remove a specific value (e.g., "itemToRemove")
const updatedItems = wishListItems.filter((item : Product ) => item._id !== RemoveId);
setParsedItems(updatedItems); // Update the state

// Step 3: Save the updated array back to localStorage
localStorage.setItem("wishlist", JSON.stringify(updatedItems));

console.log("Updated wishlist:", updatedItems);

}



  return (
    <div className="max-w-[1920px] mx-auto">
      <section className="h-[286px] w-full bg-[#F6F5FF] grid items-center border-b-gray-300 border-b ">
        <div className="sm:mx-[170px] mx-[30px] overflow-hidden text-center sm:text-left">
          <h2
            className={`${josefinSans.className} text-[25px] sm:text-[36px] text-[#101750] font-bold`}
          >
            WishList Items ({parsedItems.length})
          </h2>
          <span className="flex sm:justify-start justify-center font-medium">
            <p>Home.Pages</p>
            <p className="text-[#FB2E86]">.wishlist</p>
          </span>
        </div>
      </section>
      {parsedItems.length >0 ? <>
        <section className="mt-9  mb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-center gap-4">
          {parsedItems.map((item : Product) => (
            <div key={item._id} className="bg-white shadow-md p-4 rounded grid  justify-center items-center  h-auto  w-full">
             <div className="h-auto w-full relative flex justify-center p-2 bg-slate-200">
                <Image src={item.image} height={400} width={300} alt={item.name}  className="h-[200px] w-[200px]" />
               
               <div className="  h-auto w-auto p-2 absolute right-2 top-2 rounded-full bg-slate-300"> <LuHeartOff onClick={()=> removeFromWishList(item._id)}  className="h-[25px] w-[25px] text-red-700"/> </div>
              {item.discountPercentage > 0  && <div className="bg-[#FB2E86] p-1 rounded-md absolute left-2 top-2 text-white">  <p> {item.discountPercentage}%<sup >off</sup></p> </div>}   
            </div>
            <div className="text-center mt-2"> 
               <p className="line-clamp-1 text-[#FB2E86] font-bold">{item.name}</p>
               <p className="line-clamp-2 text-[#151875]">{item.description}</p>
               <p className="text-[#FB2E86]">{`Rs-${item.price}`}</p>
              <AddtocardButton product={item} />
            </div>
            </div>
          ))}
        </div>
      </section>
      
      </>   :  
       <div className="h-full w-full flex justify-center items-center">
       
       <div  className="h-auto  w-[500px] grid justify-center items-center my-56  md:my-72">
        <h2  className="text-[#151875] font-extrabold mb-2 text-[25px] md:text-[30px]">Your WishList is Empty </h2>
       <Link  href={'/'}> <button className="bg-[#FB2E86]  text-white p-4 w-full h-auto">Continue Shopping</button>  </Link> 
       </div>
        
      </div>}
    
    </div>
  );
}

export default Wishlist;
