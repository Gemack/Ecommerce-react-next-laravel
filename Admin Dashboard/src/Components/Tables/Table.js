import { useState, useEffect } from "react";
import "./Table.scss";
import { Button, Modal } from "react-bootstrap";
import { Product } from "../../Data/Data";
import { Product3 } from "../../Data/Data";
import Swal from "sweetalert2";
import { Admin } from "../../Data/Data";
import { Persons } from "../../Data/Data";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

// =========================================== All transactions================================================
export const ListTable = () => {
  return (
    <div className="Table">
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell className="tableCell">Client Name&nbsp;</TableCell>
              <TableCell className="tableCell">Date&nbsp;</TableCell>
              <TableCell className="tableCell">Amount&nbsp;</TableCell>
              <TableCell className="tableCell">M.O.P&nbsp;</TableCell>
              <TableCell className="tableCell">Status&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Product.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell align="right">
                  <div className="cellImg">
                    <img src={row.img} alt="img" className="Img" />
                    {row.name}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.clientName}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">{row.MOP}</TableCell>
                <TableCell className="tableCell">
                  <div className={`status ${row.status}`}>{row.status}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
// Individuals trnasactions
export const ListTable2 = () => {
  return (
    <div className="Table">
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell className="tableCell">Client Name&nbsp;</TableCell>
              <TableCell className="tableCell">Date&nbsp;</TableCell>
              <TableCell className="tableCell">Amount&nbsp;</TableCell>
              <TableCell className="tableCell">M.O.P&nbsp;</TableCell>
              <TableCell className="tableCell">Status&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Product3.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell align="right">
                  <div className="cellImg">
                    <img src={row.img} alt="img" className="Img" />
                    {row.name}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.clientName}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">{row.MOP}</TableCell>
                <TableCell className="tableCell">
                  <div className={`status ${row.status}`}>{row.status}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// ===========================================  Customer Table================================================

const userColumn = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="people" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const CustomerTable = ({ pageSize }) => {
  const [data, setData] = useState(Persons);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="Delete-button"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        rows={data}
        columns={userColumn.concat(actionColumn)}
        pageSize={pageSize}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

// Table for available products
export const ProductTable = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [product, setProduct] = useState([]);

  const PF = "http://127.0.0.1:8000/";

  const GetProduct = async () => {
    const { data } = await axios.get("/api/product");
    setProduct(data);
  };

  //======================= This function send and delete request to the databese ===============
  const DeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/product/${id}`);
      Swal.fire(
        "Product Deleted",
        "This Product has been deleted from the database",
        "success"
      );
      window.location.reload();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  // =========================================== This function delete Product from the database ====================
  const Delete = (id) => {
    handleClose();
    DeleteProduct(id);
  };
  useEffect(() => {
    GetProduct();
  }, []);

  return (
    <>
      <TableContainer className="home-table">
        <Table striped="true" bordered="true" hover="true" variant="dark">
          <TableHead style={{ background: "lime" }}>
            <TableRow>
              <TableCell className="Table-head" style={{ color: "white" }}>
                Product Image
              </TableCell>
              <TableCell style={{ color: "white" }}>Product Name</TableCell>
              <TableCell style={{ color: "white" }}>Product Category</TableCell>
              <TableCell style={{ color: "white" }}>Product Quantity</TableCell>
              <TableCell style={{ color: "white" }}>Product Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product.map((p2) => (
              <>
                <TableRow
                  key={p2.id}
                  onClick={handleShow}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <img
                      src={PF + p2.image}
                      alt={p2.image}
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell className="Table-body">{p2.name}</TableCell>
                  <TableCell className="Table-body">{p2.category}</TableCell>
                  <TableCell className="Table-body">{p2.quantity}</TableCell>
                  <TableCell className="Table-body">
                    {" "}
                    &#8358;{p2.amount}
                  </TableCell>
                  <TableCell className="Table-body"></TableCell>
                </TableRow>

                <div>
                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>DELETE PRODUCT</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      This Product will be deleted from the database permanetly
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={() => Delete(p2.id)}>
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

// Table for trending products
export const HotTable = () => {
  const [hot, setHot] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const PF = "http://127.0.0.1:8000/";
  const DeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/hot/${id}`);
      Swal.fire(
        "Product Deleted",
        "This Product has been deleted from the database",
        "success"
      );
      window.location.reload();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const Delete = (id) => {
    handleClose();
    DeleteProduct(id);
  };

  const GetHot = async () => {
    const { data } = await axios.get("/api/hot");
    setHot(data);
  };

  useEffect(() => {
    GetHot();
  }, []);

  return (
    <TableContainer className="home-table">
      <Table striped bordered hover variant="dark">
        <TableHead style={{ background: "lime" }}>
          <TableRow>
            <TableCell className="Table-head" style={{ color: "white" }}>
              Product Image
            </TableCell>
            <TableCell style={{ color: "white" }}>Product Name</TableCell>
            <TableCell style={{ color: "white" }}>Product Quantity</TableCell>
            <TableCell style={{ color: "white" }}>Product Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hot.map((p2) => (
            <>
              <TableRow
                key={p2.id}
                onClick={handleShow}
                style={{ cursor: "pointer" }}
              >
                <TableCell className="Table-body">
                  <img
                    src={PF + p2.image}
                    alt={p2.image}
                    style={{ width: 60, height: 60, objectFit: "cover" }}
                  />
                </TableCell>
                <TableCell className="Table-body">{p2.name}</TableCell>
                <TableCell className="Table-body">{p2.quantity}</TableCell>
                <TableCell className="Table-body">
                  {" "}
                  &#8358;{p2.amount}
                </TableCell>
                <TableCell className="Table-body"></TableCell>
              </TableRow>
              <div>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>DELETE PRODUCT</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    This Product will be deleted from the database permanetly
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={() => Delete(p2.id)}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Administration table
export const AdminTable = () => {
  return (
    <TableContainer className="home-table">
      <Table striped bordered hover variant="dark">
        <TableHead style={{ background: "lime" }}>
          <TableRow>
            <TableCell className="Table-head" style={{ color: "white" }}>
              Profile Picture
            </TableCell>
            <TableCell style={{ color: "white" }}> Fullname</TableCell>
            <TableCell style={{ color: "white" }}>Username</TableCell>
            <TableCell style={{ color: "white" }}>email Address</TableCell>
            <TableCell style={{ color: "white" }}>Phone Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Admin.map((a) => (
            <TableRow key={a.id}>
              <TableCell className="Table-body">
                <img
                  src={a.image}
                  alt={a.image}
                  style={{ width: 70, height: 70, objectFit: "cover" }}
                />
              </TableCell>
              <TableCell className="Table-body">{a.name}</TableCell>
              <TableCell className="Table-body">{a.username}</TableCell>
              <TableCell className="Table-body">{a.email}</TableCell>
              <TableCell className="Table-body">{a.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
