
"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import { client } from "@/sanity/lib/client";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface Offer {
  _id: string;
  title: string;
  offertitle: string;
  description: string;
  image: string;
}

async function getData() {
  const res = await client.fetch(
    `*[_type == "shopexOffer"]{
       _id,
    title,
     offertitle,
      description,
      "image" : image.asset -> url
  }`
  );
  return res;
}

const ShopexOffer = () => {
  const [data, setData] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const offers = await getData();
      setData(offers);
    };
    fetchData();
  }, []);

  return (
    <main>
      <h1
        className={`md:text-[42px] text-[20px] text-[#151875] font-bold ${josefinSans.className} text-center my-12`}
      >
        {data.length > 0 && data[0].offertitle}
      </h1>
      <section className="grid grid-cols-1 px-4 lg:px-0 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  justify-center gap-4">
        {data.map((offer) => {
          return (
            <div
              key={offer._id}
              className="h-auto w-full flex justify-center items-center flex-col shadow-md shadow-[#EEEFFB] bg-[#ffffff] gap-3"
            >
              <Image
                src={offer.image}
                width={65}
                height={65}
                alt="product-image"
                className="h-[65px] w-[65px] mt-4"
              />
              <h1 className="text-[#151875] font-bold">{offer.title}</h1>
              <p className="px-4 text-center text-[#8A8FB9] mb-4">
                {offer.description}
              </p>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default ShopexOffer;



// import Image from "next/image";
// import React from "react";
// import { Josefin_Sans } from "next/font/google";
// import { client } from "@/sanity/lib/client";

// const josefinSans = Josefin_Sans({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });


// interface Offer{
//   _id : string
//   title : string
//    offertitle : string
//     description : string
//     image : string
// }

//  async function getData() {
//     const res = await client.fetch(`*[_type == "shopexOffer"]{
//        _id,
//     title,
//      offertitle,
//       description,
//       "image" : image.asset -> url
//   }`); 
//       return res
//     }
// async function ShopexOffer() {

//   const data : Offer[]= await getData()
//   return (
//     <main>
//       <h1
//         className={`md:text-[42px] text-[20px] text-[#151875] font-bold ${josefinSans.className} text-center my-12`}
//       >
        

//         {data[0]. offertitle}
//       </h1>
//       <section className="grid grid-cols-1 px-4 lg:px-0 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  justify-center gap-4  ">
//         {data.map((offer) => {
//           return (
//             <div
//               key={offer._id}
//               className="h-auto   w-full   flex justify-center items-center flex-col shadow-md shadow-[#EEEFFB]  bg-[#ffffff] gap-3"
//             >
//               <Image
//                 src={offer.image}
//                 width={65}
//                 height={65}
//                 alt="product-image"
//                 className="h-[65px] w-[65px] mt-4"
//               />

//               <h1 className="text-[#151875]  font-bold">{offer.title}</h1>
//               <p className="px-4 text-center text-[#8A8FB9] mb-4">
//                 {offer.description}
//               </p>
//             </div>
//           );
//         })}
//       </section>
//     </main>
//   );
// }

// export default ShopexOffer;
