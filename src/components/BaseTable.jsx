import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableMoreDetails from "./TableMoreDetails";
// import Button from "components/BaseButton";
import { Checkbox, Skeleton } from "@mui/material";

export default function BaseTable({
  rows,
  columns,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  actionOptions,
  actionItemOnClick,
  isLoading,
  totalPage,
  skeletonVariant = "rectangular",
  showCheckbox,
  checkboxOnChange,
  allCheckboxOnChange,
  selectedRows,
  search,
  filterKey = "companyName",
}) {
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="w-full overflow-hidden mt-4">
      <TableContainer sx={{ maxHeight: "440" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {showCheckbox && (
                <TableCell>
                  <Checkbox
                    // checked={selectedRows.length === rowsPerPage}
                    // checked={selectedRows.length && selectedRows.length !==0}
                    onChange={(event) =>
                      checkboxOnChange(
                        rows,
                        event.target.checked ? "select-all" : "clear-all"
                      )
                    }
                  />
                </TableCell>
              )}
              {columns?.map((column, id) => (
                <TableCell
                  key={id}
                  align={columns.align}
                  style={{ minWidth: column.minWidth, fontSize: "0.875rem" }}
                  sx={{ fontWeight: 700 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(10).keys()].map((tr) => (
                <TableRow key={tr}>
                  {[...Array(columns?.length)?.keys()].map((td, idx) => (
                    <TableCell key={idx}>
                      <Skeleton
                        variant={skeletonVariant}
                        animation="wave"
                        sx={{ bgcolor: "gray.300" }}
                        // width={columns[idx].minWidth}
                        height={16}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : rows?.length === 0 ? (
              <p className="text-xl font-bold mt-6 mb-3 text-center">
                There are no records for this table yet
              </p>
            ) : (
              rows
                // ?.filter((item) => {
                // return search?.trim()?.length > 0
                //     ? item?.[filterKey]?.toLowerCase()?.includes(search)
                //     : item;
                // })
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {showCheckbox && (
                        <TableCell>
                          <Checkbox
                            onChange={() => checkboxOnChange(rows[index])}
                          />
                        </TableCell>
                      )}
                      {columns?.map((column, idx) => {
                        const value = row[column?.id];
                        return (
                          <TableCell
                            key={idx}
                            align={column.align}
                            style={{ fontSize: "0.8rem" }}
                          >
                            <span className="font-medium text-font">
                              {value === "ActionButton" ? (
                                <TableMoreDetails
                                  options={actionOptions}
                                  itemOnClick={(itm) =>
                                    actionItemOnClick(itm, value, row)
                                  }
                                />
                              ) : column.format ? (
                                column.format(value, row)
                              ) : (
                                value
                              )}
                            </span>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        page={page}
        rowsPerPage={rowsPerPage}
        count={totalPage || rows?.length}
        rowsPerPageOptions={[10, 25, 100]}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      >
        {
  // console.log({totalPage, rows})
}
      </TablePagination>
    </div>
  );
}
