/* eslint-disable react/jsx-key */
import { useTable, useSortBy, usePagination } from "react-table";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { FaSortDown, FaSortUp } from "react-icons/fa";

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow,
  } = useTable({ columns, data }, useSortBy, usePagination);

  const { pageIndex } = state;

  return (
    <>
      <table {...getTableProps()} className="table-fixed">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="text-left border-b-[1px] pb-4"
                >
                  <div className="flex gap-2">
                    {column.render("Header")}

                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaSortDown className="self-center" />
                      ) : (
                        <FaSortUp className="self-center" />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="odd:bg-white even:bg-slate-50 text-sm"
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="py-2">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex gap-2 justify-end">
        <span className="self-center">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          className={`rounded-lg ${
            !canPreviousPage ? "bg-red-300" : "bg-primary hover:bg-red-700"
          } text-white text-sm w-fit p-2`}
          onClick={previousPage}
          disabled={!canPreviousPage}
        >
          <BiLeftArrow />
        </button>
        <button
          className={`rounded-lg ${
            !canNextPage ? "bg-red-300" : "bg-primary hover:bg-red-700"
          } text-white text-sm w-fit p-2`}
          onClick={nextPage}
          disabled={!canNextPage}
        >
          <BiRightArrow />
        </button>
      </div>
    </>
  );
}

export default Table;
