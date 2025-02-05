"use client"
import React, { useEffect, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import { PiCirclesFourFill } from "react-icons/pi";
import { TfiMenuAlt } from "react-icons/tfi";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { FaSearchPlus } from "react-icons/fa";
import { client } from "@/sanity/lib/client";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { toast } from "sonner";


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
}




  // Custom Button Component for the action
  const ViewCartButton = () => (
    <Link  href={"/wishlist"}> <button
       className="bg-[#FB2E86] text-white   w-[90px] py-2 px-4 rounded "
     >
       WishList
     </button>
     </Link>
   );
 
      const WishList  = (Wishlist : Product)=>{
 
       if(Wishlist){
         const wishListItems = localStorage.getItem("wishlist");
         
         const wishlist : Product[] = wishListItems ? JSON.parse(wishListItems) : []
 
           wishlist.push(Wishlist)
           localStorage.setItem("wishlist" , JSON.stringify(wishlist))
               toast("🎉 Item successfully added to your Wishlist!", {
                   description:
                     "You can continue shopping or proceed to view your wishlist by clicking below.",
                   action: <ViewCartButton />,
                 });
 
       }
 
      }
 









 function Shop() {

   const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [isOpen , setisOpen] = useState(true)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
          
        };


 // Filter products based on search query
 const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes( search.toLowerCase())
);

  useEffect(() => {
    async function getData() {
      const res = await client.fetch(`*[_type == "product" && "shops" in tags]{
  _id,
  name,
  "image" : image.asset -> url,
  price,
  description,
  discountPercentage,
  isFeaturedProduct,
  stockLevel,
  category,
  tags
}`);
      setProducts(res);
    }

    getData();

  }, []);



  return (
    <main className="max-w-[1920px] mx-auto">
      <section className="h-[286px] w-full bg-[#F6F5FF] grid items-center ">
        <div className="sm:mx-[170px] mx-[30px] overflow-hidden text-center sm:text-left">
          <h2
            className={`${josefinSans.className} text-[25px] sm:text-[36px] text-[#101750] font-bold`}
          >
            Shop Grid Default
          </h2>
          <span className="flex sm:justify-start justify-center font-medium">
            <p>Home.Pages</p>
            <p className="text-[#FB2E86]">.Shop Grid Default</p>
          </span>
        </div>
      </section>

      <section className="lg:mx-[170px] mx-[20px] sm:mx-[30px] screen4:mx-[25px] my-24 flex flex-col justify-center items-center ">
        <div className="flex justify-between items-center w-full  gap-8">
          <div>
            <h2
              className={`${josefinSans.className}  text-[11px] sm:text-[14px] lg:text-[18px]  text-[#101750] font-bold`}
            >
              Ecommerce Acceories & Fashion item
            </h2>
            <p className="text-[#8A8FB9] lg:text-[16px]  text-[11px] sm:text-[13px] ">
              {" "}
              About 9,620 results (0.62 seconds)
            </p>
          </div>
          {/* ------- */}
          <div className="flex items-center gap-2">
            <div className="lg:flex items-center gap-2   hidden ">
              <p className="text-[#3F509E] text-[14px]">Per Page:</p>
              <input
                type="text"
                className="h-[25px] w-[55px] border border-[#E7E6EF]"
              />
            </div>

            <div className="lg:flex  hidden items-center gap-2">
              <p className="text-[#3F509E] text-[14px]">Sort By:</p>
              <select className="h-[30px] w-auto text-[#3F509E] p-1 border border-[#E7E6EF]">
                <option value="volvo">Best match</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-[#3F509E] hidden sm:block">View:</p>
              <PiCirclesFourFill  onClick={()=> setisOpen(false)} className="text-[#3F509E]" />
              <TfiMenuAlt   onClick={()=> setisOpen(true)}  className="text-[#3F509E]" />
            </div>

            <input
              type="text"
              className="h-[25px] w-[100px] border border-[#E7E6EF]  sm:block  hidden"
              value={search}
                onChange={handleSearchChange}
            />
          </div>
        </div>
      </section>


       {isOpen ? <>
       
        <section className="lg:mx-[170px] mx-[20px] sm:mx-[30px] screen4:mx-[25px] my-24 flex flex-col">
        <div>

        {filteredProducts.length !== 0 ? <>   {filteredProducts.map((shopItem : Product)  => (
            <div className="flex  sm:flex-row  flex-col gap-5 w-full" key={shopItem.name}>
              <div className="h-[217px] w-full sm:w-[30%]">
                <Image
                  src={shopItem.image}
                  alt={shopItem.name}
                  height={217}
                  width={313}
                  // className="h-[217px] w-full sm:w-[313px]"
                  className="h-[217px] w-[100%]"

                />
              </div>
              <div className="grid items-center w-full sm:w-[70%]  py-9">
                <div className=" grid  gap-4  ">
                  <div className="w-auto flex items-center  gap-4">
                    <h1 className="text-[#111C85] text-[18px] font-bold">
                      {shopItem.name}
                    </h1>
                    <div className="flex gap-1 justify-center items-center">
                      <div className="h-[10px] w-[10px] rounded-full bg-[#DE9034]"></div>
                      <div className="h-[10px] w-[10px] rounded-full bg-[#EC42A2]"></div>
                      <div className="h-[10px] w-[10px] rounded-full bg-[#8568FF]"></div>
                    </div>
                  </div>

                  <div className=" flex    items-center gap-6">
                    <div className="flex gap-2">
                      <p className="text-[#111C85]">${shopItem.price}</p>
                      <p className="line-through text-[#EC42A2] ">${shopItem.price}</p>
                    </div>

                    <div className="flex gap-1">
                      <FaStar className="text-[#FFC416]" />
                      <FaStar className="text-[#FFC416]" />
                      <FaStar className="text-[#FFC416]" />
                      <FaStar className="text-[#FFC416]" />
                      <FaStar className="text-[#B2B2B2]" />
                    </div>
                  </div>
                  <p  className="text-[#9295AA]">{shopItem.description}</p>
                
                
                
                  <div className=" flex gap-4 items-center  text-[#151875]  "> 
                              <Link href={`/${shopItem._id}`} ><div className="h-[25px] w-[25px]"> <CiShoppingCart/> </div></Link>
                              <div  className="h-[25px] w-[25px] "><CiHeart className="hover:text-red-700" onClick={()=> WishList(shopItem)}/> </div>
                              <div  className="h-[25px] w-[25px] "> <FaSearchPlus/></div>
                              
                           </div>

                </div>
              </div>
            </div>
          ))} </> : <>
          
          
          
         
            <div className="flex  sm:flex-row  flex-col gap-5 w-full" >
              <div className="h-[217px] w-full sm:w-[30%]">
              <Skeleton className="h-[217px] w-[100%] " />
              </div>
              <div className="grid items-center w-full sm:w-[70%]  py-9">
                <div className=" grid  gap-4  ">
                   <Skeleton  className="h-4  w-full" />
                   <Skeleton  className="h-4  w-full" />
                   <Skeleton  className="h-4  w-full" />
                   <Skeleton  className="h-4  w-full" />

                </div>
              </div>
            </div>
            <div className="flex  sm:flex-row  flex-col gap-5 w-full mt-3" >
              <div className="h-[217px] w-full sm:w-[30%]">
              <Skeleton className="h-[217px] w-[100%] " />
              </div>
              <div className="grid items-center w-full sm:w-[70%]  py-9">
                <div className=" grid  gap-4  ">
                   <Skeleton  className="h-4  w-full" />
                   <Skeleton  className="h-4  w-full" />
                   <Skeleton  className="h-4  w-full" />
                   <Skeleton  className="h-4  w-full" />

                </div>
              </div>
            </div>
         
          
          
          </>}
        
        </div>
      </section>
       
       
       </> : 
       
       <div className="lg:mx-[170px] mx-[20px] sm:mx-[30px] screen4:mx-[25px] my-24 ">
       
       
       
       <div className="w-full grid  sm:grid-cols-3 md:grid-cols-4 gap-3 items-center   ">
       {filteredProducts.map((shopItem : Product)  => (
       <div
                    key={shopItem._id}
                    className="w-full h-auto group grid  my-2 "
                  >
                    <div className="h-[250px] w-full  relative bg-[#EBF4F3] flex justify-center items-center">
                      <Image
                        src={shopItem.image}
                        height={280}
                        width={270}
                        className="h-full w-full"
                        alt={shopItem.name}
                      />

                      <div className="group-hover:grid gap-2 hidden  text-[#151875]  absolute bottom-4  left-2">
                        <div className="h-[25px] w-[25px] bg-white flex justify-center items-center rounded-full">
                          {" "}
                          <Link href={`/${shopItem._id}`}>
                            <CiShoppingCart />
                          </Link>{" "}
                        </div>
                        <div className="h-[25px] w-[25px] bg-white flex justify-center items-center rounded-full">
                          {" "}
                          <FaSearchPlus />
                        </div>
                        <div className="h-[25px] w-[25px] bg-white flex justify-center items-center rounded-full">
                          <CiHeart className="hover:text-red-700" onClick={()=> WishList(shopItem)} />{" "}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3   h-auto">
                    <Link href={`/${shopItem._id}`}>
                      <h1 className="text-[#151875] font-bold text-[16px] text-center">
                        {shopItem.name}
                      </h1>
                      </Link>
                      <div className="flex gap-2 justify-center items-center mt-1">
                        <div className="h-[10px] w-[10px] rounded-full  bg-[#DE9034]"></div>
                        <div className="h-[10px] w-[10px]  rounded-full  bg-[#EC42A2]"></div>
                        <div className="h-[10px] w-[10px]   rounded-full bg-[#8568FF]"></div>
                      </div>
                      <div className="flex gap-2 justify-center items-center mt-1">
                        <p className="text-[#151875]">${shopItem.price}</p>{" "}
                        <p className="line-through text-[#FB2E86]">
                          ${shopItem.price}
                        </p>{" "}
                      </div>
                    </div>
                  </div>
       ))}
       
       
       </div>
       
       </div>}

      <div className="h-[93px] sm:mx-[170px] mx-[30px]  mt-11 mb-14">
               <Image src={'/images/tags/tags.png'}  height={93} width={400} alt="tag" className="h-[93px] w-full"/>
          </div>
    </main>
  );
}

export default Shop;
