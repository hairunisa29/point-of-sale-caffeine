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

  const { data } = useSWR(`http://localhost:3000/booking/${id}`, fetchData);

  return (
    <section className="p-8">
      <div className="flex mb-4 gap-4">
        <BsArrowLeftCircle
          className="self-center text-primary text-lg cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl font-bold">Transaction Detail</h1>
      </div>

      <div className="rounded-lg bg-white p-4">
        <h3 className="font-bold">Order ID #{data?.id}</h3>
        <h3>{moment(data?.createdAt).format("LLL")}</h3>

        <h3 className="font-bold my-4">Products</h3>

        <div className="grid grid-cols-4 gap-4 font-bold mb-2">
          <div className="col-span-2">
            <span>Product Name</span>
          </div>
          <span>Quantity</span>
          <span>Total Price</span>
        </div>

        <div className="flex flex-col gap-4 mb-4">
          {data?.products.map((product) => (
            <OrderDetailItem
              key={product.id}
              image={product.img}
              name={product.name}
              price={product.price}
              qty={product.quantity}
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
