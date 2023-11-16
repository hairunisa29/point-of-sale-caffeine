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
              className="w-fit p-2 rounded-lg bg-primary hover:bg-blue-800 text-white"
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
    <section className="flex flex-col p-8">
      <h1 className="mb-4 text-2xl font-bold">Transaction History</h1>

      {!isLoading ? (
        <div className="flex flex-col gap-4 border-[1px] rounded-lg bg-white shadow-md">
          <Table columns={columns} data={data} />
        </div>
      ) : (
        <SyncLoader color="#2457ca" />
      )}
    </section>
  );
}

export default TransactionHistoryPage;
