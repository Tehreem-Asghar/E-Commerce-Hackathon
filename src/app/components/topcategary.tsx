"use client";
import React, { useContext, useEffect, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { searchContext } from "../conntext";
import { Skeleton } from "@/components/ui/skeleton";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface TopCategary {
  price: string;
  name: string;
  discountPercentage: number;
  description: string;
  image: string;
  _id: string;
}

export default function TopCategary() {
  const [topCategary, setTopCategary] = useState<TopCategary[]>([]);
  const searchQuery = useContext(searchContext);

  useEffect(() => {
    async function getData() {
      const res =
        await client.fetch(`*[_type == "product" && "topCategory" in tags]{
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
      setTopCategary(res);
    }

    getData();
  }, []);

  // Filter products based on search query
  const filteredProducts = topCategary.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.search.toLowerCase())
  );

  return (
    <main className="mt-24  w-full">
      {filteredProducts.length !== 0 ? (
        <>
          <div className="lg:mx-[170px] sm:mx-[30px]">
            <h1
              className={`text-[#151875] text-[34px] text-center font-bold mb-6    ${josefinSans.className}`}
            >
              Top Categories
            </h1>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 px-5 sm:px-0  mb-16  justify-center gap-4  ">
              {filteredProducts.map((product: TopCategary) => {
                return (
                  <div
                    key={product._id}
                    className="h-auto group w-full flex flex-col justify-center items-center  shadow-md "
                  >
                    <div className="lg:h-[230px]  lg:w-[230px]   w-[200px]  h-[200px] rounded-full   hover:border-l-[1px] hover:border-b-[5px] hover:border-l-purple-800 hover:border-b-purple-800   lg:mx-0  relative  flex  gap-5 flex-col justify-center items-center  lg:bg-inherit bg-[#F6F7FB]">
                      <Image
                        src={product.image}
                        width={216}
                        height={151}
                        alt="product-image"
                        className="lg:h-[211px] lg:w-[170px] h-[180px] w-[110px]"
                      />
                      <Button
                        asChild
                        className="h-[29px] w-[94px] hidden  absolute bottom-3 hover:bg-[#08D15F]  bg-[#08D15F] p-1 text-[12px] text-white group-hover:flex justify-center items-center"
                      >
                        <Link href={`/${product._id}`}>View Details</Link>
                      </Button>
                    </div>
                    <div className="flex  w-[100%] flex-col justify-center items-center gap-3 mt-3  text-[#151875]  ">
                      <h2 className="font-bold  text-center line-clamp-1">
                        {product.name}
                      </h2>
                      <div className="flex mb-4 gap-3">
                        <p>${product.price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        </>
      ) : (
        <>
          <div className="lg:mx-[170px] sm:mx-[30px]">
            <h1
              className={`text-[#151875] text-[34px] text-center font-bold mb-6    ${josefinSans.className}`}
            >
              <Skeleton className="h-4 w-[250px]  mt-16 mb-8 bg-gray-400 " />
            </h1>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 px-5 sm:px-0  mb-16  justify-center gap-4  ">
              {Array.from({ length: 4 }).map((product: any, index) => {
                return (
                  <div
                    key={index}
                    className="h-auto  w-full flex flex-col justify-center items-center  shadow-md "
                  >
                    <div className="lg:h-[230px]  lg:w-[230px]   w-[200px]  h-[200px] rounded-full    lg:mx-0  relative  flex  gap-5 flex-col justify-center items-center  lg:bg-inherit bg-[#F6F7FB]">
                      <Skeleton className="lg:h-[211px] lg:w-[170px] h-[180px] w-[110px] " />
                    </div>

                    <Skeleton className="h-4 w-[230px] mt-3 bg-gray-400 " />

                    <Skeleton className="h-4 w-[230px]  mt-3 bg-gray-400 " />
                  </div>
                );
              })}
            </section>
          </div>
        </>
      )}
    </main>
  );
}
