"use client";

import React, { useEffect, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Skeleton } from "@/components/ui/skeleton";

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
  isFeaturedProduct: boolean;
  stockLevel: number;
  category: string;
  tags: string[];
}

// interface DiscountProduct {
//   _id: string;
//   title: string;
//   newPrice: number;
//   oldPrice: number;
//   description: string;
//   image: string;
// }

interface DiscountOffer {
  _id: string;
  discount: string;
  image: string;
}

export default function Trending() {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [discountOffers, setDiscountOffers] = useState<DiscountOffer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const trendingResponse =
        await client.fetch(`*[_type == "product" && "trending" in tags]{
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
      setTrendingProducts(trendingResponse);

      const discountProductResponse =
        await client.fetch(`*[_type == "product" && "discoundTreProduct" in tags]{
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
      setDiscountProducts(discountProductResponse);

      const discountOfferResponse =
        await client.fetch(`*[_type == "discountOffer"]{
        _id,
        discount,
        "image": image.asset->url
      }`);
      setDiscountOffers(discountOfferResponse);
    };

    fetchData();
  }, []);

  return (
    <main className="mt-24 w-full">
      <h1
        className={`text-[#151875] text-[34px] text-center font-bold mb-6 ${josefinSans.className}`}
      >
        Trending Products
      </h1>
      {trendingProducts.length > 0 ? (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 px-4 lg:px-0 mb-16 justify-center gap-4">
            {trendingProducts.map((product) => (
              <div key={product._id} className="h-auto w-full shadow-md">
                <div className="h-[270px] w-[100%] lg:mx-0 relative flex gap-5 flex-col justify-center items-center bg-[#F6F7FB]">
                  <Image
                    src={product.image}
                    width={216}
                    height={151}
                    alt="product-image"
                    className="h-[211px] w-[151]"
                  />
                </div>
                <div className="flex w-[100%] flex-col justify-center items-center gap-3 mt-3 text-[#151875]">
                  <Link href={`/${product._id}`}>
                    <h2 className="font-bold ">{product.name}</h2>
                    <div className="flex gap-3 pb-2">
                      <p>{product.price}</p>
                      {product.discountPercentage > 0 && (
                        <p className="text-gray-500 ">
                          {product.discountPercentage}%
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </section>
        </>
      ) : (
        <>
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
        </>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center gap-4">
        {discountOffers.map((offer, index) => (
          <div
            key={offer._id}
            className="w-full h-auto flex p-3 flex-col justify-center items-center hover:bg-[#EEEFFB] shadow-md"
          >
            <h3 className="text-[#151875] font-bold">{offer.discount}</h3>
            <Link href={"/products"}>
              <p className="text-[#FB2E86] underline underline-offset-4">
                Shop Now
              </p>
            </Link>
            <Image
              src={
                index === 0
                  ? "/images/trending/clock.png"
                  : "/images/trending/table.png"
              }
              height={207}
              width={213}
              alt="image"
              className="self-end"
            />
          </div>
        ))}

        <div className="w-[100%] h-auto flex  p-3 flex-col justify-center items-center  text-[#151875] shadow-md hover:bg-[#EEEFFB] ">
          {discountProducts.map((product: Product) => {
            return (
              <>
                <div className="flex gap-5 mb-5" key={product._id}>
                  <div className="bg-[#EEEFFB]  p-5">
                    <Image
                      src={product.image}
                      height={71}
                      width={64}
                      alt="chair"
                      className="h-[60px] w-[60px] "
                    />
                  </div>
                  <div className="grid justify-center items-center">
                    <Link href={`/${product._id}`}>
                      <p className="line-clamp-1">{product.name} </p>
                      <p className="font-bold  ">${product.price}.00</p>
                    </Link>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </main>
  );
}
