"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const [error , setError]= useState<string>("");

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/"); // Navigate to home page
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }finally{
           <p>loading........</p>
    }
  };

  return (
    <main className="max-w-[1920px] mx-auto">
      <section className="h-[286px] w-full bg-[#F6F5FF] grid items-center">
        <div className="sm:mx-[170px] mx-[30px] text-center sm:text-left">
          <h2 className="text-[25px] sm:text-[36px] text-[#101750] font-bold">My Account</h2>
          <span className="flex sm:justify-start justify-center font-medium">
            <p>Home.Pages</p>
            <p className="text-[#FB2E86]">.My Account</p>
          </span>
        </div>
      </section>

      <section className="lg:mx-[170px] mx-[30px] my-24 flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5 max-w-md">
          <h1 className="text-[#101750] text-[24px] sm:text-[36px] font-bold text-center">Login</h1>
          <p className="text-[#8D92A7] text-center text-[14px] sm:text-[16px]">
            Please login using account details below.
          </p>
          <Input
            type="email"
            placeholder="Email Address"
            className="border border-[#C2C5E1] text-[#9096B2] p-2"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          <Input
            type="password"
            placeholder="Password"
            className="border border-[#C2C5E1] text-[#9096B2] p-2"
            {...register("password")}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          {/* <p className="text-[#9096B2]">Forgot your password?</p> */}
          <Button type="submit" className="h-[47px] w-full bg-[#FB2E86] text-white">
            Sign In
          </Button>
          <p className="text-red-700 py-2">{error}</p>
          <p className="text-[#9096B2]">
            Dont have an Account?
            <a href="/singup" className="text-[#122061]">
              Create account
            </a>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;























// "use client"
// import React, { useRef } from "react";
// import { Josefin_Sans } from "next/font/google";

// import { Button } from "@/components/ui/button";

// import Image from "next/image";
// import Link from "next/link";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// const josefinSans = Josefin_Sans({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });

// function login() {
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const router = useRouter()


//   const onSubmitHandler = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     const email = emailRef.current?.value;
//     const password = passwordRef.current?.value;
  


//     try {
//       const result = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//       });
  
//       if (result?.error) {
//         alert("Invalid Credentials");
//         console.log("login error");
         
//       } else {
//         router.push("/"); // Navigate to home page
//       }
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred. Please try again.");
//     }





//     // if (!email || !password) {
//     //   alert("Please fill in both email and password");
//     //   return;
//     // }
  
//     // try {
//     //   const signInResponse = await signIn("credentials", {
//     //     redirect: false, // Don't automatically redirect
//     //     email,
//     //     password,
//     //   });
  
//     //   if (signInResponse?.ok) {
//     //     // Redirect the user to the desired page
//     //     window.location.href = "/cart"; // Update with your desired route
//     //   } else {
//     //     alert("Invalid email or password. Please try again.");
//     //   }
//     // } catch (error) {
//     //   console.error("Error during sign-in:", error);
//     //   alert("An error occurred. Please try again.");
//     // }













//   };
  
  
//   // const onSubmitHandler = async (e: any) => {
//   //   const email = emailRef.current?.value;
//   //   const password = passwordRef.current?.value;
//   //   e.preventDefault();
//   //   try {
//   //     const res = await fetch("/api/auth/signup", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ email, password }),
//   //     });
//   //     const data = await res.json();
//   //     console.log(data);
//   //     if (res.ok) {
//   //       alert("sign up successful");
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

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
//             <p className="text-[#FB2E86]">.My Account</p>
//           </span>
//         </div>
//       </section>

//       <section className="lg:mx-[170px] mx-[30px] my-24 flex justify-center items-center">
//         <div className="flex flex-col justify-center  items-center gap-6 h-auto w-[544px] p-5 lg:h-[474px]">
//           <h1 className="text-[#101750]  text-[24px] sm:text-[36px] font-bold text-center ">
//             Login
//           </h1>
//           <p className="text-[#8D92A7] text-center  text-[14px] sm:text-[16px] ">
//             Please login using account detail bellow.
//           </p>
//           <form onSubmit={onSubmitHandler}   className="w-full grid gap-5"> 
//           <input
//             type="email"
//             placeholder="Email Address"
//             className="border border-[#C2C5E1] text-[#9096B2] w-full p-2"
//             name="email"
//             ref={emailRef} 
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="border border-[#C2C5E1]  text-[#9096B2]  w-full  p-2"
//             ref={passwordRef}
//              name="password"
//           />
//           <p className="text-[#9096B2]">Forgot your password?</p>
//           <Button  type="submit" className="h-[47px] w-full  bg-[#FB2E86] text-white hover:bg-[#FB2E86]">
//             Sign In
//           </Button>
//           </form>
//           <p className="text-[#9096B2]">
//             Dont have an Account?{" "}
//             <Link href={"/singup"} className="text-[#122061]">
//               {" "}
//               Create account{" "}
//             </Link>
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

// export default login;
