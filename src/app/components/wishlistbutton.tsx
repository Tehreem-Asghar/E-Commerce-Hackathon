"use client"
import Link from 'next/link';
import React from 'react'
import { IoMdHeartEmpty } from 'react-icons/io';
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




function Wishlistbutton({Product}: any) {


    // Custom Button Component for the action
    const ViewCartButton = () => (
      <Link  href={"/wishlist"}> <button
         className="bg-[#FB2E86] text-white   w-[90px] py-2 px-4 rounded "
       >
         WishList
       </button>
       </Link>
     );
   
        const WishList  = (Wishlist : PT)=>{
   
         if(Wishlist){
           const wishListItems = localStorage.getItem("wishlist");
           
           const wishlist : PT[] = wishListItems ? JSON.parse(wishListItems) : []
   
             wishlist.push(Wishlist)
             localStorage.setItem("wishlist" , JSON.stringify(wishlist))
                 toast("🎉 Item successfully added to your Wishlist!", {
                     description:
                       "You can continue shopping or proceed to view your wishlist by clicking below.",
                     action: <ViewCartButton />,
                   });
   
         }
   
        }



  return (
    <>
    
                    <IoMdHeartEmpty className="text-[28px] hover:text-red-600"  onClick={()=> WishList(Product)} />
    
     </>
  )
}

export default Wishlistbutton