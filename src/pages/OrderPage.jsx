import axios from "axios";
import useSWR from "swr";
import ProductCard from "../components/ProductCard";
import { productsData } from "../data/Static";

function OrderPage() {
  // const fetchData = (url) => axios.get(url).then((response) => response.data);

  // const { data, isLoading, error } = useSWR(
  //   "http://0.0.0.0:3000/products",
  //   fetchData
  // );

  return (
    <section className="flex">
      <div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Order</h1>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {productsData?.map((product) => (
            <ProductCard
              key={product.id}
              img={product.img}
              name={product.name}
              price={product.price}
              qty={product.qty}
            />
          ))}
        </div>
      </div>

      <div></div>
    </section>
  );
}

export default OrderPage;
