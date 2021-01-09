import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ImportProducts, updateOrder } from "../../actions";
import "./style.css";
import {
  CButton,
  CDataTable,
  CBadge,
  CCollapse,
  CCardBody,
} from "@coreui/react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

/**
 * @author
 * @function Order
 **/

const Order = (props) => {
  const product = useSelector((state) => state.product);
  const order = useSelector((state) => state.order);
  const [details, setDetails] = useState([]);
  // const [items, setItems] = useState(product.products);
  const [stock, setStock] = useState("");
  const [changeStatusPacked, setChangeStatusPacked] = useState(false);
  const [changeStatusDelivering, setChangeStatusDelivering] = useState(false);
  const [changeStatusCompleted, setChangeStatusCompleted] = useState(false);

  const dispatch = useDispatch();

  const ramdomId = () => {
    return Math.random();
  }

  const UpdateOrder = (data) => {
    console.log(data);
    // console.log(data._id);
    if (changeStatusDelivering === true && changeStatusCompleted === false && changeStatusPacked === false) {
      const form = {
        _id : data._id,
        delivering: changeStatusDelivering,
        isCompleted: changeStatusCompleted,
        packed : changeStatusPacked,
        status: "Delivering",
      };
      console.log(form);
      dispatch(updateOrder(form));
      setChangeStatusPacked(false);
      setChangeStatusDelivering(false);
      setChangeStatusCompleted(false);
    }else if(changeStatusDelivering === false && changeStatusCompleted === false && changeStatusPacked === true){
      const form = {
        _id : data._id,
        delivering: changeStatusDelivering,
        isCompleted: changeStatusCompleted,
        packed : changeStatusPacked,
        status: "Packed",
      };
      console.log(form);
      dispatch(updateOrder(form));
      setChangeStatusPacked(false);
      setChangeStatusDelivering(false);
      setChangeStatusCompleted(false);
    }else if(changeStatusDelivering === false && changeStatusCompleted === true && changeStatusPacked === false){
      const form = {
        _id : data._id,
        delivering: changeStatusDelivering,
        isCompleted: changeStatusCompleted,
        packed : changeStatusPacked,
        status: "Completed",
      };
      console.log(form);
      dispatch(updateOrder(form));
      setChangeStatusPacked(false);
      setChangeStatusDelivering(false);
      setChangeStatusCompleted(false);
    }else {
      alert("Only one Status");
      setChangeStatusPacked(false);
      setChangeStatusDelivering(false);
      setChangeStatusCompleted(false);
    }
  };
  const ImportProduct = (data) => {
    console.log(data);
    console.log(stock);
    console.log(data.stock);
    const totalStock = data.stock + Number(stock);
    console.log(totalStock);
    const form = {
      _id: data._id,
      sold: data.sold,
      stock: totalStock,
    };
    console.log(form);
    dispatch(ImportProducts(form));
  };

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "nameUser", _style: { width: "25%" } },
    "email",
    "total",
    "phone",
    "status",
    "note",
    "date",
    // { key: 'role', _style: { width: '20%'} },
    // { key: 'status', _style: { width: '20%'} },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];
  const getBadge = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Packed":
        return "primary";
      case "Delivering":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "secondary";
    }
  };

  const RenderTableProduct = () => {
    return (
      <CDataTable
        items={order.orders}
        fields={fields}
        columnFilter
        tableFilter
        footer
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        pagination
        scopedSlots={{
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          show_details: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(index);
                  }}
                >
                  {details.includes(index) ? "Hide" : "Show"}
                </CButton>
              </td>
            );
          },
          details: (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  <h4>{item.username}</h4>
                  <p className="text-muted">
                    Change Status : {item.registered}
                  </p>
                  <Form>
                    <Form.Check
                      type="switch"
                      id={ramdomId()}
                      label="Packed"
                      value={changeStatusPacked}
                      onChange={(e) => setChangeStatusPacked(e.target.checked)}
                    />
                  </Form>
                  <Form>
                    <Form.Check
                      type="switch"
                      id={ramdomId()}
                      label="Delivering"
                      value={changeStatusDelivering}
                      onChange={(e) =>
                        setChangeStatusDelivering(e.target.checked)
                      }
                    />
                  </Form>
                  <Form>
                    <Form.Check
                      type="switch"
                      id={ramdomId()}
                      label="Completed"
                      value={changeStatusCompleted}
                      onChange={(e) =>
                        setChangeStatusCompleted(e.target.checked)
                      }
                    />
                  </Form>
                  <CButton
                    onClick={() => UpdateOrder(item)}
                    size="sm"
                    color="info"
                  >
                    Accept
                  </CButton>
                  <CButton
                    onClick={() => {
                      toggleDetails(index);
                    }}
                    size="sm"
                    color="danger"
                    className="ml-1"
                  >
                    Cancel
                  </CButton>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Order</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{RenderTableProduct()}</Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Order;
