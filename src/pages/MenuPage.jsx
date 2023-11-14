import { useMemo } from "react";
import Table from "../components/Table";
import { formatCurrency } from "../utils/formatter";
import { PopUpAlert } from "../utils/alert";
import useSWR from "swr";
import { SyncLoader } from "react-spinners";

function MenuPage() {
  const columns = useMemo(
    () => [
      {
        Header: "No",
        Cell: (props) => props.cell.row.index + 1,
      },
      {
        Header: "Product ID",
        accessor: "id",
        disableSortBy: true,
      },
      {
        Header: "Product Name",
        accessor: "name",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => formatCurrency(value),
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
    ],
    []
  );

  const fetchData = (url) => axios.get(url).then((response) => response.data);

  const { data, isLoading } = useSWR(
    "http://localhost:3000/products",
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
      <h1 className="text-2xl font-bold mb-4">Menu</h1>

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

export default MenuPage;
