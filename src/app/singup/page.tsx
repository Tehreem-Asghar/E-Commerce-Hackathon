
"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Define the schema for validation using zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function Signup() {
  const router = useRouter();

  // Define the form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [error , setError] = useState<string>("")


  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        router.push("/login");
        // console.log("user registered")
      } else {
        setError("User registration failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <main className="max-w-[1920px] mx-auto">
      <section className="h-[286px] w-full bg-[#F6F5FF] grid items-center">
        <div className="sm:mx-[170px] mx-[30px] overflow-hidden text-center sm:text-left">
          <h2 className="text-[25px] sm:text-[36px] text-[#101750] font-bold">My Account</h2>
          <span className="flex sm:justify-start justify-center font-medium">
            <p>Home.Pages</p>
            <p className="text-[#FB2E86]">.Signup</p>
          </span>
        </div>
      </section>

      <section className="lg:mx-[170px] mx-[30px] my-24 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-6 h-auto w-[544px] p-5 lg:h-[474px]">
          <h1 className="text-[#101750] text-[24px] sm:text-[36px] font-bold text-center">Signup</h1>
          <p className="text-[#8D92A7] text-center text-[14px] sm:text-[16px]">
            Sign up to get access to all the features.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="h-[47px] w-full bg-[#FB2E86] text-white hover:bg-[#FB2E86]">
                Sign up
              </Button>
            </form>
          </Form>
          <p className="text-[#9096B2]">
            Already have an account?
            <Link href="/login" className="text-[#101c50]">
              {" "}
              Sign in{" "}
            </Link>
          </p>
        </div>
      </section>

      <div className="h-[93px] sm:mx-[170px] mx-[30px] mb-4">
        <Image
          src="/images/tags/tags.png"
          height={93}
          width={400}
          alt="tag"
          className="h-[93px] w-full"
        />
      </div>
    </main>
  );
}










// "use client"
// import React, { useRef } from "react";
// import { Josefin_Sans } from "next/font/google";

// import { Button } from "@/components/ui/button";
// import { signIn } from "next-auth/react"


// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const josefinSans = Josefin_Sans({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });

// function Signup() {

//   const  emailRef = useRef<HTMLInputElement>(null)
//   const  passwordRef = useRef<HTMLInputElement>(null)
//   const  NameRef = useRef<HTMLInputElement>(null)
//   const router = useRouter();



//   const onSubmitHandler = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     const email = emailRef.current?.value;
//     const password = passwordRef.current?.value;
//     const name = NameRef.current?.value;
  
//     if (!email || !password) {
//       alert("Please fill in both email and password");
//       return;
//     }
  
//     try {
//       // Signup request
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({name, email, password }),
//       });
  
//       const data = await res.json();
  
//       if (res.ok) {
//         const form = e.target;
//         // form.reset();
//         router.push("/login");
//       } else {
//         // setError("User registration failed.");
//         alert("User registration failed.")
//       }



//     } catch (error) {
//       console.error("Error during signup:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };



//   return (
//     <main className="max-w-[1920px] mx-auto">
//       <section className="h-[286px] w-full bg-[#F6F5FF] grid items-center ">
//         <div className="sm:mx-[170px] mx-[30px] overflow-hidden text-center sm:text-left">
//           <h2
//             className={`${josefinSans.className} text-[25px] sm:text-[36px] text-[#101750] font-bold`}
//           >
//             My Account
//           </h2>
//           <span className="flex sm:justify-start justify-center font-medium">
//             <p>Home.Pages</p>
//             <p className="text-[#FB2E86]">.Signup</p>
//           </span>
//         </div>
//       </section>

//       <section className="lg:mx-[170px] mx-[30px] my-24 flex justify-center items-center">
//         <div className="flex flex-col justify-center  items-center gap-6 h-auto w-[544px] p-5 lg:h-[474px]">
//           <h1 className="text-[#101750]  text-[24px] sm:text-[36px] font-bold text-center ">
//             Signup
//           </h1>
//           <p className="text-[#8D92A7] text-center  text-[14px] sm:text-[16px] ">
//             Sign up to get access to all the features.
//           </p>
//           <form onSubmit={onSubmitHandler} className="w-full grid gap-5"> 
//           <input
//             type="string"
//             placeholder="Enter your name"
//             name="name"
//             ref={NameRef}  
//             className="border border-[#C2C5E1] text-[#9096B2] w-full p-2"
//           />
//           <input
//             type="email"
//             placeholder="Email Address"
//             name="email"
//             ref={emailRef}  
//             className="border border-[#C2C5E1] text-[#9096B2] w-full p-2"
//           />
//           <input
//             type="password"
//                ref={passwordRef}
//             placeholder="Password"
//             name="password"
//             className="border border-[#C2C5E1]  text-[#9096B2]  w-full  p-2"
//           />
//           <p className="text-[#9096B2]">Forgot your password?</p>
//           <Button type="submit"  className="h-[47px] w-full  bg-[#FB2E86] text-white hover:bg-[#FB2E86]">
//             Sign up
//           </Button>
//           </form>
//           <p className="text-[#9096B2]">
//             Already have an account ?
//             <Link href={"/login"} className="text-[#101c50]">
//               {" "}
//               sign in{" "}
//             </Link>{" "}
//           </p>
//         </div>
//       </section>

//       <div className="h-[93px] sm:mx-[170px] mx-[30px]  mb-4">
//         <Image
//           src={"/images/tags/tags.png"}
//           height={93}
//           width={400}
//           alt="tag"
//           className="h-[93px] w-full"
//         />
//       </div>
//     </main>
//   );
// }

// export default Signup;
