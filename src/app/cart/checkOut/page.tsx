"use client";
import React, { useContext, useEffect, useState } from "react";
import { IoCheckbox } from "react-icons/io5";
 import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Rate, trackingObjType } from "../../../../type";
import { Josefin_Sans } from "next/font/google";
import { TrackShipment } from "@/app/components/tracking";
import { toast } from "sonner";
// import StripeCheckOutButton from "@/app/components/Checkout";
import getStipePromise from "@/lib/stripe";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface PT {
  price: string;
  name: string;
  discountPercentage: number;
  description: string;
  image: string;
  _id: string;
  stockLevel: number;
  category: string;
  tags: string[];
}

interface CartItem {
  selectedPlant: PT;
  quantity: number;
}

function OrderDone() {
  // State to store the cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  

  const router = useRouter();

  const [shipToAddress, setshipToAddress] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    cityLocality: "",
    stateProvince: "CA",
    postalCode: "90001",
    countryCode: "US",
    addressResidentialIndicator: "yes",
  });

  // name: "Jane Doe",
  // phone: "+1 987 654 3210",
  // addressLine1: "123 Main Street",
  // addressLine2: "Suite 200",
  // cityLocality: "lahor",

  const [rates, setRates] = useState<Rate[]>([]);
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [rateId, setrateId] = useState<string | null>(null);
  const [labelPdf, setLabelPdf] = useState<string | null>(null);
  const [trackingObj, setTrackingObj] = useState<trackingObjType | null>(null);
  const [rateAmount, setRateAmount] = useState<number>();
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [ShippingButText, setShippingButText] = useState("Continue Shipping");

  // Har input change handle karega hj

  const handleChange = (e: any) => {
    const { name, value } = e.target; // Input ka name aur value lete hain
    setshipToAddress((prevData) => ({
      ...prevData, // Pichle state ka data
      [name]: value, // Sirf specific field update
    }));
  };

  // Submit handler
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();

    setErrors([]);
    setRates([]);
    setShippingButText("Rates Create...");

    try {
      const response = await axios.post("/api/shipengine/get-rates", {
        shipToAddress,
        // map the cart products which can be shipped and use only weight and dimensions

        packages: [
          {
            weight: {
              value: 2,
              unit: "pound",
            },
            dimensions: {
              length: 10,
              width: 5,
              height: 8,
              unit: "inch",
            },
          },
        ],
      });
      // see the response in browser
      console.log(response.data);
      setLoading(true);

      // Update the state with the fetched rates
      setRates(response.data.rateResponse.rates);
      console.log("rates.................", rates);
    } catch (error) {
      console.log(error);
      setErrors(["An error occurred while fetching rates."]);
    } finally {
      setLoading(false);
    }
  };

  // Get data from localStorage and save it in the state
  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("cart");
    if (dataFromLocalStorage) {
      setCartItems(JSON.parse(dataFromLocalStorage));
    } else {
      setCartItems([]);
    }
  }, []);
  const SHIPPING_COST: number | undefined = rateAmount ? rateAmount : 0;

  const calculateSubtotal: () => number = () => {
    const value = cartItems.reduce(
      (total, item) =>
        total + Number(item.selectedPlant.price) * Number(item.quantity),
      0
    );

    return value + SHIPPING_COST;
  };

  const subTotal: number = calculateSubtotal();

  const total = Number(calculateSubtotal());

  const handleUpdate = async () => {
    try {
      const updatePromises = cartItems.map(async (item) => {
        if (
          item.selectedPlant.stockLevel &&
          item.quantity &&
          item.selectedPlant._id
        ) {
          // Ensure stock and quantity are numbers before updating
          await client
            .patch(item.selectedPlant._id)
            .set({
              stockLevel: item.selectedPlant.stockLevel - item.quantity,
            })
            .commit();
        }
      });

      // Wait for all update operations to complete
      await Promise.all(updatePromises);

      // After updates, clear the local storage
      localStorage.clear();

      console.log("Stock has been updated successfully!");
      router.push("/cart/checkOut/orderDone");
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  // Function to create label from selected rate
  const handleCreateLabel = async () => {
    if (!rateId) {
      alert("Please select a rate to create a label.");
    }

    setLoading(true);
    setErrors([]);

    try {
      // get rateId which user selected
      const response = await axios.post("/api/shipengine/create-label", {
        rateId: rateId,
      });
      const labelData = response.data;
      // see the response of label in browser
      console.log(labelData);
      // set pdf url
      setLabelPdf(labelData.labelDownload.href);
      // set tracking obj
      setTrackingObj({
        trackingNumber: labelData.trackingNumber,
        labelId: labelData.labelId,
        carrierCode: labelData.carrierCode,
      });
    } catch (error) {
      console.log(error);
      setErrors(["An error occurred while creating the label."]);
    } finally {
      setLoading(false);
    }
  };

  const ViewCartButton = () => (
    <Link href={"/wishlist"}>
      {" "}
      <button className="bg-[#FB2E86] text-white   w-[90px] py-2 px-4 rounded ">
        Got it
      </button>
    </Link>
  );

  const handleCheckout = async () => {
    const stripe = await getStipePromise();
    const response = await fetch("/api/stripe-session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify(total),
    });

    const data = await response.json();
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }
  };

  return (
    <main className="max-w-[1920px] mx-auto">
      <section className="h-[286px] w-full bg-[#F6F5FF] grid items-center">
        <div className="sm:mx-[170px] mx-[30px] overflow-hidden text-center sm:text-left">
          <h2
            className={`${josefinSans.className} text-[25px] sm:text-[36px] text-[#101750] font-bold`}
          >
            Shopping Cart
          </h2>
          <span className="flex sm:justify-start justify-center font-medium">
            <p>Home.Pages</p>
            <p className="text-[#FB2E86]">.shopping cart</p>
          </span>
        </div>
      </section>

      <section className="my-9 sm:mx-[170px] mx-[30px]">
        <div>
          <h2
            className={`${josefinSans.className} text-[24px]  text-[#101750] font-bold`}
          >
            Hekto Demo
          </h2>
          <p className="text-[#101750]  text-[12px]">
            Cart/ Information/ Shipping/ Payment
          </p>
        </div>

        <div className="flex gap-3 lg:flex-row flex-col  h-auto mt-3  mb-44">
          <div className="w-full bg-[#F8F8FD]  py-6  px-4">
            {rates.length == 0 ? (
              <>
                <div className="flex justify-between  md:flex-row  flex-col">
                  <h1 className="text-[16px]  text-[#1D3178] font-bold">
                    Contact Information
                  </h1>
                  <p className="text-[#C1C8E1] text-[14px]">
                    Already have an account? Log in
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-between text-[#C1C8E1] mt-6  border-b-[2px]  border-b-[#d0ced4]">
                    <input
                      type="number"
                      placeholder="Phone number"
                      className="w-full p-2 bg-inherit"
                      required
                      name="phone" // Name attribute zaroori hai
                      value={shipToAddress.phone}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="flex gap-2 mt-4">
                    <IoCheckbox className="text-[#19D16F]" />
                    <p className="text-[#8A91AB] text-[10px]">
                      Keep me up to date on news and excluive offers
                    </p>
                  </div>

                  <h1 className="text-[16px]  text-[#1D3178] font-bold  mt-32">
                    Shipping address
                  </h1>

                  <div className="flex  flex-col md:flex-row md:gap-4  md:justify-evenly ">
                    <div className="  text-[#C1C8E1] mt-10  border-b-[2px]  border-b-[#d0ced4] w-full">
                      <input
                        type="text"
                        placeholder="name"
                        className="w-full p-2 bg-inherit"
                        name="name" // Name attribute zaroori hai
                        value={shipToAddress.name}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                    <div className="  text-[#C1C8E1] mt-10  border-b-[2px]  border-b-[#d0ced4] w-full">
                      <input
                        type="text"
                        placeholder="Last name  (optional)"
                        className="w-full p-2 bg-inherit"
                      />
                    </div>
                  </div>
                  <div className="flex  flex-col md:flex-row md:gap-4  md:justify-evenly ">
                    <div className="  text-[#C1C8E1] mt-10  border-b-[2px]  border-b-[#d0ced4] w-full">
                      <input
                        type="text"
                        placeholder="addressLine1"
                        className="w-full p-2  bg-inherit"
                        name="addressLine1" // Name attribute zaroori hai
                        value={shipToAddress.addressLine1}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                    <div className="  text-[#C1C8E1] mt-10  border-b-[2px]  border-b-[#d0ced4] w-full">
                      <input
                        type="text"
                        placeholder="addressLine2"
                        className="w-full p-2  bg-inherit"
                        required
                        name="addressLine2" // Name attribute zaroori hai
                        value={shipToAddress.addressLine2}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>

                  <div className=" text-[#C1C8E1] mt-10  border-b-[2px]  border-b-[#d0ced4]">
                    <input
                      type="text"
                      placeholder="State/Province (DC/CA)"
                      className="w-full p-2 bg-inherit"
                      name="stateProvince"
                      value={shipToAddress.stateProvince}
                      onChange={(e) => handleChange(e)}
                      required
                      readOnly
                    />
                  </div>

                  <div className=" text-[#C1C8E1] mt-10  border-b-[2px]  border-b-[#d0ced4]">
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full  p-2  bg-inherit"
                      required
                      name="cityLocality" // Name attribute zaroori hai
                      value={shipToAddress.cityLocality}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="flex  flex-col md:flex-row md:gap-4  md:justify-evenly ">
                    <div className="  text-[#C1C8E1] mt-10  border-b-[2px]  border-b-[#d0ced4] w-full">
                      <input
                        type="text"
                        placeholder="Country Code (e.g., PK)"
                        className="w-full  p-2 bg-inherit"
                        name="countryCode" // Name attribute zaroori hai
                        value={shipToAddress.countryCode}
                        onChange={(e) => handleChange(e)}
                        readOnly
                      />
                    </div>
                    <div className="  text-[#C1C8E1] mt-10  border-b-[2px]  border-b-[#d0ced4] w-full">
                      <input
                        type="number"
                        placeholder="Postal Code"
                        className="w-full p-2 bg-inherit"
                        name="postalCode" // Name attribute zaroori hai
                        value={shipToAddress.postalCode}
                        onChange={(e) => handleChange(e)}
                        readOnly
                      />
                    </div>
                  </div>

                  <button
                    // asChild
                    className={
                      " bg-[#FB2E86] hover:bg-[#ff2986] h-[44px] w-[182px] rounded-sm text-white mt-24"
                    }
                    type="submit"
                  >
                    {ShippingButText}
                    {/* <Link href="/">Continue Shipping</Link> */}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h1 className="text-[22px]  text-[#1D3178] font-bold  my-6 text-center">
                  Select a Rate
                </h1>
                <div className="grid md:grid-cols-2  gap-2">
                  {rates.map((rate) => {
                    return (
                      <div
                        key={rate.rateId}
                        className={`p-4 border-[2px]  flex gap-2 items-center rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer ${
                          rateId === rate.rateId
                            ? "border-[#19D16F] bg-green-200"
                            : "border-gray-200 bg-gray-50"
                        }`}
                        onClick={() => {
                          setrateId(rate.rateId);
                          setRateAmount(rate.shippingAmount.amount);
                        }}
                      >
                        <input
                          type="radio"
                          name="shippingRate"
                          checked={rateId === rate.rateId}
                          onChange={() => setrateId(rate.rateId)}
                          className="form-radio h-4 w-4 text-[#19D16F]"
                        />
                        <div>
                          {/* <p className="text-lg font-medium text-gray-700">
                       <strong>Carrier:</strong> {rate.carrierFriendlyName}
                     </p> */}
                          <p className="text-[#1D3178]">
                            <p>
                              Service: {rate.serviceType} in{" "}
                              {rate.carrierDeliveryDays} Days
                            </p>
                          </p>
                          <p className="text-[#1D3178] ">
                            <p>
                              Cost: {rate.shippingAmount.amount}{" "}
                              {rate.shippingAmount.currency}{" "}
                            </p>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Create Label Button */}
                {rateId && (
                  <div className="mt-8">
                    <button
                      onClick={handleCreateLabel}
                      disabled={loading}
                      className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400"
                    >
                      {loading ? "Creating Label..." : "Create Label"}
                    </button>
                  </div>
                )}
                {labelPdf && (
                  <Link target="_blank" href={labelPdf}>
                    {" "}
                    <button className="px-4 py-2  w-full border-[2px] border-green-500 bg-green-300 mt-3 text-green-900 rounded-md hover:bg-green-400">
                      Download Label
                    </button>
                  </Link>
                )}
                {trackingObj && (
                  <div className="mt-8">
                    <h2 className=" text-[18px] font-semibold text-gray-800 mb-4">
                      Tracking : (We are using ShipEngine test api key so order
                      will not trace)
                    </h2>
                    <p>tracking number: {trackingObj.trackingNumber}</p>
                    <p> labelId: {trackingObj.labelId}</p>
                    <p> carrierCode: {trackingObj.carrierCode}</p>
                    {/* <Link href={`/cart/checkOut/?labelId=${trackingObj.labelId}`}> */}
                    <button
                      onClick={() => {
                        setIsConfirm(true);

                        router.push(
                          `/cart/checkOut/?labelId=${trackingObj.labelId}`
                        );
                      }}
                      className="px-4 py-2 w-full   mt-3  bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Track Order
                    </button>
                    {/* </Link> */}
                  </div>
                )}
                {isConfirm && <TrackShipment />}
              </>
            )}
          </div>
          <div className="lg:w-[40%]  w-full">
            {cartItems.map((items) => (
              <>
                <div
                  key={items.selectedPlant._id}
                  className="h-[102px] bg-[#E1E1E4] px-2 w-full flex justify-between shadow-md mb-4"
                >
                  <div className="flex gap-2">
                    <Image
                      src={items.selectedPlant.image}
                      height={87}
                      width={83}
                      alt={items.selectedPlant.name}
                      className="h-[84px] w-[80px] "
                    />
                    <div className="flex flex-col justify-center items-center">
                      <h2 className="text-[12px] line-clamp-2">
                        {items.selectedPlant.name}
                      </h2>
                      <p className="text-[12px] text-[#A1A8C1]"> color:Brown</p>
                      <p className="text-[12px] text-[#A1A8C1]">size:Xl</p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center text-[#15245E]">{`${items.quantity && Number(items.selectedPlant.price) && (items.quantity * Number(items.selectedPlant.price)).toFixed(2)}`}</div>{" "}
                </div>
              </>
            ))}

            {/* Cart Totals Section */}
            <div className="w-full">
              <h2 className="my-5 text-center text-[#1D3178] font-bold">
                Cart Totals
              </h2>
              <div className="h-auto  w-full p-7  bg-[#E8E6F1]">
                <div className="flex justify-between text-[#1D3178]  border-[2px]  border-b-[#d0ced4]">
                  <h3>Subtotals:</h3>
                  <h3>{subTotal}</h3>
                </div>

                <div className="flex justify-between text-[#1D3178] mt-3  border-[2px]  border-b-[#d0ced4]">
                  <h3>Total:</h3>
                  <h3>{total}</h3>
                </div>

                <div className="flex gap-2 mt-4">
                  <IoCheckbox className="text-[#19D16F]" />
                  <p className="text-[#8A91AB] text-[10px]">
                    Shipping & taxes calculated at checkout
                  </p>
                </div>
                {/* <Button
                  onClick={() => {
                    isConfirm
                      ? handleUpdate()
                      : toast("Please complete Rateing Proccess", {
                          description:
                            "Fill out the required form and create shipping rates to continue with the next steps. ",
                          action: <ViewCartButton />,
                          duration: 4000,
                        });
                  }}
                  className="h-[40px] w-full bg-[#19D16F] mt-4 hover:bg-[#19D16F] text-white"
                >
                  Confirm Order
                </Button> */}
                {/* <StripeCheckOutButton cartItems={cartItems} /> */}

                <div className="py-5">
                  <button
                     className="h-[40px] w-full bg-[#19D16F] mt-4 hover:bg-[#19D16F] text-white"
                    onClick={()=>{   isConfirm ? handleCheckout() : toast("Please complete Rateing Proccess", {
                      description:
                        "Fill out the required form and create shipping rates to continue with the next steps. ",
                      action: <ViewCartButton />,
                      duration: 4000,
                    });}}
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OrderDone;
