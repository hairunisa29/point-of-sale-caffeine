import axios from "axios";
import useSWR from "swr";
import ProductCard from "../components/ProductCard";
import { productsData } from "../data/Static";
import CategoryItem from "../components/CategoryItem";
import { SyncLoader } from "react-spinners";

function OrderPage() {
  const fetchData = (url) => axios.get(url).then((response) => response.data);

  const { data, isLoading, error } = useSWR(
    "http://localhost:3000/products",
    fetchData
  );

  const categories = Array.from(new Set(data?.map((item) => item.category)));

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
                  qty={product.qty}
                />
              ))}
            </div>
          </>
        ) : (
          <SyncLoader color="#e55644" />
        )}
      </div>

      <div className="bg-white w-[480px] p-8">tes</div>
    </section>
  );
}

export default OrderPage;
