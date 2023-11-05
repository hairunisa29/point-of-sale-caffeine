import { useSelector } from "react-redux";
import OrderDetailItem from "../components/OrderDetailItem";

function PaymentPage() {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <section className="flex flex-row">
      <div className="w-3/4 bg-gray-100 p-8">
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
        <h3 className="text-lg font-bold mb-4">Current Order</h3>
      </div>
    </section>
  );
}

export default PaymentPage;
