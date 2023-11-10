import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { clearCart } from "../store/reducers/cartSlice";
import OrderDetailItem from "../components/OrderDetailItem";
import { formatCurrency } from "../utils/formatter";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const [paid, setPaid] = useState(null);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartTotalPrice = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const handleInputPaid = (e) => {
    setPaid(e.target.value);
  };

  const handleFinishPayment = () => {
    const payload = {
      createdAt: new Date(),
      totalPrice: cartTotalPrice,
      products: cartItems,
    };
    axios
      .post("http://localhost:3000/booking", payload)
      .then(() => {
        Swal.fire({
          title: "Payment Succeed",
          text: "You have successfully made an order!",
          icon: "success",
        });
        dispatch(clearCart());
        navigate("/order");
      })
      .catch((error) => {
        Swal.fire({
          title: "Payment Failed",
          text: error?.message,
          icon: "error",
        });
      });
  };

  return (
    <section className="flex flex-row">
      <div className="w-3/4 p-8">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        <div className="flex flex-col gap-4">
          {cartItems?.map((item) => (
            <OrderDetailItem
              key={item.id}
              image={item.img}
              name={item.name}
              price={item.price}
              qty={item.quantity}
            />
          ))}
        </div>
      </div>

      <div className="sticky top-0 h-screen bg-white w-1/4 p-8 pr-4 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">Payment</h3>

          <div className="flex justify-between">
            <span className="text-lg">Total</span>
            <span className="font-bold text-lg">
              {formatCurrency(cartTotalPrice)}
            </span>
          </div>

          <div>
            <label htmlFor="paid" className="text-lg">
              Paid
            </label>
            <input
              id="paid"
              placeholder="Rp 0"
              className="w-full rounded-md border-[1px] border-gray-200 p-3 shadow-sm sm:text-sm"
              value={paid}
              onChange={handleInputPaid}
            />
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Changes</span>
            <span className="font-bold text-lg">
              {paid - cartTotalPrice > 0
                ? formatCurrency(paid - cartTotalPrice)
                : 0}
            </span>
          </div>
        </div>

        <button
          className={`rounded-lg ${
            paid < cartTotalPrice ? "bg-red-300" : "bg-primary hover:bg-red-700"
          } text-white w-full p-2`}
          onClick={handleFinishPayment}
          disabled={paid < cartTotalPrice}
        >
          Finish Payment
        </button>
      </div>
    </section>
  );
}

export default PaymentPage;
