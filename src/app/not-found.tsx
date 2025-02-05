import React from "react";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function notfound() {
  return (
    <main className="max-w-[1920px] mx-auto">
      <section className="h-[286px] w-full bg-[#F6F5FF] grid items-center ">
        <div className="sm:mx-[170px] mx-[30px] overflow-hidden text-center sm:text-left">
          <h2
            className={`${josefinSans.className} text-[25px] sm:text-[36px] text-[#101750] font-bold`}
          >
            404 Not Found
          </h2>
          <span className="flex sm:justify-start justify-center font-medium">
            <p>Home.Pages</p>
            <p className="text-[#FB2E86]">.404 Not Found</p>
          </span>
        </div>
      </section>
      <section className="sm:mx-[170px] mx-[30px] overflow-hidden grid justify-center items-center">
        <div className="my-28 ">
          <div className="flex justify-center items-center">
          <Image
            src={"/images/notfound.png"}
            height={822}
            width={500}
            alt="notfound"
          />
        </div>
          <h1 className="text-[#152970] font-bold mt-3 text-[20px] text-center">
            {" "}
            oops! The page you requested was not found!
          </h1>
          <div className="w-full h-[44px] flex justify-center items-center">
            <Button
              asChild
              className="text-white  text-center bg-[#FB2E86] hover:bg-[#FB2E86] mt-28 h-[44px] w-[165px]"
            >
              <Link href={"/"}> Back To Home</Link>
            </Button>
          </div>
        </div>

        <div className="h-[93px] sm:mx-[170px] mx-[30px]  mb-4">
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

export default notfound;
