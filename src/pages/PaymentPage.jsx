import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { paymentMethods } from "../data/Static";
import OrderDetailItem from "../components/OrderDetailItem";
import { clearCart } from "../store/reducers/cartSlice";
import { formatCurrency } from "../utils/formatter";
import { PopUpAlert } from "../utils/alert";

function PaymentPage() {
  const [paid, setPaid] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartTotalPrice = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const handleInputPaid = (e) => {
    setPaid(e.target.value);
  };
  console.log(paymentMethod === "");
  const handleFinishPayment = () => {
    const payload = {
      createdAt: new Date(),
      totalPrice: cartTotalPrice,
      paymentMethod,
      products: cartItems,
    };
    axios
      .post("http://localhost:3000/booking", payload)
      .then(() => {
        PopUpAlert(
          "Payment Succeed",
          "You have successfully made an order!",
          "success"
        ).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            dispatch(clearCart());
            navigate("/order");
          }
        });
      })
      .catch((error) => {
        PopUpAlert("Payment Failed", error?.message, "error");
      });
  };

  return (
    <section className="flex flex-row">
      <div className="w-3/4 p-8">
        <h1 className="text-2xl font-bold mb-6">Order Details</h1>
        <div className="flex flex-col gap-4">
          {cartItems?.map((item) => (
            <OrderDetailItem
              key={item.id}
              image={item.img}
              name={item.name}
              price={item.price}
              qty={item.quantity}
              page="payment"
            />
          ))}
        </div>
      </div>

      <div className="sticky top-0 h-screen bg-white w-1/4 p-8 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">Payment</h3>

          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-bold text-lg">
              {formatCurrency(cartTotalPrice)}
            </span>
          </div>

          <div>
            <label htmlFor="paid">Paid</label>
            <input
              id="paid"
              placeholder="Rp 0"
              className="w-full rounded-md border-[1px] border-gray-200 p-3 shadow-sm sm:text-sm"
              value={paid}
              onChange={handleInputPaid}
            />
          </div>

          <div className="flex justify-between">
            <span>Changes</span>
            <span className="font-bold text-lg">
              {paid - cartTotalPrice > 0
                ? formatCurrency(paid - cartTotalPrice)
                : 0}
            </span>
          </div>

          <div>
            <h4 className="font-bold mb-2">Payment Method</h4>
            <div className="flex justify-between">
              {paymentMethods.map((item) => (
                <div key={item.id} className="flex flex-col gap-1">
                  <div
                    className={`rounded-lg px-6 py-4 border-[1px] ${
                      paymentMethod === item.method ? "border-primary" : ""
                    } cursor-pointer hover:border-primary`}
                    onClick={() => setPaymentMethod(item.method)}
                  >
                    <item.icon className="text-2xl text-primary" />
                  </div>
                  <span className="text-sm font-bold self-center">
                    {item.method}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className={`rounded-lg ${
            paid < cartTotalPrice || paymentMethod === ""
              ? "bg-blue-300"
              : "bg-primary hover:bg-blue-700"
          } text-white text-sm font-bold w-full p-2`}
          onClick={handleFinishPayment}
          disabled={paid < cartTotalPrice || paymentMethod === ""}
        >
          Finish Payment
        </button>
      </div>
    </section>
  );
}

export default PaymentPage;
