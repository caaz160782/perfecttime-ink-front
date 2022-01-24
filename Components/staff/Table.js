import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Button, Typography } from "@mui/material";
import Router from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "./../../utils/temaConfig";
import clienteAxios from "../../utils/axios";
import { Snackbar } from "@mui/material";
import { useState, useContext } from "react";
//import { useLocalStorage } from "../../hooks/useLocalStorage";
import { AuthContext } from "../../Context/AuthContext";
import { set } from "date-fns";
import AlertDialog from "./Alert";
import AlertDeleteTable from "./AlertDeletedTable";

function TablePaginationActions(props) {
  // const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton disabled={page === 0} aria-label="first page">
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable({
  staff,
  reload,
  verInactivos,
}) {
  //console.log("staf", staff);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  //const [valToken, setToken] = useLocalStorage("userVal", "");
  const { auth, guardarAuth, logOut } = useContext(AuthContext);

  const matches = useMediaQuery(theme.breakpoints.down("md"));

  function createData(name, lastName, _id) {
    return { name, lastName, _id };
  }

  // const [rows, setRows] = React.useState([])
  //const rows = staff.map(x=>createData(x.name,x.lastName,x._id))
  staff.map((x) => createData(x.name, x.lastName, x._id));
  //console.log("mis rows", staff);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - staff.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const eliminar = (id) => {
    // console.log(id);
    clienteAxios
      .delete(`/staff/${id}`, {
        //headers: { apitoken: valToken.token },
        headers: { apitoken: auth.token },
      })
      .then((respuesta) => {
        setAlert({
          open: true,
          message: respuesta.data.message.toUpperCase(),
          backgroundColor: "#519259",
          fontWeight: "500",
        });
        setTimeout(() => {
          reload();
        }, 4000);

        // router.push("/"); //dirigir a la pagina de inicio
        //  document.querySelector("#form").reset();
      })
      .catch((err) => {
        setAlert({
          open: true,
          message: "error al eliminar",
          backgroundColor: "#DD4A48",
        });
      });
  };

  const reactivar = (id, cliente = {}) => {
    // console.log(cliente);
    clienteAxios
      .patch(`/staffInac/${id}`, cliente, {
        //  headers: { apitoken: valToken.token },
        headers: { apitoken: auth.token },
      })
      .then((respuesta) => {
        setAlert({
          open: true,
          message: respuesta.data.message.toUpperCase(),
          backgroundColor: "#519259",
          fontWeight: "500",
        });
        setTimeout(() => {
          reload();
        }, 3000);
      })
      .catch((err) => {
        setAlert({
          open: true,
          message: "error al reactivar",
          backgroundColor: "#DD4A48",
        });
      });
  };

  const miTabla = (row) => {
    return (
      <TableRow key={row._id}>
        <TableCell component="th" scope="row">
          {`${row.name.toUpperCase()} ${row.lastName.toUpperCase()}`}
        </TableCell>

        <TableCell style={{ width: 100 }} align="left">
          <Button
            variant="outlined"
            onClick={(e) => Router.push(`/staff/${row._id}`)}
          >
            {matches ? <EditIcon></EditIcon> : "editar"}
          </Button>
        </TableCell>
        <TableCell style={{ width: 100 }} align="left">
          <AlertDeleteTable
            eliminar={() => {
              eliminar(row._id);
            }}
          ></AlertDeleteTable>
        </TableCell>
      </TableRow>
    );
  };
  const miTablaInac = (row) => {
    return (
      <TableRow key={row._id}>
        <TableCell
          style={{ backgroundColor: "#fff" }}
          component="th"
          scope="row"
        >
          {`${row.name.toUpperCase()} ${row.lastName.toUpperCase()} `}
        </TableCell>
        <TableCell
          style={{ color: "rgb(91, 107, 119)" }}
          component="th"
          scope="row"
        ></TableCell>

        <TableCell style={{ width: 100 }} align="left">
          <AlertDialog reactivar={() => reactivar(row._id, row)}></AlertDialog>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <Snackbar
        open={alert.open}
        message={alert.message}
        // style={{ height: "100%" }}
        ContentProps={{
          style: {
            backgroundColor: alert.backgroundColor,
            fontWeight: alert.fontWeight,
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
      <TableContainer component={Paper}>
        <Table
          md={{ maxWidth: 600 }}
          sx={{ minWidth: 400 }}
          aria-label="custom pagination table"
        >
          <TableBody>
            {(rowsPerPage > 0
              ? staff.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : staff
            ).map((row) => (row.statusUser ? miTabla(row) : miTablaInac(row)))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 1, { label: "All", value: -1 }]}
                colSpan={3}
                count={staff.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
