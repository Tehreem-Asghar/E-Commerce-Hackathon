import React from "react";
import { Josefin_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Faq() {
  return (
    <main className="max-w-[1920px] mx-auto">
      <section className="h-[286px] w-full bg-[#F6F5FF] grid items-center">
        <div className="sm:mx-[170px] mx-[30px] overflow-hidden text-center sm:text-left">
          <h2
            className={`${josefinSans.className} text-[25px] sm:text-[36px] text-[#101750] font-bold`}
          >
            FAQ
          </h2>
          <span className="flex sm:justify-start justify-center font-medium">
            <p>Home.Pages</p>
            <p className="text-[#FB2E86]">.Faq</p>
          </span>
        </div>
      </section>

      <section className="md:mx-[170px] mx-[20px]">
        <div className="w-full flex gap-3 lg:flex-row flex-col   my-20">
          <div className=" lg:w-[50%] w-full p-2  sm:p-5">
            <h1 className="text-[20px]  sm:text-[30px] font-bold text-[#1D3178]">
              Generel Information
            </h1>
            <h2 className="text-[16px]  text-[#1D3178] font-medium mt-9">
              Eu dictumst cum at sed euismood condimentum?
            </h2>
            <p className="text-[#A1ABCC] mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt
              sed tristique mollis vitae, consequat gravida sagittis.
            </p>

            <h2 className="text-[16px]  text-[#1D3178] font-medium mt-9">
              Magna bibendum est fermentum eros.
            </h2>
            <p className="text-[#A1ABCC] mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt
              sed tristique mollis vitae, consequat gravida sagittis.
            </p>
            <h2 className="text-[16px]  text-[#1D3178] font-medium mt-9">
              Elit id blandit sabara boi velit gua mara?
            </h2>
            <p className="text-[#A1ABCC] mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt
              sed tristique mollis vitae, consequat gravida sagittis.
            </p>
          </div>
          <div className="lg:w-[50%]  w-full text-[#CDCEDC] p-2 sm:p-5">
            <h1
              className={`sm:text-[30px]  text-[20px] font-bold  ${josefinSans.className} text-[#1D3178]`}
            >
              Ask a Question
            </h1>
            <div className="grid gap-10 mt-9 sm:mt-14 md:p-7">
              <input
                type="text"
                placeholder="Your Name*"
                required
                className="w-full h-[50px] p-2 border border-[#C2C5E1]  text-[#8990B1]"
              />
              <input
                type="text"
                placeholder="Subject*"
                required
                className="w-full h-[50px] p-2 border border-[#C2C5E1]  text-[#8990B1]"
              />
              <textarea
                placeholder="Type Your Message"
                required
                className="w-full h-[197px] p-2 border border-[#C2C5E1]  text-[#8990B1]"
              />
              <Button className="text-white  text-center bg-[#FB2E86] hover:bg-[#FB2E86]  h-[44px] w-[165px]">
                Send Mail
              </Button>
            </div>
          </div>



          
        </div>
        <div className="h-[93px] md:mx-[170px] mx-[20px]  mb-4">
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
