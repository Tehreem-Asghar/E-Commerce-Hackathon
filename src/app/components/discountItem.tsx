import React from 'react'
import { Josefin_Sans } from "next/font/google";
import Image from 'next/image';
import { FaCheck } from "react-icons/fa6";


const josefinSans = Josefin_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
  });

function DiscountItem() {
  return (
    <main className='mt-16'>
        <h1 className={`text-[32px] font-bold text-center  mb-4  text-[#151875] ${josefinSans.className}`}>Discount Item</h1>
        <div className="text-[#151875] flex justify-center text-[14px] sm:text-[18px]  items-center gap-2 sm:gap-4 md:gap-10">
        <p className="text-[#FB4997] underline underline-offset-3">
        Wood Chair
        </p>
        <p>Plastic Chair </p>
        <p>Sofa Colletion</p>     
      </div>

      <section>
        <div className='h-[400px]   mt-4  w-full flex justify-center items-center '>
           <div className='flex  flex-col md:flex-row gap-3 justify-center items-center '>
           
            <div  className='grid gap-3 mx-2 sm:mx-0'>
              <h1  className={`text-[#151875] font-bold text-[20px]  sm:text-[30px]  ${josefinSans.className}`}>20% Discount Of All Products</h1>

              <p className='text-[#FB2E86]'> Eams Sofa Compact</p>

              <p className='text-[#B7BACB]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget <br/>
                 feugiat habitasse nec, bibendum condimentum. </p>

                 <div className='text-[#B7BACB] grid grid-cols-2 gap-3'>
                    <div className='flex items-center gap-2'><FaCheck className='text-[#151875] text-[10px] sm:text-[16px]'/> <p>Material expose like metals</p></div>
                    <div className='flex items-center gap-2'><FaCheck className='text-[#151875]  text-[10px] sm:text-[16px]' /> <p>Material expose like metals</p></div>
                    <div className='flex items-center gap-2'><FaCheck  className='text-[#151875]   text-[10px] sm:text-[16px]'/> <p>Material expose like metals</p></div>
                    <div className='flex items-center gap-2'><FaCheck  className='text-[#151875]  '/> <p>Material expose like metals</p></div>
                 </div>
            </div>
            <Image src={'/images/sofa2.png'}  width={558} height={550}  alt='sofa'  className='lg:h-[400px] lg:w-[400px] md:h-[250px] md:w-[250px] md:block  h-[200px] w-[200px]  hidden' />
          </div>
        </div>
      </section>
     

    </main>
  )
}

export default DiscountItem