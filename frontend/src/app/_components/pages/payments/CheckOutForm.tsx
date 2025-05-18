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

type TProps = {
  setOpen: any;
  courseInfo: any;
};

const CheckOutForm = ({ setOpen, courseInfo }: TProps) => {
  const stripe = useStripe();
  const elements = useElements();
  console.log(elements,'ee')
  const [message, setMessage] = useState<string | undefined>(undefined);

  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useCurrentUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   if (!stripe || !elements) {
  //     return;
  //   }
  //   setIsLoading(true);
  //   const { error, paymentIntent } = await stripe.confirmPayment({
  //     elements,
  //     redirect: "if_required",
  //   });
  //   if (error) {
  //     setMessage(error.message ?? "An unknown error occurred.");
  //     setIsLoading(false);
  //   } else if (paymentIntent && paymentIntent.status == "succeeded") {
  //     setIsLoading(false);
  //     createOrder({ courseId: courseInfo._id, payment_info: paymentIntent });
  //   }
  // };

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
      redirect(`/course-access/${courseInfo._id}`);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [orderData, error]);

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement id="link-authentication-element" />
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
