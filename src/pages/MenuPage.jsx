import { useMemo, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SyncLoader } from "react-spinners";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import useSWR from "swr";
import * as yup from "yup";
import Modal from "../components/Modal";
import Table from "../components/Table";
import { PopUpAlert } from "../utils/alert";
import { formatCurrency } from "../utils/formatter";

function MenuPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const schema = yup.object().shape({
    productName: yup.string().required("Product Name is required"),
    category: yup.string().required("Category is required"),
    price: yup.string().required("Price is required"),
    stock: yup.string().required("Stock is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

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
        accessor: "_id",
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
                onClick={() => handleModalEdit(props.row.values._id)}
              >
                <BiEditAlt />
              </button>

              <button
                className="rounded-lg bg-red-500 hover:bg-red-700 text-white w-fit p-2"
                onClick={() => handleDelete(props.row.values._id)}
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

  const { data: dataProducts, isLoading } = useSWR(
    `${import.meta.env.VITE_BACKEND_HOST}/products`,
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
    setModalTitle("Add New Item");
    setShowModal(true);
  };

  const handleModalEdit = (id) => {
    axios.get(`${import.meta.env.VITE_BACKEND_HOST}/products/${id}`).then((res) => {
      setValue("productName", res.data.name);
      setValue("category", res.data.category);
      setValue("price", res.data.price);
      setValue("stock", res.data.stock);
      setModalTitle("Edit Item");
      setShowModal(true);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_BACKEND_HOST}/products/${id}`);
  };

  const onSubmitModal = (data) => {
    console.log(data);
  };

  return (
    <section className="flex flex-col p-8">
      <h1 className="mb-4 text-2xl font-bold">Menu</h1>

      {showModal && (
        <Modal
          title={modalTitle}
          handleSubmit={handleSubmit}
          register={register}
          onSubmitModal={onSubmitModal}
          errors={errors}
          open={showModal}
          handleClose={() => {
            setShowModal(false);
            reset();
          }}
        />
      )}

      <button
        className="ml-auto mb-4 w-fit p-2 rounded-lg bg-primary hover:bg-blue-800 text-white text-sm font-bold"
        onClick={handleModalAdd}
      >
        Add New Menu
      </button>

      {!isLoading ? (
        <div className="flex flex-col gap-4 border-[1px] rounded-lg bg-white shadow-md">
          <Table columns={columns} data={dataProducts} />
        </div>
      ) : (
        <SyncLoader color="#2457ca" />
      )}
    </section>
  );
}

export default MenuPage;
