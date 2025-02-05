import dbConnect  from "@/database/dbConnect";
import {user} from "@/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
  try {
    const { name, email, password } = await req.json();
    await dbConnect();

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await user.create({ name, email, password: hashedPassword, role: "user" });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}









// import { save } from "@/services/user";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request : NextRequest){
//     const {email , password} = await request.json();
//     console.log("signup body", email , password);
//     try{ 
//         save(email , password)
//         return NextResponse.json(
//             { message: "user created" },
//             { status: 201 } // Pass the status code as an option
//         );

//     }catch(error){
//         return NextResponse.json(
//             { message: error },
//             { status: 400 } // Pass the status code as an option
//         );
//     }
// }