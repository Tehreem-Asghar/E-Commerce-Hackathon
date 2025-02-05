"use client";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import { FaFacebook, FaPenFancy } from "react-icons/fa6";
import { FaInstagramSquare, FaRegCalendarAlt } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { format, setDate } from "date-fns";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});


function Blogs() {
 
  const [data, setdata] = useState([]);
  const [offerPro, setofferPro] = useState([]);
  const [recentblogs, setrecentblogs] = useState([]);
  const [salePro, setsalePro] = useState([]);
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const salepro = salePro.filter((product: any) =>
    product.blogtitle.toLowerCase().includes(search.toLowerCase())
  );

  const recent = recentblogs.filter((product: any) =>
    product.blogtitle.toLowerCase().includes(search.toLowerCase())
  );
 

  useEffect(() => {
    async function Blog() {
      const res = await client.fetch(
        `*[_type == "blog"][3...6]{
    _id,
    blogtitle,
     slug {
      current
    },
     publishDate,
    description,
    "blogimage": blogimage.asset->url,
    blogpoint[]{
      title,
      description
    }
  }`,
        {
          "Cache-Control": "no-store",
        }
      );

      setdata(res);
    }
    Blog();

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

      setrecentblogs(res);
    }
    recentblog();

    async function offerProduct() {
      const res = await client.fetch(
        `*[_type == "product" && "offerProduct" in tags]{
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
}
  `);

      setofferPro(res);
    }
    offerProduct();
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

      setsalePro(res);
    }
    saleProduct();
  }, []);

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
            {data.map((blog: any) => (
              <div className="my-6" key={blog.id}>
                <Image
                  src={blog.blogimage}
                  height={453}
                  width={600}
                  alt={"blog"}
                  className="w-full  h-[400px]"
                />

                <div className="p-5">
                  <div className="flex gap-6 items-center mb-4">
                    <div className="flex items-center gap-3">
                      <FaPenFancy className="text-[#FB2E86]" />
                      <p>Surfauxion</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaRegCalendarAlt className="text-[#FFA454]" />
                      <p className="text-[12px]">
                        {format(new Date(blog.publishDate), "MMM dd yyyy")}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-[#151875] text-[20px] font-bold mt-2">
                    {blog.blogtitle}
                  </h3>
                  <p className="text-[#72718F] mt-4 text-[14px] leading-6">
                    {blog.description}
                  </p>
                  <p className="text-[16px] mt-4 text-[#151875] ">
                    <Link href={`/blog/${blog.slug.current}`}>Read More</Link>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-[30%] screen:hidden px-5  mt-5 py-5  ">
            <h1 className="text-[#151875] font-bold text-[22px]  "> Search</h1>
            <input
              type="text"
              placeholder="Search For Posts"
              className="h-[45px] w-full mt-4 border border-[#BDBDD8] p-2"
              value={search}
              onChange={handleSearchChange}
            />
            <div>
              <h1 className="text-[#151875] font-bold text-[22px] mt-6  ">
                Categories
              </h1>

              <div className="grid grid-cols-2 gap-2 mt-3 ">
                <button   onClick={()=> setSearch('Long-Lasting')} className="hover:text-white  text-[#3F509E] font-semibold hover:bg-[#F939BF] flex justify-center items-center w-[122px] h-[30px]">
                     {/* Hobbies (14) */}
                     Long-Lasting
                </button>
                <button onClick={()=>setSearch('Quality Furniture')}  className="hover:text-white text-[#3F509E] font-semibold  hover:bg-[#F939BF] flex justify-center items-center  w-[130px] h-[30px]">
                  {/* Womain (21) */}
                  Quality Furniture
                </button>
                <button   onClick={()=>setSearch('Office Furniture')} className="hover:text-white text-[#3F509E] font-semibold hover:bg-[#F939BF] flex justify-center items-center w-[122px] h-[30px]">
                  {/* womain (21) */}
                  Office Furniture
                </button>
                <button   onClick={()=> setSearch('Custom-Made Furniture')}  className="hover:text-white  text-[#3F509E]  font-semibold hover:bg-[#F939BF] flex justify-center items-center w-[130px]  h-[30px]">
                  {/* womain (21) */}
                  Custom-Made 
                </button>
                <button   onClick={()=> setSearch('Cozy and Functional')} className="hover:text-white text-[#3F509E] font-semibold hover:bg-[#F939BF] flex justify-center items-center w-[130px] h-[30px]">
                  {/* Womain (21) */}
                  Cozy  Functional
                </button>
                <button onClick={()=> setSearch('Dining Table')} className="hover:text-white  text-[#3F509E] font-semibold hover:bg-[#F939BF] flex justify-center items-center w-[122px] h-[30px]">
                  {/* Womain (21) */}
                  Dining Table
                </button>
              </div>

              <h1 className="text-[#151875] font-bold text-[22px] mt-16">
                Recent Post
              </h1>
              {recent.length !== 0 ? (
                <>
                  {recent.map((blog: any) => {
                    return (
                      <div className="flex gap-3 mt-8 " key={blog._id}>
                        <Image
                          src={blog.blogimage}
                          height={51}
                          width={70}
                          alt="recent post"
                          className="h-[50px] w-[70px] "
                        />
                        <div>
                          <Link href={`/blog/${blog.slug.current}`}>
                            <p className="text-[#3F509E] text-[14px]  line-clamp-2">
                              {blog.blogtitle}
                            </p>
                            <p className="text-[#8A8FB9] text-[11px]">
                              {" "}
                              {format(
                                new Date(blog.publishDate),
                                "MMM dd yyyy"
                              )}
                            </p>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="flex gap-3 mt-8 ">
                    <Skeleton className="h-[50px] w-[70px]" />

                    <div>
                      <Skeleton className="h-4 w-[100px] mt-2" />
                      <Skeleton className="h-4 w-[100px] mt-2" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-8 ">
                    <Skeleton className="h-[50px] w-[70px]" />

                    <div>
                      <Skeleton className="h-4 w-[100px] mt-2" />
                      <Skeleton className="h-4 w-[100px] mt-2" />
                    </div>
                  </div>
                </>
              )}

              <h1 className="text-[#151875] font-bold text-[22px] mt-16">
                Sale Product
              </h1>
              { salepro.length !== 0 ? (
                <>
                  {salepro.map((produc: any) => {
                    return (
                      <div className="flex gap-3 mt-8" key={produc._id}>
                        <Image
                          src={produc.blogimage}
                          height={51}
                          width={70}
                          alt="recent post"
                          className="h-[50px] w-[70px]"
                        />
                        <div>
                          <Link href={`/blog/${produc.slug.current}`}>
                            <p className="text-[#3F509E] text-[14px] line-clamp-2">
                              {produc.blogtitle}
                            </p>
                            <p className="text-[#8A8FB9] text-[11px]">
                              {format(
                                new Date(produc.publishDate),
                                "MMM dd yyyy"
                              )}
                            </p>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                <div className="flex gap-3 mt-8 ">
                    <Skeleton className="h-[50px] w-[70px]" />

                    <div>
                      <Skeleton className="h-4 w-[100px] mt-2" />
                      <Skeleton className="h-4 w-[100px] mt-2" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-8 ">
                    <Skeleton className="h-[50px] w-[70px]" />

                    <div>
                      <Skeleton className="h-4 w-[100px] mt-2" />
                      <Skeleton className="h-4 w-[100px] mt-2" />
                    </div>
                  </div>
                </>
              )}

              <h1 className="text-[#151875] font-semibold text-[22px] mt-14">
                Offer Product
              </h1>

              <div className="mt-12  grid grid-cols-2 gap-2">
                {offerPro.map((pro: any ) => {
                  return (
                    <div className="w-[126px] h-auto" key={pro._id}>
                      <Image
                        src={pro.image}
                        height={80}
                        width={126}
                        alt="offer"
                        className="h-[80px]  w-[126px]"
                      />
                      <Link href={`/${pro._id}`}>
                        <h2 className="text-[#151875] text-[14px]">
                          {pro.name}
                        </h2>
                        <p className="text-[#8A8FB9] text-[12px]">
                          {" "}
                          {pro.price}  {pro.discountPercentage}%
                        </p>
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-[#151875] font-semibold text-[22px] mt-10">
                Follow
              </h1>
              <div className="mt-4 flex items-center gap-2">
                <FaFacebook className="text-blue-800" />
                <FaInstagramSquare className="text-pink-700" />
                <AiFillTwitterCircle className="text-blue-400" />
              </div>

              <h1 className="text-[#151875] font-semibold text-[22px] mt-7">
                Tags
              </h1>

              <div className="text-[#151875]  mt-4  grid grid-cols-3 gap-4">
                <p className="underline underline-offset-2">General</p>
                <p className="text-[#FB2E86]  underline underline-offset-2">
                  Atsanil
                </p>
                <p className="underline underline-offset-2">Insas.</p>
                <p className="underline underline-offset-2">Bibsaas</p>
                <p className="underline underline-offset-2">Nulla.</p>
              </div>
            </div>
         
         
         
         
         
         
         
         
         
         
         
          </div>
        </div>
      </section>

      <div className="h-[93px] sm:mx-[170px] mx-[30px]  mt-28 mb-4">
        <Image
          src={"/images/tags/tags.png"}
          height={93}
          width={400}
          alt="tag"
          className="h-[93px] w-full"
        />
      </div>
    </main>
  );
}

export default Blogs;
