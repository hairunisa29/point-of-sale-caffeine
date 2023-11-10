import { useMemo } from "react";
import axios from "axios";
import moment from "moment";
import useSWR from "swr";
import { HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { formatCurrency } from "../utils/formatter";
import Table from "../components/Table";
import { PopUpAlert } from "../utils/alert";

function TransactionHistoryPage() {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "No",
        Cell: (props) => props.cell.row.index + 1,
      },
      {
        Header: "Order Date",
        accessor: "createdAt",
        Cell: ({ value }) => moment(value).format("ll"),
      },
      {
        Header: "Order ID",
        accessor: "id",
        disableSortBy: true,
      },
      {
        Header: "Total Price",
        accessor: "totalPrice",
        Cell: ({ value }) => formatCurrency(value),
      },
      {
        Header: "Action",
        disableSortBy: true,
        Cell: (props) => {
          return (
            <button
              className="rounded-lg bg-primary hover:bg-red-700 text-white w-fit p-2"
              onClick={() => navigate(`/history/${props.row.values.id}`)}
            >
              <HiEye />
            </button>
          );
        },
      },
    ],
    []
  );

  const fetchData = (url) => axios.get(url).then((response) => response.data);

  const { data, isLoading } = useSWR(
    "http://localhost:3000/booking",
    fetchData,
    {
      onError: (error) => {
        if (error) {
          PopUpAlert("Error", error?.message, "error");
        }
      },
    }
  );

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>

      <div className="flex flex-col gap-4 border-[1px] rounded-lg bg-white shadow-md">
        {!isLoading ? (
          <Table columns={columns} data={data} />
        ) : (
          <SyncLoader color="#e55644" />
        )}
      </div>
    </section>
  );
}

export default TransactionHistoryPage;
