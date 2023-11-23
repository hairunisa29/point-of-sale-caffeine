import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { GoSearch } from "react-icons/go";
import axios from "../config/axios/axios";
import { formatCurrency } from "../utils/formatter";
import ProductCard from "../components/ProductCard";
import CategoryItem from "../components/CategoryItem";
import {
  addItem,
  incrementQty,
  decrementQty,
  removeItem,
} from "../store/reducers/cartSlice";
import CartItem from "../components/CartItem";
import { useEffect, useState } from "react";
import { PopUpAlert } from "../utils/alert";

function OrderPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const fetchData = (url) => axios.get(url).then((response) => response.data);

  const { data, isLoading } = useSWR(
    "/products",
    fetchData,
    {
      onError: (error) => {
        if (error) {
          PopUpAlert("Error", error?.message, "error");
        }
      },
    }
  );

  const categories = [
    "All Items",
    ...new Set(data?.map((item) => item.category)),
  ];

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const handleIncrement = (id) => dispatch(incrementQty(id));
  const handleDecrement = (id) => dispatch(decrementQty(id));

  const handleRemoveCartItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleFilterCategory = (category) => setSelectedCategory(category);

  const handleToPayment = () => {
    navigate("/payment");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const cartTotalPrice = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  useEffect(() => {
    if (!data) {
      return;
    }

    let duplicateProducts = [...data];
    let filteredProducts = [];

    if (selectedCategory !== "All Items") {
      filteredProducts = duplicateProducts.filter(
        (product) => product.category === selectedCategory
      );
      setProducts(filteredProducts);
    } else {
      setProducts(data);
    }

    // global search
    if (search !== "") {
      filteredProducts = duplicateProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  }, [data, search, selectedCategory]);

  return (
    <section className="flex">
      <div className="w-3/4 p-8">
        <div className="flex justify-between">
          <h1 className="mb-6 text-2xl font-bold">Order</h1>

          <div className="relative">
            <input
              type="text"
              id="Search"
              placeholder="Search product..."
              className="w-64 p-3 border-gray-200 rounded-md shadow-sm sm:text-sm"
              value={search}
              onChange={handleSearch}
            />

            <GoSearch className="absolute inset-y-3 end-3 text-base" />
          </div>
        </div>

        {!isLoading ? (
          <>
            <div className="flex mb-4 gap-4">
              {categories?.map((category, index) => (
                <CategoryItem
                  key={index}
                  category={category}
                  selectedCategory={selectedCategory}
                  handleFilterCategory={() => handleFilterCategory(category)}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {products?.map((product) => (
                <ProductCard
                  key={product._id}
                  img={product.image}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  onClickProduct={() => handleAddToCart(product)}
                />
              ))}
            </div>
          </>
        ) : (
          <SyncLoader color="#2457ca" />
        )}
      </div>

      <div className="sticky flex flex-col justify-between w-1/4 p-8 pr-4 top-0 h-screen bg-white">
        <div>
          <h3 className="mb-6 text-xl font-bold">Current Order</h3>

          <div className="flex flex-col max-h-[330px] gap-4 overflow-y-auto scrollbar">
            {cartItems?.length > 0 ? (
              cartItems?.map((item) => (
                <CartItem
                  key={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  qty={item.quantity}
                  handleIncrement={() => handleIncrement(item._id)}
                  handleDecrement={() => handleDecrement(item._id)}
                  handleRemoveCartItem={() => handleRemoveCartItem(item._id)}
                />
              ))
            ) : (
              <span>No items were added</span>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-lg">
              {formatCurrency(cartTotalPrice)}
            </span>
          </div>

          <button
            className={`w-full p-2 rounded-lg ${
              cartItems?.length === 0
                ? "bg-blue-300"
                : "bg-primary hover:bg-blue-800"
            } text-white text-sm font-bold`}
            onClick={handleToPayment}
            disabled={cartItems?.length === 0}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </section>
  );
}

export default OrderPage;
