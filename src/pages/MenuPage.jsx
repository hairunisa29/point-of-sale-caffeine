import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SyncLoader } from "react-spinners";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import useSWR from "swr";
import * as yup from "yup";
import axios from "../config/axios/axios";
import Modal from "../components/Modal";
import Table from "../components/Table";
import { PopUpAlert, ConfirmAlert } from "../utils/alert";
import { formatCurrency } from "../utils/formatter";

function MenuPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [productId, setProductId] = useState(null);

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
        Cell: (props) => {
          return (
            <div className="flex gap-4">
              <div className="rounded-lg w-16 h-16">
                <img
                  src={`${import.meta.env.VITE_BACKEND_HOST}/${
                    props.row.original.image
                  }`}
                  alt={props.row.values.name}
                  className="rounded-lg w-full h-full object-cover shadow-md"
                />
              </div>

              <span className="self-center">{props.row.values.name}</span>
            </div>
          );
        },
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

  const {
    data: dataProducts,
    isLoading,
    mutate,
  } = useSWR("/products", fetchData, {
    onError: (error) => {
      if (error) {
        PopUpAlert("Error", error?.message, "error");
      }
    },
  });

  const handleModalAdd = () => {
    setModalTitle("Add New Item");
    setShowModal(true);
  };

  const handleModalEdit = (id) => {
    axios.get(`/products/${id}`).then((res) => {
      setValue("productName", res.data.name);
      setValue("category", res.data.category);
      setValue("price", res.data.price);
      setValue("stock", res.data.stock);
      setModalTitle("Edit Item");
      setProductId(id);
      setShowModal(true);
    });
  };

  const handleDelete = (id) => {
    ConfirmAlert("Do you want to delete this product?").then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/products/${id}`)
          .then(() => mutate())
          .catch((error) => {
            PopUpAlert("Error", error?.message, "error");
          });
      }
    });
  };

  const onSubmitModal = (data) => {
    const payload = new FormData();
    payload.append("name", data.productName);
    payload.append("category", data.category);
    payload.append("price", parseInt(data.price));
    payload.append("stock", parseInt(data.stock));
    payload.append("image", data.image[0]);

    if (modalTitle === "Add New Item") {
      axios
        .post("/products", payload, {
          headers: {
            contentType: "multipart/form-data",
          },
        })
        .then(() => {
          PopUpAlert(
            "Product has been created",
            "Successfully added a new product!",
            "success"
          ).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              reset();
              setShowModal(false);
              mutate();
            }
          });
        })
        .catch((error) => {
          PopUpAlert("Error", error?.message, "error");
        });
    } else {
      axios
        .put(`/products/${productId}`, payload, {
          headers: {
            contentType: "multipart/form-data",
          },
        })
        .then(() => {
          PopUpAlert(
            "Product has been updated",
            "Successfully updated a product!",
            "success"
          ).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              reset();
              setShowModal(false);
              mutate();
            }
          });
        })
        .catch((error) => {
          PopUpAlert("Error", error?.message, "error");
        });
    }
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
