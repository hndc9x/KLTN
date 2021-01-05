import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ImportProducts } from "../../actions";
import "./style.css";
import {
  IoIosAddCircleOutline,
} from "react-icons/io";
import {
  CButton,
  CInput,
  CDataTable,
  CBadge,
  CCollapse,
  CCardBody,
} from "@coreui/react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

/**
 * @author
 * @function WareHouse
 **/

const WareHouse = (props) => {
  const product = useSelector((state) => state.product);
  const [details, setDetails] = useState([]);
 // const [items, setItems] = useState(product.products);
  const [stock , setStock] = useState("");
  const dispatch = useDispatch();

  const ImportProduct = (data) => {
    console.log(data);
    console.log(stock);
    console.log(data.stock);
    const totalStock = data.stock + Number(stock);
    console.log(totalStock);
    const form = {
        "_id" : data._id,
        "sold" : data.sold,
        "stock" : totalStock
    };
    console.log(form);
    //console.log(data.stock);
    dispatch(ImportProducts(form));
  }



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
    { key: "name", _style: { width: "60%" } },
    "sold",
    "stock",
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
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };

  const RenderTableProduct = () => {
    return (
      <CDataTable
        items={product.products}
        fields={fields}
        columnFilter
        tableFilter
        footer
        itemsPerPageSelect
        itemsPerPage={10}
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
                  <p className="text-muted">Import : {item.registered} 
                  <CInput
                    placeholder="Enter Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="form-control-warning"
                    id="inputWarning2i"
                    required
                    type="number"
                  />
                  </p>
                  <CButton onClick ={() => ImportProduct(item)}  size="sm" color="info">
                    <IoIosAddCircleOutline /> Import
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
              <h3>WareHouse</h3>
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

export default WareHouse;
