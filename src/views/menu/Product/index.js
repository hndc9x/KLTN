import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TheFooter, TheHeader, TheSidebar } from "../../../containers";
import  {Table} from 'react-bootstrap';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CLabel,
  CFormGroup,
  CInputFile,
  CInput,
  CInvalidFeedback,
  CValidFeedback,
  CSelect,
  CDataTable,
  CBadge,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { addProduct } from "../../../actions";
import usersData from "../../users/UsersData";
const Product = (props) => {
  // modal
  const [info, setInfo] = useState(false);

  // modal body
  const [name, setName] = useState(``);
  const [quantity, setQuantity] = useState(``);
  const [price, setPrice] = useState(``);
  const [description, setDescription] = useState(``);
  const [categoryId, setCategoryId] = useState(``);
  const [productPictures, setProductPictures] = useState(``);

  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));

    setInfo(!info); // đóng modal
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  // table
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
  // const fields = [
  //   "name",
  //   "Price",
  //   "Quantity",
  //   "Description",
  //   "Category",
  //   "Product Pictures",
  // ];

  const fields = ["name", "registered", "role", "status"];

  // console.log(product.name);
  // const dataTable = [
  //   {id:product._id , name:product.name}
  // ]
  // showtable
  const indexTable = (index) => {
    for(var i = 1 ;i<10;i++){
      index = index + 1;
      return <td>{index}</td>
    }
  }

  const renderProducts = () => {
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>All Product</CCardHeader>
            <CCardBody>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Description</th>
                    {/* <th>Category</th>
                    <th>Product Pictures</th> */}
                  </tr>
                </thead>
                <tbody>
                {product.products.length > 0
                ? product.products.map((product) => (
                    <tr key={product._id}>
                      {/* <td>
                        {indexTable(0)}
                        </td> */}
                        {indexTable(0)}
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{product.description}</td>
                      {/* <td>{product.category}</td>
                      <td>{product.productPictures}</td> */}
                    </tr>
                  ))
                : null}
                </tbody>
              </Table>
              {/* <CDataTable
                items={usersData}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                }}
               
              /> */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    );
  };

  return (
    <>
      <div className="c-app c-default-layout">
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <CRow>
              <CCol>
                {/* <CCard> khung trắng */}
                <CCardBody>
                  <CButton
                    color="success"
                    onClick={() => setInfo(!info)}
                    className="mr-1"
                  >
                    <CIcon name="cil-lightbulb" /> Add New Product
                  </CButton>

                  <CModal
                    show={info}
                    onClose={() => setInfo(!info)}
                    color="success"
                  >
                    <CModalHeader closeButton>
                      <CModalTitle>Add New Product</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <h3>Enter Fill Information</h3>
                      <CForm className="was-validated">
                        <CFormGroup>
                          <CInput
                            placeholder="Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control-warning"
                            id="inputWarning2i"
                            required
                          />
                          <CInvalidFeedback className="help-block">
                            Please provide a valid information
                          </CInvalidFeedback>
                          <CValidFeedback className="help-block">
                            Input provided
                          </CValidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CInput
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="form-control-warning"
                            id="inputWarning2i"
                            required
                          />
                          <CInvalidFeedback className="help-block">
                            Please provide a valid information
                          </CInvalidFeedback>
                          <CValidFeedback className="help-block">
                            Input provided
                          </CValidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CInput
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="form-control-warning"
                            id="inputWarning2i"
                            required
                          />
                          <CInvalidFeedback className="help-block">
                            Please provide a valid information
                          </CInvalidFeedback>
                          <CValidFeedback className="help-block">
                            Input provided
                          </CValidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CInput
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control-warning"
                            id="inputWarning2i"
                            required
                          />
                          <CInvalidFeedback className="help-block">
                            Please provide a valid information
                          </CInvalidFeedback>
                          <CValidFeedback className="help-block">
                            Input provided
                          </CValidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <select
                            className="form-control"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                          >
                            <option>Select Category</option>
                            {createCategoryList(category.categories).map(
                              (option) => (
                                <option key={option.value} value={option.value}>
                                  {option.name}
                                </option>
                              )
                            )}
                          </select>
                        </CFormGroup>
                        {productPictures.length > 0
                          ? productPictures.map((pic, index) => (
                              <div key={index}>{pic.name}</div>
                            ))
                          : null}
                        <CFormGroup>
                          <CCol xs="12" md="9">
                            <CInputFile
                              custom
                              id="custom-file-input"
                              name="categoryImage"
                              onChange={handleProductPictures}
                            />
                            <CLabel
                              htmlFor="custom-file-input"
                              variant="custom-file"
                            >
                              Choose File
                              {/* {productPictures.length > 0
                                ? productPictures.map((pic, index) => (
                                    <div key={index}>{pic.name}</div>
                                  ))
                                : null} */}
                            </CLabel>
                          </CCol>
                        </CFormGroup>
                      </CForm>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setInfo(!info)}>
                        Cancel
                      </CButton>
                      <CButton color="success" onClick={handleClose}>
                        OK
                      </CButton>{" "}
                    </CModalFooter>
                  </CModal>
                </CCardBody>
                {/* </CCard> */}
              </CCol>
            </CRow>
            <h1>Hồ Ngọc Đình Châu - Product</h1>
            {renderProducts()}
          </div>
          <TheFooter />
        </div>
      </div>
    </>
  );
};

export default Product;
