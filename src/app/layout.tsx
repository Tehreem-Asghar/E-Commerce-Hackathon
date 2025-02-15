import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
// import TopHeader from "./components/topHeader";
import SecondHeader from "./components/secondHeader";
import Footer, { BottomFooter } from "./components/footer";
import ContextProvider from "./contetxtProvider";
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "./provider/provider";


// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton
// } from '@clerk/nextjs'




// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>

     <html lang="en">
      <body >

      {/* className={inter.className} */}
      {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
        <AuthProvider> 
        <ContextProvider> 
        {/* <TopHeader/> */}
        <SecondHeader/>
        {children}
        </ContextProvider>
        </AuthProvider>
        <Toaster />
        <Footer/>
        <BottomFooter/>
      
        </body>
    </html>
    // {/* </ClerkProvider> */}
  );
}
