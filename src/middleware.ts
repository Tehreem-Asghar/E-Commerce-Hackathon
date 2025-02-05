import { NextRequest, NextResponse } from "next/server";


export const middleware = (request: NextRequest) => {
    const cookie = request.cookies.get("next-auth.session-token")?.value;
    const deployedCookie = request.cookies.get("__Secure-next-auth.session-token")?.value;
  
    // Log cookie values for debugging
    console.log("Cookie:", cookie);
    console.log("DeployedCookie:", deployedCookie);
  
    // Check if both cookies exist
    if (!cookie && !deployedCookie) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  
    return NextResponse.next();
  };
  
  export const config = {
      matcher: [ "/cart/checkOut", "/cart/checkOut/orderDone", "/wishlist", "/contact"],
    };
    


// import { NextRequest, NextResponse } from "next/server";

// export const middleware = (request: NextRequest) => {
//   // Retrieve the session token from cookies
//   const cookie = request.cookies.get("next-auth.session-token");
//   const deployedCookie = request.cookies.get("__Secure-next-auth.session-token");
//   const isLoggedIn = cookie?.value; // Ensure cookie exists and retrieve its value
// console.log(isLoggedIn)
//   // If not logged in, redirect to login page
//   if (!isLoggedIn || !deployedCookie) {
//     const loginUrl = new URL("/login", request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Allow access to the route
//   return NextResponse.next();
// };

// export const config = {
//   matcher: [ "/cart/checkOut", "/cart/checkOut/orderDone", "/wishlist", "/contact"],
// };























// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
       

// export  const middleware = async (request : NextRequest)=>{
   

// console.log("hello")


// const cookie = await cookies()
// const isLoggedin = cookie.get("next-auth.session-token")

// if(!isLoggedin){
//    return NextResponse.redirect(new URL("/login" , request.url))
// }
//     return NextResponse.next()
// }


// export const config = {
//     matcher : ["/cart" , "/cart/checkOut" , "/cart/checkOut/orderDone" , "/wishlist" , "/contact"]
// }
       