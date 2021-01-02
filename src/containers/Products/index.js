import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProductById } from "../../actions";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
import { IoIosTrash, IoIosCreate, IoIosEye } from "react-icons/io";
import {
  CButton,
  CForm,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CLabel,
  CFormGroup,
  CInputFile,
  CInput,
  CInvalidFeedback,
  CValidFeedback,
} from "@coreui/react";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

/**
 * @author
 * @function Products
 **/

const Products = (props) => {
  //modal
  const [addProductModal, setAddProductModal] = useState("");
  const [productDetailModal, setProductDetailModal] = useState(false);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form)).then(() => setAddProductModal(!addProductModal));
  };
  const handleShow = () => setAddProductModal(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Category</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.discount}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                  
                
                  <td>
                    <CButton
                      color="info"
                      onClick={() => showProductDetailsModal(product)}
                    >
                      <IoIosEye />
                    </CButton>
                    <CButton
                      color="danger"
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                    >
                      <IoIosTrash />
                    </CButton>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <CModal
        show={addProductModal}
        onClose={() => setAddProductModal(!addProductModal)}
      >
        <CModalHeader className="modal-header-success" closeButton>
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
          </CForm>
          <CFormGroup>
            <select
              className="form-control"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option>Select Category</option>
              {createCategoryList(category.categories).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
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
              <CLabel htmlFor="custom-file-input" variant="custom-file">
                Choose File
              </CLabel>
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddProductModal(!addProductModal)}
          >
            Cancel
          </CButton>
          <CButton color="success" onClick={submitProductForm}>
            OK
          </CButton>{" "}
        </CModalFooter>
      </CModal>
    );
  };
  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };
  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <CModal
        show={productDetailModal}
        onClose={() => setProductDetailModal(!productDetailModal)}
      >
        <CModalHeader className="modal-header-edit" closeButton>
          <CModalTitle>Product Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <label className="key">Name</label>
          <p className="value">{productDetails.name}</p>
          <label className="key">Price</label>
          <p className="value">{productDetails.price}</p>
          <label className="key">Quantity</label>
          <p className="value">{productDetails.quantity}</p>
          <label className="key">Category</label>
          <p className="value">{productDetails.category.name}</p>
          <label className="key">Product Pictures</label>
          <Row>
            <Col style={{ display: `flex` }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} />
                </div>
              ))}
            </Col>
          </Row>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setProductDetailModal(!productDetailModal)}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };
  // const columns = [
  //   {
  //     dataField: "_id",
  //     text: "Product ID",
  //     sort: true,
  //   },
  //   {
  //     dataField: "name",
  //     text: "Product Name",
  //     sort: true,
  //   },
  //   {
  //     dataField: "price",
  //     text: "Product Price",
  //     sort: true,
  //   },
  // ];

  // const defaultSorted = [
  //   {
  //     dataField: "name",
  //     order: "desc",
  //   },
  // ];
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <CButton color="success" onClick={handleShow}>
            <IoIosCreate /> Create
          </CButton>
        </Row>
        {/* <Row>
          <BootstrapTable
            bootstrap4
            keyField="_id"
            data={test}
            columns={columns}
            defaultSorted={defaultSorted}
          />
          <p></p>
        </Row> */}
        <Row><Col>{renderProducts()}</Col></Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;
