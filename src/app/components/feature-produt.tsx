"use client";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { FaSearchPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});
import { client } from "../../sanity/lib/client";
import { useContext, useEffect, useState } from "react";
import { searchContext } from "../conntext";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface Product {
  price: string;
  name: string;
  discountPercentage: number;
  description: string;
  image: string;
  _id: string;
  isFeaturedProduct : boolean;
 stockLevel : number;
 category : string;
 tags : string[]
}











function FeatureProdut() {
  const [products, setProducts] = useState<Product[]>([]);
  const searchQuery = useContext(searchContext);
  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.search.toLowerCase())
  );

  useEffect(() => {
    async function getData() {
      const res =
        await client.fetch(`*[_type == "product" && "featured" in tags]{
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

  // Custom Button Component for the action
  const ViewCartButton = () => (
    <Link href={"/wishlist"}>
      {" "}
      <button className="bg-[#FB2E86] text-white   w-[90px] py-2 px-4 rounded ">
        WishList
      </button>
    </Link>
  );

  const WishList = (Wishlist: Product) => {
    if (Wishlist) {
      const wishListItems = localStorage.getItem("wishlist");

      const wishlist: Product[] = wishListItems
        ? JSON.parse(wishListItems)
        : [];

      wishlist.push(Wishlist);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      toast("🎉 Item successfully added to your Wishlist!", {
        description:
          "You can continue shopping or proceed to view your wishlist by clicking below.",
        action: <ViewCartButton />,
        duration: 4000,
      });
    }
  };

  return (
    <main className="mx-4 lg:mx-0">
      {filteredProducts.length !== 0 ? (
        <>
          <h1
            className={`sm:text-[42px]  text-[27px] mt-16 mb-8 font-bold text-[#151875] ${josefinSans.className} text-center`}
          >
            Featured Products{" "}
          </h1>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  justify-center gap-4  ">
            {filteredProducts.map((product: Product) => {
              return (
                <div
                  key={product._id}
                  className="h-auto  w-full group  shadow-md "
                >
                  <div className="h-[270px]  w-[100%]   lg:mx-0  relative  flex  gap-5 flex-col justify-center items-center bg-[#F6F7FB]">
                    <Image
                      src={product.image}
                      width={216}
                      height={151}
                      alt="product-image"
                      className="h-[216px] w-[151]"
                    />
                    <div className="group-hover:flex items-center gap-4 absolute hidden top-2 left-2">
                      <Link href={`/${product._id}`}>
                        {" "}
                        <LuShoppingCart className="text-[#00009D]  text-[20px] " />
                      </Link>
                      <FaRegHeart
                        className="text-[#1DB4E7]  "
                        onClick={() => WishList(product)}
                      />
                      <FaSearchPlus className="text-[#1DB4E7]" />
                    </div>
                    <Button className="h-[29px] w-[94px] hidden  hover:bg-[#08D15F]  bg-[#08D15F] p-1 text-[12px] text-white group-hover:flex justify-center items-center">
                      <Link href={`/${product._id}`}>View Details</Link>
                    </Button>
                  </div>
                  <div className="flex  w-[100%] flex-col justify-center items-center gap-3 mt-3    group-hover:bg-[#2F1AC4] ">
                    <h3 className="text-[#FB2E86] group-hover:text-white text-[18px] font-bold text-center">
                      {product.name}
                    </h3>
                    <div className="flex gap-2">
                      <div className="h-[4px] w-[14px] bg-[#05E6B7] rounded-md"></div>
                      <div className="h-[4px] w-[14px] bg-[#F701A8] rounded-md"></div>
                      <div className="h-[4px] w-[14px] bg-[#00009D] rounded-md"></div>
                    </div>
                    <p className="text-[#151875]  group-hover:text-white">
                      Code - Y523201
                      {/* {`  Code - ${product.code}`} */}
                    </p>

                    <p className="text-[#151875] group-hover:text-white pb-4">
                      ${product.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </section>

          <div className="flex gap-2 my-[80px] justify-center items-center">
            <div className="h-[4px] w-[20px] bg-[#FB2E86] rounded-md"></div>
            <div className="h-[4px] w-[14px] bg-[#FEBAD7] rounded-md"></div>
            <div className="h-[4px] w-[14px] bg-[#FEBAD7] rounded-md"></div>
            <div className="h-[4px] w-[14px] bg-[#FEBAD7] rounded-md"></div>
          </div>
        </>
      ) : (
        <>
          <Skeleton className="h-4 w-[250px]  mt-16 mb-8 bg-gray-400 " />

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  justify-center gap-4  ">
            {Array.from({ length: 4 }).map((product: any, index) => {
              return (
                <div key={index} className="h-auto  w-full  shadow-md  pb-3">
                  <div className="h-[270px]  w-[100%]   lg:mx-0  relative  flex  gap-5 flex-col justify-center items-center bg-gray-300">
                    <Skeleton className="h-[216px] w-[151] bg-gray-400" />
                  </div>
                  <div className="flex  w-[100%] flex-col justify-center items-center gap-3 mt-3    ">
                    <Skeleton className="h-4 w-[250px]  bg-gray-400" />

                    <div className="flex gap-2">
                      <Skeleton className="h-4 w-[250px]  bg-gray-400" />
                    </div>

                    <Skeleton className="h-4 w-[250px]  bg-gray-400" />

                    <Skeleton className="h-4 w-[250px] bg-gray-400" />
                  </div>
                </div>
              );
            })}
          </section>

          <div className="flex gap-2 my-[80px] justify-center items-center">
            <Skeleton className="h-[4px] w-[20px]  rounded-md bg-gray-400 " />
            <Skeleton className="h-[4px] w-[20px]  rounded-md  bg-gray-400" />
            <Skeleton className="h-[4px] w-[20px]  rounded-md bg-gray-400" />
            <Skeleton className="h-[4px] w-[20px]  rounded-md bg-gray-400" />
          </div>
        </>
      )}
    </main>
  );
}

export default FeatureProdut;
