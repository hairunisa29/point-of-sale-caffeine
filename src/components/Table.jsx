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
          {headerGroups.map((headerGroup, idx1) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={idx1}>
              {headerGroup.headers.map((column, idx2) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={idx2}
                  className="text-left border-b-[1px] p-4"
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
          {page.map((row, idx3) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={idx3}
                className="odd:bg-white even:bg-slate-50 text-sm"
              >
                {row.cells.map((cell, idx4) => (
                  <td {...cell.getCellProps()} key={idx4} className="py-2 px-4">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex gap-2 pt-1 p-4 justify-end">
        <span className="self-center">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          className={`rounded-lg ${
            !canPreviousPage ? "bg-blue-300" : "bg-primary hover:bg-blue-800"
          } text-white text-sm w-fit p-2`}
          onClick={previousPage}
          disabled={!canPreviousPage}
        >
          <BiLeftArrow />
        </button>
        <button
          className={`rounded-lg ${
            !canNextPage ? "bg-blue-300" : "bg-primary hover:bg-blue-800"
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
