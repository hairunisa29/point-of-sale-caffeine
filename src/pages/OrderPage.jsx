import axios from "axios";
import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import ProductCard from "../components/ProductCard";
// import { productsData } from "../data/Static";
import CategoryItem from "../components/CategoryItem";
import {
  addItem,
  incrementQty,
  decrementQty,
} from "../store/reducers/cartSlice";
import CartItem from "../components/CartItem";

function OrderPage() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const fetchData = (url) => axios.get(url).then((response) => response.data);

  const { data, isLoading, error } = useSWR(
    "http://localhost:3000/products",
    fetchData
  );

  const categories = Array.from(new Set(data?.map((item) => item.category)));

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQty(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQty(id));
  };

  return (
    <section className="flex">
      <div className="w-full bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-4">Order</h1>

        {!isLoading ? (
          <>
            <div className="flex gap-4 mb-4">
              {categories?.map((category, index) => (
                <CategoryItem key={index} category={category} />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {data?.map((product) => (
                <ProductCard
                  key={product.id}
                  img={product.img}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  onClickProduct={() => handleAddToCart(product)}
                />
              ))}
            </div>
          </>
        ) : (
          <SyncLoader color="#e55644" />
        )}
      </div>

      <div className="sticky top-0 h-screen bg-white w-[480px] p-8 pr-4">
        <h3 className="font-bold mb-4">Current Order</h3>
        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto scrollbar">
          {cartItems?.length > 0 ? (
            cartItems?.map((item) => (
              <CartItem
                key={item.id}
                image={item.img}
                name={item.name}
                price={item.price}
                qty={item.quantity}
                handleIncrement={() => handleIncrement(item.id)}
                handleDecrement={() => handleDecrement(item.id)}
              />
            ))
          ) : (
            <span>No items were added</span>
          )}
        </div>
      </div>
    </section>
  );
}

export default OrderPage;
