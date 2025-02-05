import Slider from "./components/slider";
import FeatureProdut from "./components/feature-produt";
import LatestProduct from "./components/latestProduct";
import ShopexOffer from "./components/shopexOffer";
import Image from "next/image";
import Trending from "./components/trending";
import DiscountItem from "./components/discountItem";
import TopCategary from "./components/topcategary";
import Blogs from "./components/blogs";
import Link from "next/link";
import { client } from "@/sanity/lib/client";







async function  Subscribe() {
    const res = await client.fetch(`*[_type == "subscribeLatestUpdate"]{
      _id,
     subscribtext,
     buttontext,
     buttonUrl,
  }`); 
    return res

}



async function uniqueFeatures() {
  const res = await client.fetch(`*[_type == "product" && "uniqueFeatures" in tags]{
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
  return res

}



export default async function Home() {

  const uniqueFeature = await uniqueFeatures()
  const subscribe  = await Subscribe()
  return (
    <main className="max-w-[1920px] mx-auto ">
      <Slider />
      <section className="lg:mx-[100px] mx[30px] overflow-hidden">
        <FeatureProdut />  
        <LatestProduct/>
        <ShopexOffer />
      </section>

      <section>
        <div className="h-[400px]   mt-36  w-full flex justify-center items-center  bg-[#F1F0FF]">
          <div className="flex  flex-col md:flex-row gap-3 justify-center items-center ">
            <Image
              src={uniqueFeature[0].image}
              width={558}
              height={550}
              alt="sofa"
              className="lg:h-[400px] lg:w-[400px] md:h-[250px] md:w-[250px] md:block  h-[200px] w-[200px]  hidden"
            />

            <div className="grid gap-3 mx-5 sm:mx-0">
            <h1  className={`text-[#151875] font-bold text-[20px]  sm:text-[30px]  `}>Unique Features Of leatest & <br/>
              Trending Poducts</h1>

              <div className='flex items-center gap-3'> <div className='rounded-full bg-[#F52B70] p-1  h-1 w-1'></div> <p className='text-[#ACABC3]'>All frames constructed with hardwood solids and laminates</p> </div>
              <div className='flex items-center gap-3'> <div className='rounded-full bg-[#2B2BF5] p-1  h-1 w-1'></div> <p className='text-[#ACABC3]'>Reinforced with double wood dowels, glue, screw - nails corner <br/>
              blocks and machine nails</p> </div>
              <div className='flex items-center gap-3'> <div className='rounded-full bg-[#2BF5CC] p-1  h-1 w-1'></div> <p className='text-[#ACABC3]'>Arms, backs and seats are structurally reinforced</p> </div>
            
              <div className=" flex gap-9  items-center mt-4">
              <Link  href={`${uniqueFeature[0]._id}`}> <button className="h-[45px] w-[150px] justify-center items-center text-white bg-[#FB2E86]">
                  Add to Cart
                </button>
                </Link> 
                <div className="text-[#151875] sm:text-[24px] text-[10px]">
                  <p>{uniqueFeature[0].name.split(" ").slice(0, 2).join(" ")} </p>
                  <p> ${uniqueFeature[0].price}.00</p>
                </div>
              </div>
            </div>



            

          </div>
        </div>
      </section>
      <section className="lg:mx-[100px] mx[30px] overflow-hidden">
        <Trending/>
        <DiscountItem />
      </section>
      <TopCategary />

      <div className="relative">
        <Image
          src={"/images/banner2.png"}
          height={300}
          width={500}
          alt="banner"
          className="w-full relative my-10 h-[300px]"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-4">
          <p className="font-bold text-[#151875] text-[24px] text-center sm:text-[32px]">
            {subscribe[0].subscribtext}
          </p>
          <Link href={subscribe[0].buttonUrl}>
          <button className="p-7 h-10 w-[150px] flex justify-center items-center text-white bg-[#FB2E86]">
            {subscribe[0].buttontext}
          </button>
          </Link>
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
      <Blogs />
    </main>
  );
}
