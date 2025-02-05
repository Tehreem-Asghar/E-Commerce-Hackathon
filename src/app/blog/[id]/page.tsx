import React from "react";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import { FaFacebook, FaPenFancy } from "react-icons/fa6";
import { FaInstagramSquare, FaRegCalendarAlt } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { client } from "@/sanity/lib/client";
import { format } from "date-fns";
import Vlogs from "@/app/components/blogdetail";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// export const revalidate = 120;

async function blog() {
  const res = await client.fetch(
    `*[_type == "blog"]{
    _id,
    blogtitle,
     slug {
    current
  },
    description,
    "blogimage": blogimage.asset->url,
    blogpoint[]{
      title,
      description
    },
     publishDate,
  }`,
    {
      "Cache-Control": "no-store", // No cache
    }
  );

  return res;
}


async function recentblog() {
  const res = await client.fetch(
    `*[_type == "recentblog"]{
  _id,
  blogtitle,
  slug {
    current
  },
  description,
  publishDate,
  "blogimage": blogimage.asset->url,
  blogpoint[]{
    title,
    description
  }
}
`
  );

  return res;
}

async function saleProduct() {
  const res = await client.fetch(
    `*[_type == "saleProduct"]{
  _id,
  blogtitle,
  slug {
    current
  },
  description,
  publishDate,
  "blogimage": blogimage.asset->url,
  blogpoint[]{
    title,
    description
  }
}
`
  );

  return res;
}

async function dynamicBlogs({ params }: { params: { id: string } }) {
  const { id } = params;
  const res = await blog();
  // const offerPro = await offerProduct();
  const recentPro = await recentblog();
  const salePro = await saleProduct();
  const allblog = res.concat(recentPro, salePro);

  const filteredBlog = allblog.find((blog: any) => blog.slug.current === id);

  if (!filteredBlog) {
    return <div>Blog not found</div>;
  }

  return (
    <main className="max-w-[1920px] mx-auto">
      <section className="h-[286px] w-full bg-[#F6F5FF] grid items-center ">
        <div className="sm:mx-[170px] mx-[30px] overflow-hidden text-center sm:text-left">
          <h2
            className={`${josefinSans.className} text-[25px] sm:text-[36px] text-[#101750] font-bold`}
          >
            Blog Page
          </h2>
          <span className="flex sm:justify-start justify-center font-medium">
            <p>Home.Pages</p>
            <p className="text-[#FB2E86]">.Blog Page</p>
          </span>
        </div>
      </section>

      <section className="lg:mx-[170px] mx-[20px] sm:mx-[30px] screen4:mx-[25px] my-24 flex  ">
        <div className="w-full flex ">
          <div className="w-[70%] screen:w-[100%] ">
            <div className="my-6">
              <Image
                src={filteredBlog.blogimage}
                height={453}
                width={600}
                alt={"blog"}
                className="w-full h-[250px]  sm:h-[400px]"
              />
              <div
                className="flex gap-4 items-center pt-3
                  mb-4  px-4"
              >
                <div className="flex items-center gap-2">
                  <FaPenFancy className="text-[#FB2E86]" />
                  <p>Surfauxion</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegCalendarAlt className="text-[#FFA454]" />
                  <p className="text-[12px]">
                    {format(new Date(filteredBlog.publishDate), "MMM dd yyyy")}
                  </p>
                </div>
              </div>
              <h1
                className={`${josefinSans.className} px-4 text-[19px] text-[#101750] font-bold`}
              >
                {filteredBlog.blogtitle}
              </h1>

              <p className="text-[#72718F] mt-4  px-4 text-[14px] leading-6">
                {filteredBlog.description}{" "}
              </p>

              {filteredBlog.blogpoint.map(
                (list: { title: string; description: string }, index: any) => {
                  return (
                    <div
                      key={index}
                      className="my-7   hover:border-l-4 hover:border-l-[#FB2E86]  px-4 "
                    >
                      <h2
                        className={`${josefinSans.className}  text-[19px] text-[#151875] font-bold`}
                      >
                        {list.title}
                      </h2>
                      <p className="text-[#72718F] mt-1 text-[14px] leading-6">
                        {list.description}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
            <div className="mt-12 flex items-center justify-center   gap-2">
              <FaFacebook className="text-blue-800  h-[40px]  w-[35px]  " />
              <FaInstagramSquare className="text-pink-700    h-[35px]  w-[40px]  " />
              <AiFillTwitterCircle className="text-blue-400    h-[40px]  w-[40px]  " />
            </div>
          </div>

          {/* /--------------------------------------------------- */}
          <Vlogs />
        </div>
      </section>

      <div className="lg:mx-[170px] mx-[20px] sm:mx-[30px] screen4:mx-[25px]">
        <form className="mt-9 grid gap-7 w-[70%] screen:w-[100%]     ">
          <div className="flex  sm:flex-row flex-col  gap-3 text-[#8A8FB9]">
            <input
              type="text"
              placeholder="Your Name*"
              className="border  border-[#A4B6C8B2] w-full  p-5 h-[45px]"
            />
            <input
              type="emailn"
              placeholder="Write Your Email*"
              className="border border-[#A4B6C8B2] w-full p-5 h-[45px]"
            />
          </div>

          <div>
            <textarea
              placeholder="Write your comment*"
              className="h-[166px] text-[#8A8FB9] w-full p-5  border  border-[#A4B6C8B2]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#FB2E86] text-white h-[44px] w-full"
          >
            {" "}
            Continue Shipping
          </button>
        </form>
      </div>

      <div className="h-[93px] sm:mx-[170px] mx-[30px]  mt-28 mb-8">
        <Image
          src={"/images/tags/tags.png"}
          height={93}
          width={400}
          alt="tag"
          className="h-[93px] w-full  "
        />
      </div>
    </main>
  );
}

export default dynamicBlogs;
