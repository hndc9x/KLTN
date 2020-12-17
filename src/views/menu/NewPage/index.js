import React, { useEffect, useState } from "react";
import { TheHeader, TheSidebar, TheFooter } from "../../../containers";
import {
  IoTrashBin,
  IoPencilSharp,
  IoCloudUploadSharp,
  IoAddCircleSharp,
} from "react-icons/io5";
import {
  CButton,
  CCardBody,
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
  CInvalidFeedback,
  CValidFeedback,
  CForm,
  CInput,
  CSelect,
} from "@coreui/react";
import linearCategories from "../../../helpers/linearCategories";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../../actions";
/**
 * @author
 * @function NewPage
 **/
const NewPage = (props) => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  const category = useSelector((state) => state.category);

  const onCategoryChange = (e) => {
    const category = categories.find(category => category.value == e.target.value);
    setCategoryId(e.target.value);
    setType(category.type);
  }
  const handleBannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };

  const submitPageForm = (e) => {
    //e.target.preventDefault();

    if(title === ""){
        alert('Title is required');
        setCreateModal(!createModal);
        return;
    }

    const form = new FormData();
    form.append('title', title);
    form.append('description', desc);
    form.append('category', categoryId);
    form.append('type', type);
    banners.forEach((banner, index) => {
        form.append('banners', banner);
    });
    products.forEach((product, index) => {
        form.append('products', product);
    });

    dispatch(createPage(form)); 
  }
  const renderCreatePageModal = () => {
    return (
      <CModal
        show={createModal}
        onClose={() => setCreateModal(!createModal)}
        color="success"
      >
        <CModalHeader closeButton>
          <CModalTitle>Create New Page</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h4>Enter Fill Information</h4>
          <CFormGroup>
            <select
              className="form-control"
              value={categoryId}
              onChange={onCategoryChange}
            >
              <option>Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </CFormGroup>
          <CForm className="was-validated">
            <CFormGroup>
              <CInput
                value={title}
                placeholder={`Page Title`}
                onChange={(e) => setTitle(e.target.value)}
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
                value={desc}
                placeholder={`Page Desc`}
                onChange={(e) => setDesc(e.target.value)}
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
            {
              banners.length > 0 ?
              banners.map((banner,index) => 
              <CRow key={index}>
                <CCol>
                    {banner.name}
                </CCol>
              </CRow>
              ):null
            }
            <CCol xs="12" md="9">
              <CInputFile
                custom
                id="custom-file-input"
                name="banners"
                onChange={handleBannerImages}
              />
              <CLabel htmlFor="custom-file-input" variant="custom-file">
                Banners
              </CLabel>
            </CCol>
          </CFormGroup>
          <CFormGroup>
          {
              products.length > 0 ?
              products.map((product,index) => 
              <CRow key={index}>
                <CCol>
                    {product.name}
                </CCol>
              </CRow>
              ):null
            }
            <CCol xs="12" md="9">
              <CInputFile
                custom
                id="custom-file-input"
                name="products"
                onChange={handleProductImages}
              />
              <CLabel htmlFor="custom-file-input" variant="custom-file">
                Product
              </CLabel>
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setCreateModal(!createModal)}
          >
            Cancel
          </CButton>
          <CButton color="success" onClick={submitPageForm}>
            OK
          </CButton>{" "}
        </CModalFooter>
      </CModal>
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
                <CCardBody>
                  <CButton
                    color="success"
                    onClick={() => setCreateModal(!createModal)}
                    className="mr-1"
                  >
                    <IoAddCircleSharp /> <span>Create</span>
                  </CButton>
                  {renderCreatePageModal()}
                </CCardBody>
              </CCol>
            </CRow>
          </div>
          <TheFooter />
        </div>
      </div>
    </>
  );
};

export default NewPage;
