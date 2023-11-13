import React, { useEffect, useRef, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.scss";
import Card from "../card/card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import spinnerImg from "../../assets/spinner.jpg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { SendMail } from "../../customHooks/sendMail";

const CheckoutForm = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);

  


  const handleSendEmail = () => {

    const tableRows = cartItems.map((item, index) => (
      `<tr style="text-align: center" key=${index}>
      <td style="border: 1px solid #dddddd; padding: 8px;">${item.name}</td>
      <td style="border: 1px solid #dddddd; padding: 8px;">${item.quantity}</td>
      <td style="border: 1px solid #dddddd; padding: 8px;">$${item.price}</td>
      <td style="border: 1px solid #dddddd; padding: 8px;">$${item.quantity * item.price}</td>
    </tr>`
    )).join('');
    
    const emailBody = `
    <div style="background-color: #f3f3f3; padding: 20px; border-radius: 10px;">
    <p style="font-size: 24px; color: #333;">Order Confirmation</p>
    
    <table style="border-collapse: collapse; width: 100%; background-color: #fff; border-radius: 5px; overflow: hidden; margin-top: 20px;">
      <thead>
        <tr style="border-bottom: 1px solid #ddd;">
          <th style="padding: 10px; text-align: left;">Item</th>
          <th style="padding: 10px; text-align: left;">Quantity</th>
          <th style="padding: 10px; text-align: left;">Unit Price</th>
          <th style="padding: 10px; text-align: left;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
    
    <div style="margin-top: 20px;">
      <h2 style="color: #333;">Shipping Address</h2>
      <p><strong>Name:</strong> ${shippingAddress.name}</p>
      <p><strong>Address Line 1:</strong> ${shippingAddress.addressLine1}</p>
      <p><strong>Address Line 2:</strong> ${shippingAddress.addressLine2}</p>
      <p><strong>City:</strong> ${shippingAddress.city}</p>
      <p><strong>State:</strong> ${shippingAddress.state}</p>
      <p><strong>Zip Code:</strong> ${shippingAddress.zip}</p>
      <p><strong>Country:</strong> ${shippingAddress.country}</p>
    </div>
    
    <p style="margin-top: 20px; font-size: 18px; color: #333;">Total: $${cartTotalAmount}</p>
    <p style="margin-top: 10px; font-size: 18px; color: #333;">Thank you for your order! It is confirmed and will be processed shortly.</p>
  </div>

  `;
  const body =JSON.stringify({
    to: userEmail,
    subject: 'Order Confirmation',
    body: emailBody,
  });
    SendMail(body);
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  // Save order to Order History
  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART());
      toast.success("Order saved");
      navigate("/checkout-success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

     await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "https://peaceful-pie-f1123f.netlify.app/checkout-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        // ok - paymentIntent // bad - error
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment successful");
            saveOrder();
            handleSendEmail();
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
          <div>
            <Card cardClass={`${styles.card} ${styles.pay}`}>
              <h3>Stripe Checkout</h3>
              <PaymentElement id={styles["payment-element"]} />
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className={styles.button}
              >
                <span id="button-text">
                  {isLoading ? (
                    <img
                      src={spinnerImg}
                      alt="Loading..."
                      style={{ width: "20px" }}
                    />
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div id={styles["payment-message"]}>{message}</div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;
