"use client"
import React, { useEffect, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import { FaPenFancy, FaRegCalendarAlt } from "react-icons/fa";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { format } from "date-fns";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

async function fetchBlogs() {
  try {
    const res = await client.fetch(
      `*[_type == "blog"][0...3]{
        _id,
        blogtitle,
        description,
        slug {
          current
        },
        publishDate,
        "blogimage": blogimage.asset->url,
        blogpoint[] {
          title,
          description
        }
      }`,
      {
        'Cache-Control': 'no-store',
      }
    );
    return res;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return []; // Return an empty array in case of an error
  }
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const getBlogs = async () => {
      const fetchedBlogs = await fetchBlogs();
      setBlogs(fetchedBlogs);
    };
    
    getBlogs();
  }, []);

  if (blogs.length === 0) {
    return <div>Loading blogs...</div>; // Show loading message or fallback UI
  }

  return (
    <main className="lg:mx-[100px] mx-[20px] overflow-hidden mb-20">
      <h1 className={`${josefinSans.className} font-bold text-[32px] text-center`}>
        Latest Blog
      </h1>

      <div className="w-full gap-5 grid justify-center sm:grid-cols-2 lg:grid-cols-3 mt-10">
        {blogs.map((blog: any) => (
          <div
            key={blog._id}
            className="w-full max-w-[370px] h-auto shadow-md rounded-md overflow-hidden"
          >
            {/* Blog Image */}
            <div className="w-full h-[240px]">
              <Image
                src={blog.blogimage}
                height={240}
                width={370}
                alt="blogPick"
                className="h-full w-full "
              />
            </div>

            {/* Blog Content */}
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <FaPenFancy className="text-[#FB2E86]" />
                  <p>Surfauxion</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegCalendarAlt className="text-[#FFA454]" />
                  <p className="text-[12px]">
                    {format(new Date(blog.publishDate), "MMM dd yyyy")}
                  </p>
                </div>
              </div>
              <h3 className="text-[#FB2E86] text-[20px] font-bold mt-2 line-clamp-2">
                {blog.blogtitle}
              </h3>
              <p className="text-[#72718F] line-clamp-2 mt-4 text-[14px] leading-6">
                {blog.description}
              </p>
              <p className="text-[16px] mt-4 text-[#FB2E86] underline underline-offset-4">
                <Link href={`/blog/${blog.slug.current}`}>Read More</Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}