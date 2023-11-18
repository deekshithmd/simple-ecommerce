"use client";
import Image from "next/image";
import Script from "next/script";
import emailjs from "@emailjs/browser";
import Mobile1 from "../../public/mobile-1.png";
import Mobile2 from "../../public/mobile-2.png";
import Mobile3 from "../../public/mobile-3.png";

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Mobile1",
      image: Mobile1,
      price: 10000,
    },
    {
      id: 2,
      name: "Mobile2",
      image: Mobile2,
      price: 12000,
    },
    {
      id: 3,
      name: "Mobile3",
      image: Mobile3,
      price: 15000,
    },
  ];

  const sendBill = (item) => {
    const templateParams = {
      from_name: "SimpleEcom",
      to_name: "Deekshith M D",
      product_name: "Mobile1",
      bill_description: `You have purchased ${item?.name} worth Rs.${item?.price}, ${item?.name} comes under 6 month warrenty`,
      to_email: "deekshith123@mailinator.com", // user email
      price: 10000,
    };

    emailjs
      .send(
        "service_bwfwfjb",
        "template_2knrhm3",
        templateParams,
        "VXfq7H_2G3ps184-E"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };

  const doPayment = (item) => {
    let options = {
      key: "rzp_test_FKsgyFO1LyEuxU",
      key_secret: "B5IjUO1TmcjmfDw34KMI4f8X",
      amount: item?.price * 100,
      currency: "INR",
      name: "SimpleEcom",
      description: "Thank you for choosing FreshBuy",
      handler: function (response) {
        console.log("id", response);
        sendBill(item);
        console.log("Congratulations...Your Order Placed");
      },
      prefill: {
        name: "Deekshith M D",
        email: "deekshithmogra@gmail.com",
        contact: "7975507889",
      },
      notes: {
        address: "Razorpay Carporate Office",
      },
      theme: {
        color: "#0bb32f",
      },
    };
    let pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onError={() => console.log("Error in script")}
        onReady={() => console.log("script is ready")}
      />
      <main className="w-full min-h-screen flex items-center justify-center p-24 gap-2">
        {products?.map((item) => {
          return (
            <div
              key={item?.id}
              className="border-2 bg-white hover:scale-105 hover:transition-transform border-black rounded-lg flex flex-col justify-center items-center p-5 gap-y-2"
            >
              <Image
                src={item?.image}
                height={70}
                width={50}
                alt="product"
                className="h-52 w-52 object-contain"
              />
              <span>{`Price: Rs.${item?.price}`}</span>
              <button
                className="border px-8 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => doPayment(item)}
              >
                Buy
              </button>
            </div>
          );
        })}
      </main>
    </>
  );
}
