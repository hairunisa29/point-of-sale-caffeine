import { useMemo, useState } from "react";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import useSWR from "swr";
import Modal from "../components/Modal";
import Table from "../components/Table";
import { PopUpAlert } from "../utils/alert";
import { formatCurrency } from "../utils/formatter";

function MenuPage() {
  const [showModal, setShowModal] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: "No",
        Cell: (props) => props.cell.row.index + 1,
      },
      {
        Header: "Product Name",
        accessor: "name",
      },
      {
        Header: "Product ID",
        accessor: "id",
        disableSortBy: true,
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
      {
        Header: "Action",
        disableSortBy: true,
        Cell: (props) => {
          return (
            <div className="flex gap-4">
              <button
                className="rounded-lg bg-yellow-500 hover:bg-yellow-700 text-white w-fit p-2"
                onClick={handleModalEdit(props.row.values.id)}
              >
                <BiEditAlt />
              </button>

              <button
                className="rounded-lg bg-red-500 hover:bg-red-700 text-white w-fit p-2"
                // onClick={() => navigate(`/history/${props.row.values.id}`)}
              >
                <RiDeleteBin5Line />
              </button>
            </div>
          );
        },
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

  const handleModalAdd = () => {
    setShowModal(true);
  };

  const handleModalEdit = (id) => {};

  const handleDelete = () => {};

  return (
    <section className="flex flex-col p-8">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>

      {showModal && <Modal />}

      <button
        className="ml-auto mb-4 rounded-lg bg-primary hover:bg-blue-700 text-white text-sm font-bold w-fit p-2"
        onClick={handleModalAdd}
      >
        Add New Menu
      </button>

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
