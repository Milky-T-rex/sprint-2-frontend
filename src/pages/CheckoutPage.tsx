import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
interface OrderSummaryItem {
  product: string;
  quantity: number;
  price: number;
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const handleClearCart = () => {
    clearCart();
  };

  const { orderSummary, subtotal, shipping, tax, total } = location.state as {
    orderSummary: OrderSummaryItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    billingAddress: "",
    shippingAddress: "",
    paymentMethod: "card",
    sameAsBilling: true,
    cardNumber: "",
    cvv: "",
  });

  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const confirmBankTransfer = () => {
    if (!receiptFile) {
      alert("Please upload a receipt image to confirm your payment.");
      return;
    }

    // Simulate file upload and payment confirmation
    alert(
      `Payment confirmed! Receipt "${receiptFile.name}" uploaded successfully.`
    );
    navigate("/order-complete", {
      state: {
        orderSummary,
        subtotal,
        shipping,
        tax,
        total,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    navigate("/order-complete", {
      state: {
        orderSummary,
        subtotal,
        shipping,
        tax,
        total,
      },
    });
  };

  return (
    <div className="flex justify-between flex-wrap p-6 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-3/5 p-6 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Checkout</h2>

        {/* Personal Details Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Personal Details
          </h3>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
        </div>

        {/* Address Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Address</h3>
          <input
            type="text"
            name="billingAddress"
            placeholder="Billing Address"
            value={formData.billingAddress}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <div className="flex items-center mb-4">
            <input
              id="sameAsBilling"
              type="checkbox"
              name="sameAsBilling"
              checked={formData.sameAsBilling}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="sameAsBilling" className="text-gray-700">
              Use same address for shipping
            </label>
          </div>
          {!formData.sameAsBilling && (
            <input
              type="text"
              name="shippingAddress"
              placeholder="Shipping Address"
              value={formData.shippingAddress}
              onChange={handleChange}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            />
          )}
        </div>

        {/* Payment Details Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Payment Details
          </h3>
          <div className="flex items-center mb-4">
            <input
              id="paymentMethod"
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === "card"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="paymentMethod" className="text-gray-700">
              Credit/Debit Card
            </label>
          </div>
          {formData.paymentMethod === "card" && (
            <div className="mb-4">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                required
                maxLength={3}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md"
              />
            </div>
          )}
          <div className="flex items-center mb-4">
            <input
              id="paymentMethodCash"
              type="radio"
              name="paymentMethod"
              value="cashOnDelivery"
              checked={formData.paymentMethod === "cashOnDelivery"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="paymentMethodCash" className="text-gray-700">
              Cash on Delivery
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="paymentMethodTrans"
              type="radio"
              name="paymentMethod"
              value="bankTransfer"
              checked={formData.paymentMethod === "bankTransfer"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="paymentMethodTrans" className="text-gray-700">
              Bank Transfer
            </label>
          </div>

          {formData.paymentMethod === "bankTransfer" && (
            <>
              <div className="p-4 mb-4 bg-gray-100 border border-gray-300 rounded-md">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Transfer Details:
                </h4>
                <p className="text-gray-700">Bank Name: Mock Bank</p>
                <p className="text-gray-700">Account Name: John Doe</p>
                <p className="text-gray-700">Account Number: 1234567890</p>
                <p className="text-gray-700">
                  Reference: <strong>Your Order ID</strong>
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Upload Payment Receipt:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-md "
                />
              </div>
              <button
                type="button"
                onClick={confirmBankTransfer}
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-500"
              >
                Confirm Payment
              </button>
            </>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-500"
          onClick={handleClearCart}
        >
          Place Order
        </button>
      </form>

      {/* Right Section: Order Summary */}
      <div className="w-full md:w-1/3 p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h3>
        <ul className="mb-4">
          {orderSummary.map((item, index) => (
            <li key={index} className="flex justify-between mb-3 text-gray-800">
              <span>
                {item.product} x{item.quantity}
              </span>
              <span>฿ {(item.quantity * item.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <h4 className="text-lg font-bold text-gray-900">
          Subtotal: ฿ {subtotal.toFixed(2)}
        </h4>
        <h4 className="text-lg font-bold text-gray-900">
          Shipping: ฿ {shipping.toFixed(2)}
        </h4>
        <h4 className="text-lg font-bold text-gray-900">Tax: ฿ {tax.toFixed(2)}</h4>
        <h4 className="text-lg font-bold text-gray-900">
          Total: ฿ {total.toFixed(2)}
        </h4>
      </div>
    </div>
  );
};

export default Checkout;
