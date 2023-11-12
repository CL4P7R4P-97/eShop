import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import Card from "../../../components/card/card";
import Loader from '../../../components/loader/Loader';

import styles from "./ChangeOrderStatus.module.scss";
import { SendMail } from "../../../customHooks/sendMail";

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendEmail = () => {


    const tableRows =  order.cartItems.map((item, index) => (
      `<tr style="text-align: center" key=${index}>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price}</td>
        <td>$${item.quantity * item.price}</td>
      </tr>`
    )).join('');

    const emailBody = `
    <div style="background-color: #f3f3f3; padding: 20px; border-radius: 10px;">
        <p style="font-size: 24px; color: #333;">Order Status Update: ${status}</p>
        
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
          <p><strong>Name:</strong> ${order.shippingAddress.name}</p>
          <p><strong>Address Line 1:</strong> ${order.shippingAddress.addressLine1}</p>
          <p><strong>Address Line 2:</strong> ${order.shippingAddress.addressLine2}</p>
          <p><strong>City:</strong> ${order.shippingAddress.city}</p>
          <p><strong>State:</strong> ${order.shippingAddress.state}</p>
          <p><strong>Zip Code:</strong> ${order.shippingAddress.zip}</p>
          <p><strong>Country:</strong> ${order.shippingAddress.country}</p>
        </div>

        <p style="font-size: 24px; color: #333;">Status</p>

        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
          <div style="flex: 1; text-align: center;">
            <div style="background-color: ${status === 'Processing...' ? '#4CAF50' : '#ddd'}; padding: 10px; border-radius: 5px;">
              <p style="margin: 0; color: #fff;">Processing</p>
            </div>
          </div>

          <div style="flex: 1; text-align: center;">
            <div style="background-color: ${status === 'Shipped...' ? '#4CAF50' : '#ddd'}; padding: 10px; border-radius: 5px;">
              <p style="margin: 0; color: #fff;">Shipped</p>
            </div>
          </div>

          <div style="flex: 1; text-align: center;">
            <div style="background-color: ${status === 'Delivered' ? '#4CAF50' : '#ddd'}; padding: 10px; border-radius: 5px;">
              <p style="margin: 0; color: #fff;">Delivered</p>
            </div>
          </div>
        </div>
        
        <p style="margin-top: 20px; font-size: 18px; color: #333;">Total: $${order.orderAmount}</p>
        <p style="margin-top: 10px; font-size: 18px; color: #333;">Your order has been updated to ${status}.</p>
      </div>
   
    
  `;
  const body =JSON.stringify({
    to: order.userEmail,
    subject: 'Order Status',
    body: emailBody,
  });
    SendMail(body);
  };

  const editOrder = (e, id) => {
    e.preventDefault();
    setIsLoading(true);

    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };
    try {
      setDoc(doc(db, "orders", id), orderConfig);

      setIsLoading(false);
      toast.success("Order status changes successfully");
      navigate("/admin/orders");
      handleSendEmail();
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Status</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  -- Choose one --
                </option>
                <option value="Order Placed...">Order Placed...</option>
                <option value="Processing...">Processing...</option>
                <option value="Shipped...">Shipped...</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
