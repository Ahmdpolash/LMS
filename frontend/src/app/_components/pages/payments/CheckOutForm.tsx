import { useCurrentUserQuery } from "@/redux/api/baseApi";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// socket io 
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_API_URL_LOCAL || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type TProps = {
  setOpen: any;
  courseInfo: any;
  user: any;
};

const CheckOutForm = ({ setOpen, courseInfo, user }: TProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined>(undefined);

  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useCurrentUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment(
        {
          elements,
          redirect: "if_required",
        }
      );

      if (stripeError) {
        setMessage(
          stripeError.message ?? "An unknown error occurred during payment."
        );
        setIsLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        const orderResult = await createOrder({
          courseId: courseInfo._id,
          payment_info: paymentIntent,
        }).unwrap();

        // If createOrder is successful, redirect
        if (orderResult) {
          toast.success("Order created successfully!");
          setIsLoading(false);
          redirect(`/course-access/${courseInfo._id}`);
        }
      } else {
        toast.error("Payment failed. Please try again.");
        setIsLoading(false);
      }
    } catch (orderError: any) {
      // Handle errors from createOrder mutation
      setIsLoading(false);
      if ("data" in orderError) {
        toast.error(orderError.data.message ?? "An unknown error occurred.");
        setMessage(orderError.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);

      socketId.emit("notification", {
        title: "New Order",
        message: `You have a new order from ${orderData?.data?.name}`,
        userId: user._id,
      });

      redirect(`/course-access/${courseInfo._id}`);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [orderData, error, courseInfo._id]);

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement id="link-authentication-element" />

        <details className="text-sm my-2">
          <summary className="cursor-pointer text-blue-600 dark:text-red-400 ">
            <strong>Click Here </strong>{" "}
            <i>to use test card (copy and paste )</i>
          </summary>
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1">
            <p>
              <strong>Card Number:</strong> 4242 4242 4242 4242
            </p>
            <p>
              <strong>Expiration Date:</strong> Any future date (e.g., 12/28)
            </p>
            <p>
              <strong>CVC:</strong> Any 3-digit number (e.g., 123)
            </p>
          </div>
        </details>
        <PaymentElement id="payment-element" />

        <button
          disabled={isLoading || !stripe || !elements}
          id="submit "
          className="my-3"
        >
          <span
            id="button-text"
            className={` rounded-md bg-[#2971D9] dark:text-white text-black px-3 py-2 cursor-pointer`}
          >
            {isLoading ? "Paying..." : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && (
          <div id="payment-message" className="text-[red] font-Poppins pt-2">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
