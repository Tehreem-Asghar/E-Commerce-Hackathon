import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";


function Footer() {
  return (
    
    <main  className='bg-[#EEEFFB] flex  lg:flex-row flex-col mb-5 gap-20 w-full h-auto  p-14  justify-center  items-center   lg:px-[100px] px[30px]'>
        <section  className='grid gap-4 '>
            <h1 className='font-bold text-[22px]'>Hekto</h1>
            <div className="w-[300px] h-[40px] flex    bg-red-300 border border-gray-250 ">
          <input type="text" className="h-full w-full p-2" placeholder='Enter Enmail Address' />
          <span className="w-[100px]  p-1  h-auto bg-[#FB2E86] text-white flex justify-center items-center">
             Sign Up
          </span>         

        </div>

    
        <div className='grid gap-1'>  
        <p className='text-[#8A8FB9]'>Contact Info</p>
        <p className='text-[#8A8FB9]'>17 Princess Road, London, Greater London NW1 8JR, UK</p>
        </div>
        </section>
        <div className='sm:flex sm:gap-10'>
        <section>
            <h1 className=' text-[22px] font-sans ' > Categories</h1>
            <div className='text-[#8A8FB9] grid gap-4 mt-3'>
                <p>Laptops & Computers</p>
                <p>Cameras & Photography</p>
                <p>Smart Phones & Tablets</p>
                <p>Video Games & Consoles </p>
                <p>Waterproof Headphones</p>
            </div>
        </section>


        <section>
            <h1 className=' text-[22px] font-sans ' > Customer Care</h1>
            <div className='text-[#8A8FB9] grid gap-4 mt-3'>
                <p>My Account</p>
                <p>Returns</p>
                <p>Orders History</p>
                <p>Order Tracking </p>
                <p>Discount</p>
            </div>
        </section>



        <section>
            <h1 className=' text-[22px] font-sans ' > Pages</h1>
            <div className='text-[#8A8FB9] grid gap-4 mt-3'>
                <p>Blog</p>
                <p> Browse the Shop</p>
                <p>Category</p>
                <p>Pre-Built Pages</p>
                <p>Visual Composer Elements</p>
                <p>WooCommerce Pages </p>
            </div>
            
        </section>
        </div> 
    </main>
  )
}

export default Footer


export function BottomFooter(){
    return(
        <div className='w-full h-[20px] pb-6 flex justify-around items-center bg-white'>
            <p className='text-[#9DA0AE]'>©Webecy - All Rights Reserved</p>
            <div className='flex gap-3 items-center text-[25px]'>
            <FaFacebook className='text-[#151875] '/>
            <FaInstagramSquare  className='text-[#151875]'/>
            <AiFillTwitterCircle className='text-[#151875]'/>

            </div>

        </div>
    )
}