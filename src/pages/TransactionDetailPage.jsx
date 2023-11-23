import axios from "axios";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import useSWR from "swr";
import OrderDetailItem from "../components/OrderDetailItem";
import { formatCurrency } from "../utils/formatter";

function TransactionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = (url) => axios.get(url).then((response) => response.data);

  const { data } = useSWR(`${import.meta.env.VITE_BACKEND_HOST}/orders/${id}`, fetchData);

  return (
    <section className="p-8">
      <div className="flex mb-4 gap-4">
        <BsArrowLeftCircle
          className="self-center text-primary text-lg cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl font-bold">Transaction Detail</h1>
      </div>

      <div className="p-4 rounded-lg bg-white">
        <h3 className="font-bold">Order ID #{data?._id}</h3>
        <h3 className="text-sm">{moment(data?.createdAt).format("LLL")}</h3>

        <h3 className="my-4 font-bold">Products</h3>

        <div className="grid grid-cols-4 mb-2 gap-4 font-bold">
          <div className="col-span-2">
            <span>Product Name</span>
          </div>
          <span>Quantity</span>
          <span>Total Price</span>
        </div>

        <div className="flex flex-col mb-4 gap-4">
          {data?.products.map((product) => (
            <OrderDetailItem
              key={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              qty={product.quantity}
              page="history"
            />
          ))}
        </div>

        <hr />

        <div className="flex justify-between mt-4">
          <span>Total</span>
          <span className="font-bold text-lg text-primary">
            {formatCurrency(data?.totalPrice)}
          </span>
        </div>
      </div>
    </section>
  );
}

export default TransactionDetailPage;
