import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const body = await request.json();

    // Validate the total value
    if (typeof body !== "number" || body <= 0) {
      return NextResponse.json({ message: "Invalid total value" }, { status: 400 });
    }

    // Create the Stripe session
    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      invoice_creation: { enabled: true },
      line_items: [
        {
          price_data: {
            currency: "pkr",
            product_data: {
              name: "Custom Order", // Static product name
            },
            unit_amount: body * 100, // Convert total to cents (Stripe requires amounts in the smallest currency unit)
          },
          quantity: 1, // Always 1 because we're using a single total value
        },
      ],
      phone_number_collection: { enabled: true },
      success_url: `${request.headers.get("origin")}/cart/checkOut/orderDone`,
      cancel_url: `${request.headers.get("origin")}/?canceled=true`,
    });

    // Return the session to the frontend
    return NextResponse.json({ session });
  } catch (error) {
    console.error("Stripe session creation error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


























// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";

// const key = process.env.STRIPE_SECRET_KEY || "";

// const stripe = new Stripe(key, {
//   apiVersion: "2024-12-18.acacia",
// });

// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   console.log(body);
//   try {
//     if (body.length > 0) {
//       const session = await stripe.checkout.sessions.create({
//         submit_type: "pay",
//         mode: "payment",
//         payment_method_types: ["card"],
//         billing_address_collection: "auto",
//         // shipping_options: [
//         //   { shipping_rate: "shr_1NJgGfFFOcRRviB5IKHisAI1" },
//         //   { shipping_rate: "shr_1NJgFzFFOcRRviB5RNlrrnhM" },
//         // ],
//         invoice_creation: {
//           enabled: true,
//         },
//         // line_items: body.map((item: any) => {
//         //   return { 
//         //     price_data: {
//         //       currency: "pkr",
//         //       product_data: {
//         //         name: item. selectedPlant.name,
//         //       },
//         //       unit_amount: Number(item.selectedPlant.price) * 100,
//         //     },
//         //     quantity: item.quantity,
//         //     adjustable_quantity: {
//         //       enabled: true,
//         //       minimum: 1,
//         //       maximum: 10,
//         //     },
//         //   };
//         // }),
//           line_items: body.map((item: any) => {
//           return { 
//             price_data: {
//               currency: "pkr",
//               product_data: {
//                 name: item. selectedPlant.name,
//               },
//               unit_amount: Number(item.selectedPlant.price) * 100,
//             },
//             quantity: item.quantity,
//             adjustable_quantity: {
//               enabled: true,
//               minimum: 1,
//               maximum: 10,
//             },
//           };
//         }),
//         phone_number_collection: {
//           enabled: true,
//         },
//         success_url: `${request.headers.get("origin")}/success`,
//         cancel_url: `${request.headers.get("origin")}/?canceled=true`,
//       });
//       return NextResponse.json({ session });
//     } else {
//       return NextResponse.json({ message: "No Data Found" });
//     }
//   } catch (err: any) {
//     console.log(err);
//     return NextResponse.json(err.message);
//   }
// }