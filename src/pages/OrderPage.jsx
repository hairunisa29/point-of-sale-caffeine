import axios from "axios";
import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { GoSearch } from "react-icons/go";
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

function OrderPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const fetchData = (url) => axios.get(url).then((response) => response.data);

  const { data, isLoading, error } = useSWR(
    "http://localhost:3000/products",
    fetchData
  );

  const categories = [
    "All Items",
    ...new Set(data?.map((item) => item.category)),
  ];

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQty(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQty(id));
  };

  const handleRemoveCartItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleFilterCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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

  const cartTotalPrice = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  return (
    <section className="flex">
      <div className="w-full bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-4">Order</h1>

        {!isLoading ? (
          <>
            <div className="flex justify-between">
              <div className="flex gap-4 mb-4">
                {categories?.map((category, index) => (
                  <CategoryItem
                    key={index}
                    category={category}
                    selectedCategory={selectedCategory}
                    handleFilterCategory={() => handleFilterCategory(category)}
                  />
                ))}
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="Search"
                  placeholder="Search product..."
                  className="w-64 rounded-md border-gray-200 p-3 shadow-sm sm:text-sm"
                  value={search}
                  onChange={handleSearch}
                />

                <GoSearch className="text-base absolute inset-y-3 end-3" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {products?.map((product) => (
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

      <div className="sticky top-0 h-screen bg-white w-[480px] p-8 pr-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold mb-4">Current Order</h3>

          <div className="flex flex-col gap-4 max-h-[280px] overflow-y-auto scrollbar">
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
                  handleRemoveCartItem={() => handleRemoveCartItem(item.id)}
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

          <button className="rounded-lg bg-primary text-white w-full p-2 hover:bg-red-700">
            Continue to Payment
          </button>
        </div>
      </div>
    </section>
  );
}

export default OrderPage;
