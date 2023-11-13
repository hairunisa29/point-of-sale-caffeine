import { useMemo } from "react";
import Table from "../components/Table";
import { formatCurrency } from "../utils/formatter";

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
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
    ],
    []
  );
  return <div></div>;
}

export default MenuPage;
