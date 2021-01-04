import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProductById, updateProduct } from "../../actions";
import "./style.css";
import { IoIosTrash, IoIosCreate, IoIosEye, IoMdCreate } from "react-icons/io";
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
  CRow,
} from "@coreui/react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

/**
 * @author
 * @function Products
 **/

const Products = (props) => {
  //modal
  const [addProductModal, setAddProductModal] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productUpdateModal, setProductUpdateModal] = useState(false);

  const [name, setName] = useState("");
  const [saleCount, setSaleCount] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [tagg, setTag] = useState("");
  const [stock, setStock] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);

  // update 
  var _id = "";
  var nameU = "";
  var priceU = "";
  var [discountU ,setDiscountU] = useState("");
  var tagU ="";
  var [stockU, setStockU] = useState("");
  

  const [productDetails, setProductDetails] = useState(null);
  const [_productUpdate, setProductUpdate] = useState(null);

  const category = useSelector((state) => state.category);
  const tags = useSelector((state) => state.tags);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("saleCount", saleCount);
    form.append("price", price);
    form.append("discount", discount);
    form.append("tag", tagg);
    form.append("stock", stock);
    form.append("shortDescription", shortDescription);
    form.append("fullDescription", description);
    form.append("category", categoryId);

    console.log(productPictures);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form)).then(() => setAddProductModal(!addProductModal));
  };

  const updateProductForm = () => {
   
    setProductUpdate(product);
    console.log(_productUpdate);
      const form = {
        _id : _id ,
        name : nameU,
        price : priceU ,
        discount :discountU ,
        tag : tagU ,
        stock :stockU
      };
      console.log(form);
      dispatch(updateProduct(form)).then(() => setProductUpdateModal(!productUpdateModal));
    
  }
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

  const createTagList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createTagList(category.children, options);
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
            <th>Stock</th>
            <th>Discount</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.discount}</td>
                  <td>{product.category}</td>

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
                    <CButton
                      color="primary"
                      onClick={() => showUpdateProductsModal(product)}
                    >
                      <IoMdCreate />
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
            <CRow>
              <CCol>
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
              </CCol>
              <CCol>
                <CFormGroup>
                  <CInput
                    placeholder="Sale Count"
                    value={saleCount}
                    onChange={(e) => setSaleCount(e.target.value)}
                    className="form-control-warning"
                    id="inputWarning2i"
                    required
                    type="number"
                  />
                  <CInvalidFeedback className="help-block">
                    Please provide a valid information
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">
                    Input provided
                  </CValidFeedback>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormGroup>
                  <CInput
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control-warning"
                    id="inputWarning2i"
                    required
                    type="number"
                  />
                  <CInvalidFeedback className="help-block">
                    Please provide a valid information
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">
                    Input provided
                  </CValidFeedback>
                </CFormGroup>
              </CCol>
              <CCol>
                <CFormGroup>
                  <CInput
                    placeholder="Discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="form-control-warning"
                    id="inputWarning2i"
                    required
                    type="number"
                  />
                  <CInvalidFeedback className="help-block">
                    Please provide a valid information
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">
                    Input provided
                  </CValidFeedback>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormGroup>
                  <CInput
                    placeholder="Tag"
                    value={tagg}
                    onChange={(e) => setTag(e.target.value)}
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
              </CCol>
              <CCol>
                <CFormGroup>
                  <CInput
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="form-control-warning"
                    id="inputWarning2i"
                    required
                    type="number"
                  />
                  <CInvalidFeedback className="help-block">
                    Please provide a valid information
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">
                    Input provided
                  </CValidFeedback>
                </CFormGroup>
              </CCol>
            </CRow>

            <CFormGroup>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Short Description"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
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
              <Form.Control
                as="textarea"
                rows={10}
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
                <option key={option.value} value={option.name}>
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

  const renderUpdateProductModal = () => {
    if (!productDetails) {
      return null;
    } else {
      console.log(productDetails);
    }
    _id = productDetails._id;
    nameU = productDetails.name;
    priceU = productDetails.price;
    //discountU = productDetails.discount;
    tagU = productDetails.tag;
    
    return (
      <CModal
        show={productUpdateModal}
        onClose={() => setProductUpdateModal(!productUpdateModal)}
      >
        <CModalHeader className="modal-header-edit" closeButton>
          <CModalTitle>Update Product</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h3>Enter Fill Information</h3>
          <CForm className="was-validated">
              <CFormGroup>
                <label>Name</label>
                <CInput
                  placeholder="Product Name"
                  value={productDetails.name}
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
            <CRow>
              <CCol>
                <CFormGroup>
                <label>Price</label>
                  <CInput
                    placeholder="Price"
                    value={productDetails.price}
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
              </CCol>
              <CCol>
                 <CFormGroup>
                <label>Tag</label>
                  <CInput
                    placeholder="Tag"
                    value={productDetails.tag}
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
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormGroup>
                <label>Discount</label>
                  <CInput
                    placeholder="Discount"
                    value={productDetails.discount}
                    className="form-control-warning"
                    id="inputWarning2i"
                    required
                    type="number"
                  />
                  <p></p>
                  <CInput
                    placeholder="Discount"
                    value={discountU}
                    onChange = {(e) => setDiscountU(e.target.value)}
                    className="form-control-warning"
                    id="inputWarning2i"
                    required
                    type="number"
                  />
                  <CInvalidFeedback className="help-block">
                    Please provide a valid information
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">
                    Input provided
                  </CValidFeedback>
                </CFormGroup>
              </CCol>
              <CCol>
                <CFormGroup>
                <label>Stock</label>
                  <CInput
                    placeholder="Stock"
                    value={productDetails.stock}
                    className="form-control-warning"
                    id="inputWarning2i"
                    required
                    type="number"
                  />
                  <p></p>
                  <CInput
                    placeholder="Stock"
                    value={stockU}
                    onChange={(e) => setStockU(e.target.value)}
                    className="form-control-warning"
                    id="inputWarning2i"
                    required
                    type="number"
                  />
                  <CInvalidFeedback className="help-block">
                    Please provide a valid information
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">
                    Input provided
                  </CValidFeedback>
                </CFormGroup>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setProductUpdateModal(!productUpdateModal)}
          >
            Cancel
          </CButton>
          <CButton color="success" onClick={updateProductForm}>
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
  const showUpdateProductsModal = (product) => {
    setProductDetails(product);
    setProductUpdateModal(true);
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
          <Row>
            <Col>
              <label className="key">Price</label>
              <p className="value">{productDetails.price}</p>
            </Col>
            <Col>
              <label className="key">Stock</label>
              <p className="value">{productDetails.stock}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <label className="key">Category</label>
              <p className="value">{productDetails.category}</p>
            </Col>
            <Col>
              <label className="key">Tag</label>
              <p className="value">{productDetails.tag}</p>
            </Col>
          </Row>
          <label className="key">Short Description</label>
          <p className="value">{productDetails.shortDescription}</p>
          <label className="key">Description</label>
          <p className="value">{productDetails.fullDescription}</p>
          <label className="key">Product Pictures</label>
          <Row>
            <Col style={{ display: `flex` }}>
              {productDetails.image.map((picture) => (
                <div className="productImgContainer">
                  <img src={picture} />
                  &emsp;
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
        <Row>
          <p></p>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
      {renderUpdateProductModal()}
    </Layout>
  );
};

export default Products;
