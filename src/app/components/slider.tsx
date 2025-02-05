"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { Josefin_Sans } from "next/font/google";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface Product {
  _id: string;
  toptitle: string;
  secondtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageOne: string;
  imageTwo: string;
}

export default function Sliding() {
  const [heroData, setHeroData] = useState<Product[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await client.fetch(`*[_type == "herosection"]{
        _id,
        toptitle,
        secondtitle,
        description,
        buttonText,
        buttonLink,
        "imageOne": imageOne.asset->url,
        "imageTwo": imageTwo.asset->url
      }`);
      setHeroData(res);
      console.log(res);
    }

    getData();
  }, []);

  if (heroData.length === 0) {
    return (

<div>
<div className="flex justify-around bg-[#F2F0FF] h-[500px] sm:h-[500px]">
  <div className="h-[150px] w-[200px] md:block hidden ml-4">
   
    <Skeleton className="h-[150px] w-[200px]" />
  </div>
  <div className="w-[500px] lg:w-[644px] h-auto flex flex-col gap-8 pl-5 lg:pl-0 lg:gap-4 py-7 mt-20">
  <Skeleton className="h-[100px] sm:w-[400px] w-[250px]" />
  <Skeleton className="h-[100px] sm:w-[400px] w-[250px]" />
  <Skeleton className="h-[100px] sm:w-[400px] w-[250px]" />
  <Skeleton className="h-[100px] sm:w-[400px] w-[250px]" />
  </div>
  <div className="sm:flex justify-center hidden items-center">
  
     <Skeleton className="lg:h-[400px] lg:w-[400px] sm:h-[300px] sm:w-[300px]" />
  </div>
</div>
</div>
    
    );
  }

  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper h-[500px] sm:h-[500px] w-full">
        {heroData.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="flex justify-around bg-[#F2F0FF] h-[500px] sm:h-[500px]">
              <div className="h-[150px] w-[200px] md:block hidden ml-4">
                <Image
                  src={item.imageOne}
                  width={200}
                  height={150}
                  alt="Hero Image One"
                />
              </div>
              <div className="w-[500px] lg:w-[644px] h-auto flex flex-col gap-8 pl-5 lg:pl-0 lg:gap-4 py-7 mt-20">
                <p className="text-[#FB2E86] text-[16px]">{item.toptitle}</p>
                <h1 className={`${josefinSans.className} lg:text-[35px] text-[25px] font-bold leading-tight `}>
                  {item.secondtitle}
                </h1>
                <p className="text-[#8A8FB9] text-[14px]">{item.description}</p>
                <Link href={item.buttonLink}>
                  <button className="w-[163px] h-[50px] flex justify-center items-center bg-[#FB2E86] text-white">
                    {item.buttonText}
                  </button>
                </Link>
              </div>
              <div className="sm:flex justify-center hidden items-center">
                <Image
                  src={item.imageTwo}
                  height={629}
                  width={629}
                  alt="Hero Image Two"
                  className="lg:h-[400px] lg:w-[400px] sm:h-[300px] sm:w-[300px]"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
                 <SwiperSlide>
           <Image
            height={500}
            width={400}
            src={"/images/slider/pick-3.png"}
            alt="banner"
            className="h-[500px] sm:h-[500px] w-full "
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            height={400}
            width={400}
            src={"/images/slider/pick-4.png"}
            alt="banner"
            className="h-[500px] sm:h-[500px] w-full "
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            height={400}
            width={400}
            src={"/images/slider/pick-5.png"}
            alt="banner"
            className="h-[500px] sm:h-[500px] w-full "
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            height={400}
            width={400}
            src={"/images/slider/pick-6.png"}
            alt="banner"
            className="h-[500px] sm:h-[500px] w-full "
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

