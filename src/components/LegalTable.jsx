import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import RequestDetailsModal from "./RequestDetailsModal";

const columns = [
  { id: "cName", label: "Company Names", minWidth: 90 },
  { id: "cNum", label: "RC Number", minWidth: 100 },
  {
    id: "cType",
    label: "Company Type",
    minWidth: 90,
    // format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: "status",
    label: "Status",
    minWidth: 50,
    // format: (value) => value.toFixed(2),
  },
  {
    id: "date",
    label: "Date",
    minWidth: 90,
    // format: (value) => value.toFixed(2),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
    format: (value) => value,
  },
];

const createData = (cName, cNum, cType, status, date, action) => {
  return { cName, cNum, cType, status, date, action };
};

const rows = [...Array(50).keys()].map(() =>
  createData(
    "Prestige Slot",
    "38412-145",
    "Limited Liability",
    "Completed",
    "03-02-2021, 3:00PM",
    "View"
  )
);

// const{data, isLoading} = useQuery({
// queryKey: ['dashboard'], queryFn: permission === 'CSO' ? csoFn : ''
// })

export default function LegalTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        // border: "1px solCd green",
        mt: "1rem",
      }}
    >
      <TableContainer sx={{ maxHeight: "440" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, id) => (
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column, idx) => {
                    const value = row[column.id];
                    // console.log("MyValue: ", value)
                    return (
                      <TableCell
                        key={idx}
                        align={column.align}
                        style={{ fontSize: "0.8rem" }}
                      >
                        {column.format && typeof value === "number" ? (
                          column.format(value)
                        ) : column.format && value === "View" ? (
                          <RequestDetailsModal
                            value={value}
                            data={rows[index]}
                          />
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      ></TablePagination>
    </Paper>
  );
}
