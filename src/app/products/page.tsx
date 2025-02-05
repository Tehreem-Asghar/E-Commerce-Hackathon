"use client";

import React, { useContext, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { FaSearchPlus } from "react-icons/fa";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { searchContext } from "../conntext";
import { PiCirclesFourFill } from "react-icons/pi";
import { TfiMenuAlt } from "react-icons/tfi";
import { Josefin_Sans } from "next/font/google";
import { Skeleton } from "@/components/ui/skeleton";
import { FaStar } from "react-icons/fa6";
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

export default function Shop() {
  const searchQuery = useContext(searchContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [isOpen, setisOpen] = useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const res = await client.fetch(`*[_type == "product" && "product" in tags]{
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
    };
    fetchProducts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name

      .toLowerCase()
      .includes(searchQuery.search.toLowerCase() || search.toLowerCase())
  );



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
              <PiCirclesFourFill
                onClick={() => setisOpen(true)}
                className="text-[#3F509E]"
              />
              <TfiMenuAlt
                className="text-[#3F509E]"
                onClick={() => setisOpen(false)}
              />
            </div>

            <input
              type="text"
              className="h-[25px] w-[100px] border border-[#E7E6EF]  sm:block  hidden"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="my-5 w-full">
          {isOpen ? (
            <>
              <div className="w-full grid  sm:grid-cols-3 md:grid-cols-4 gap-3 items-center ">
                {filteredProducts.length !== 0 ? (
                  <>
                    {filteredProducts.map((product: Product) => (
                      <div
                        key={product._id}
                        className="w-full h-auto group grid  my-2 "
                      >
                        <div className="h-[250px] w-full  relative bg-[#EBF4F3] flex justify-center items-center">
                          <Image
                            src={product.image}
                            height={280}
                            width={270}
                            className="h-[169px] w-[169px]"
                            alt={product.name}
                          />

                          <div className="group-hover:grid gap-2 hidden  text-[#151875]  absolute bottom-4  left-2">
                            <div className="h-[25px] w-[25px] bg-white flex justify-center items-center rounded-full">
                              {" "}
                              <Link href={`/${product._id}`}>
                                <CiShoppingCart />
                              </Link>{" "}
                            </div>
                            <div className="h-[25px] w-[25px] bg-white flex justify-center items-center rounded-full">
                              {" "}
                              <FaSearchPlus />
                            </div>
                            <div className="h-[25px] w-[25px] bg-white flex justify-center items-center rounded-full">
                              <CiHeart className="hover:text-red-700" onClick={()=> WishList(product)}/>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3   h-auto">
                          <Link href={`${product._id}`}>
                            <h1 className="text-[#151875]  line-clamp-1 font-bold text-[16px] text-center">
                              {product.name}
                            </h1>
                          </Link>
                          <div className="flex gap-2 justify-center items-center mt-1">
                            <div className="h-[10px] w-[10px] rounded-full  bg-[#DE9034]"></div>
                            <div className="h-[10px] w-[10px]  rounded-full  bg-[#EC42A2]"></div>
                            <div className="h-[10px] w-[10px]   rounded-full bg-[#8568FF]"></div>
                          </div>
                          <div className="flex gap-2 justify-center items-center mt-1">
                            <p className="text-[#151875]">
                             Rs- {product.price}
                            </p>{" "}
                            <p className=" text-[#FB2E86]">
                              {product.discountPercentage}%
                            </p>{" "}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {Array.from({ length: 8 }).map((product: any, index) => (
                      <div
                        key={index}
                        className="w-full h-auto group grid  my-2 "
                      >
                        <div className="h-[250px] w-full  relative bg-[#EBF4F3] flex justify-center items-center">
                          <Skeleton className="h-[169px] w-[169px] mt-16 mb-8 bg-gray-200 " />
                        </div>

                        <div className="   h-auto">
                          <Skeleton className="h-4 w-[250px]  mt-16 mb-8 bg-gray-400 " />

                          <div className="flex gap-2 justify-center items-center mt-1">
                            {" "}
                            <Skeleton className="h-[10px] w-[100px] rounded-full bg-gray-400 " />{" "}
                            <Skeleton className="h-[10px] w-[100px] rounded-full bg-gray-400 " />{" "}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <section className=" mt-11">
                <div>
                  {filteredProducts.length !== 0 ? (
                    <>
                      {" "}
                      {filteredProducts.map((product: Product) => (
                       
                        <div
                          className="flex  sm:flex-row   flex-col gap-5 w-full"
                          key={product.name}
                        >
                          <div className="h-[217px] w-full     sm:w-[30%]">
                            <Image
                              src={product.image}
                              alt={product.name}
                              height={217}
                              width={313}
                              // className="h-[217px] w-full sm:w-[313px]"
                              className="h-[217px] w-[100%]  "
                            />
                          </div>
                          <div className="grid items-center w-full sm:w-[70%]  py-9">
                            <div className=" grid  gap-4  ">
                              <div className="w-auto flex items-center  gap-4">
                                
                                  <h1 className="text-[#111C85]  line-clamp-1 text-[18px] font-bold">
                                    {product.name}
                                  </h1>
                                
                                <div className="flex gap-1 justify-center items-center">
                                  <div className="h-[10px] w-[10px] rounded-full bg-[#DE9034]"></div>
                                  <div className="h-[10px] w-[10px] rounded-full bg-[#EC42A2]"></div>
                                  <div className="h-[10px] w-[10px] rounded-full bg-[#8568FF]"></div>
                                </div>
                              </div>

                              <div className=" flex    items-center gap-6">
                                <div className="flex gap-2">
                                  <p className="text-[#111C85]">
                                    {product.price}
                                  </p>
                                  <p className="  text-[#EC42A2] ">
                                    {product.discountPercentage}%
                                  </p>
                                </div>

                                <div className="flex gap-1">
                                  <FaStar className="text-[#FFC416]" />
                                  <FaStar className="text-[#FFC416]" />
                                  <FaStar className="text-[#FFC416]" />
                                  <FaStar className="text-[#FFC416]" />
                                  <FaStar className="text-[#B2B2B2]" />
                                </div>
                              </div>
                              <Link href={`${product._id}`}>
                            
                                <p className="text-[#9295AA] line-clamp-2">
                                  {product.description}
                                </p>
                              </Link>

                              <div className=" flex gap-4 items-center  text-[#151875]  ">
                                <Link href={`/${product._id}`}>
                                  <div className="h-[25px] w-[25px]">
                                    {" "}
                                    <CiShoppingCart />{" "}
                                  </div>
                                </Link>
                                <div className="h-[25px] w-[25px] ">
                                  <CiHeart   className="hover:text-red-600" onClick={()=> WishList(product)}/>{" "}
                                </div>
                                <div className="h-[25px] w-[25px] ">
                                  {" "}
                                  <FaSearchPlus />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}{" "}
                    </>
                  ) : (
                    <>
                      <div className="flex  sm:flex-row  flex-col gap-5 w-full">
                        <div className="h-[217px] w-full sm:w-[30%]">
                          <Skeleton className="h-[217px] w-[100%] " />
                        </div>
                        <div className="grid items-center w-full sm:w-[70%]  py-9">
                          <div className=" grid  gap-4  ">
                            <Skeleton className="h-4  w-full" />
                            <Skeleton className="h-4  w-full" />
                            <Skeleton className="h-4  w-full" />
                            <Skeleton className="h-4  w-full" />
                          </div>
                        </div>
                      </div>
                      <div className="flex  sm:flex-row  flex-col gap-5 w-full mt-3">
                        <div className="h-[217px] w-full sm:w-[30%]">
                          <Skeleton className="h-[217px] w-[100%] " />
                        </div>
                        <div className="grid items-center w-full sm:w-[70%]  py-9">
                          <div className=" grid  gap-4  ">
                            <Skeleton className="h-4  w-full" />
                            <Skeleton className="h-4  w-full" />
                            <Skeleton className="h-4  w-full" />
                            <Skeleton className="h-4  w-full" />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </section>
            </>
          )}



        </div>

        <div className="h-[93px] sm:mx-[170px] mx-[30px]  mt-28 mb-4">
          <Image
            src={"/images/tags/tags.png"}
            height={93}
            width={400}
            alt="tag"
            className="h-[93px] w-full"
          />
        </div>
      </section>
    </main>
  );
}
