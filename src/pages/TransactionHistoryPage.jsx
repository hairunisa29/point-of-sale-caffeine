import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import useSWR from "swr";
import { HiEye } from "react-icons/hi";
import { formatCurrency } from "../utils/formatter";
import { SyncLoader } from "react-spinners";

function TransactionHistoryPage() {
  const fetchData = (url) => axios.get(url).then((response) => response.data);

  const { data, isLoading } = useSWR(
    "http://localhost:3000/booking",
    fetchData,
    {
      onError: (error) => {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error?.message,
          });
        }
      },
    }
  );

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>

      <div className="flex flex-col gap-4 p-4 border-[1px] rounded-lg">
        <div className="grid grid-cols-4 font-bold">
          <span>Transaction Date</span>
          <span>Transaction ID</span>
          <span>Total Price</span>
          <span>Action</span>
        </div>

        <hr />

        {!isLoading ? (
          data?.map((item) => (
            <div key={item.id} className="grid grid-cols-4 text-sm">
              <span>{moment(item.createdAt).format("l")}</span>
              <span>{item.id}</span>
              <span>{formatCurrency(item.totalPrice)}</span>
              <button
                className="rounded-lg bg-primary hover:bg-red-700 text-white w-fit p-2"
                // onClick={handleFinishPayment}
              >
                <HiEye />
              </button>
            </div>
          ))
        ) : (
          <SyncLoader color="#e55644" />
        )}
      </div>
    </section>
  );
}

export default TransactionHistoryPage;
