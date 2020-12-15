import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory } from "../../../actions";
import { TheFooter, TheHeader, TheSidebar } from "../../../containers";
import CheckboxTree from "react-checkbox-tree";
import { Row, Col } from "react-bootstrap";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
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
  CSelect,
} from "@coreui/react";
import Input from "../../../components/Input";
import CIcon from "@coreui/icons-react";
import {
  IoArrowForward,
  IoArrowDownOutline,
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";

const Category = (props) => {
  // modal
  const [info, setInfo] = useState(false);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

  // modal body
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategortId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleClose = () => {
    const form = new FormData();

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    dispatch(addCategory(form));

    setInfo(!info); // đóng modal
  };

  const updateCategory = () => {
    setUpdateCategoryModal(!updateCategoryModal);
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    console.log({ checked, expanded, categories, checkedArray, expandedArray });
  };

  const handleCategoryInput = (key, value, index, type) => {
    console.log(value);
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
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
                    <CIcon name="cil-lightbulb" /> Add New Category
                  </CButton>

                  <CModal
                    show={info}
                    onClose={() => setInfo(!info)}
                    color="success"
                  >
                    <CModalHeader closeButton>
                      <CModalTitle>Add New Category</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <h3>Enter Fill Information</h3>
                      <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                      <select
                        className="form-control"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategortId(e.target.value)}
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
                      <p></p>
                      <CCol xs="12" md="9">
                        <CInputFile
                          custom
                          id="custom-file-input"
                          name="categoryImage"
                          onChange={handleCategoryImage}
                        />
                        <CLabel
                          htmlFor="custom-file-input"
                          variant="custom-file"
                        >
                          Choose file...
                        </CLabel>
                      </CCol>
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
              {/* Edit Category */}
            </CRow>
            <h1>Hồ Ngọc Đình Châu - Category</h1>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoCheckmarkCircleSharp />,
                uncheck: <IoCheckmarkCircleOutline />,
                halfCheck: <IoCheckmarkCircleOutline />,
                expandedClose: <IoArrowForward />,
                expandedOpen: <IoArrowDownOutline />,
              }}
            />
            <Row>
              <CCol>
                {/* <CCard> khung trắng */}
                <CCardBody>
                  <CButton
                    color="primary"
                    onClick={updateCategory}
                    className="mr-1"
                  >
                    <CIcon name="cil-lightbulb" /> Update Category
                  </CButton>

                  <CModal
                    show={updateCategoryModal}
                    onClose={() => setUpdateCategoryModal(!updateCategoryModal)}
                    color="primary"
                  >
                    <CModalHeader closeButton>
                      <CModalTitle>Update Category</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <h6>Expaned</h6>
                      {expandedArray.length > 0 &&
                        expandedArray.map((item, index) => (
                          <Row key={index}>
                            <Col md={12}>
                              <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) =>
                                  handleCategoryInput(
                                    "name",
                                    e.target.value,
                                    index,
                                    "expanded"
                                  )
                                }
                              />
                            </Col>
                            <Col>
                              <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) =>
                                  handleCategoryInput(
                                    "parentId",
                                    e.target.value,
                                    index,
                                    "expanded"
                                  )
                                }
                              >
                                <option>Select Category</option>
                                {createCategoryList(category.categories).map(
                                  (option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </Col>
                            <Col>
                              <select className="form-control">
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                              </select>
                            </Col>
                          </Row>
                        ))}
                      <h5>Check Category</h5>
                      {checkedArray.length > 0 &&
                        checkedArray.map((item, index) => (
                          <Row key={index}>
                            <Col md={12}>
                              <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) =>
                                  handleCategoryInput(
                                    "name",
                                    e.target.value,
                                    index,
                                    "checked"
                                  )
                                }
                              />
                            </Col>
                            <Col>
                              <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) =>
                                  handleCategoryInput(
                                    "parentId",
                                    e.target.value,
                                    index,
                                    "checked"
                                  )
                                }
                              >
                                <option>Select Category</option>
                                {createCategoryList(category.categories).map(
                                  (option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </Col>
                            <Col>
                              <select className="form-control">
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                              </select>
                            </Col>
                          </Row>
                        ))}
                    </CModalBody>
                    <CModalFooter>
                      <CButton
                        color="secondary"
                        onClick={() =>
                          setUpdateCategoryModal(!updateCategoryModal)
                        }
                      >
                        Cancel
                      </CButton>
                      <CButton color="success" onClick={updateCategory}>
                        OK
                      </CButton>{" "}
                    </CModalFooter>
                  </CModal>
                </CCardBody>
                {/* </CCard> */}
              </CCol>
              <CCol>
                {/* <CCard> khung trắng */}
                <CCardBody>
                  <CButton
                    color="danger"
                    onClick={updateCategory}
                    className="mr-1"
                  >
                    <CIcon name="cil-lightbulb" /> Delete
                  </CButton>

                  <CModal
                    show={updateCategoryModal}
                    onClose={() => setUpdateCategoryModal(!updateCategoryModal)}
                    color="danger"
                  >
                    <CModalHeader closeButton>
                      <CModalTitle>Update Category</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <h6>Expaned</h6>
                      {expandedArray.length > 0 &&
                        expandedArray.map((item, index) => (
                          <Row key={index}>
                            <Col md={12}>
                              <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) =>
                                  handleCategoryInput(
                                    "name",
                                    e.target.value,
                                    index,
                                    "expanded"
                                  )
                                }
                              />
                            </Col>
                            <Col>
                              <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) =>
                                  handleCategoryInput(
                                    "parentId",
                                    e.target.value,
                                    index,
                                    "expanded"
                                  )
                                }
                              >
                                <option>Select Category</option>
                                {createCategoryList(category.categories).map(
                                  (option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </Col>
                            <Col>
                              <select className="form-control">
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                              </select>
                            </Col>
                          </Row>
                        ))}
                      <h5>Check Category</h5>
                      {checkedArray.length > 0 &&
                        checkedArray.map((item, index) => (
                          <Row key={index}>
                            <Col md={12}>
                              <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) =>
                                  handleCategoryInput(
                                    "name",
                                    e.target.value,
                                    index,
                                    "checked"
                                  )
                                }
                              />
                            </Col>
                            <Col>
                              <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) =>
                                  handleCategoryInput(
                                    "parentId",
                                    e.target.value,
                                    index,
                                    "checked"
                                  )
                                }
                              >
                                <option>Select Category</option>
                                {createCategoryList(category.categories).map(
                                  (option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </Col>
                            <Col>
                              <select className="form-control">
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                              </select>
                            </Col>
                          </Row>
                        ))}
                    </CModalBody>
                    <CModalFooter>
                      <CButton
                        color="secondary"
                        onClick={() =>
                          setUpdateCategoryModal(!updateCategoryModal)
                        }
                      >
                        Cancel
                      </CButton>
                      <CButton color="success" onClick={updateCategory}>
                        OK
                      </CButton>{" "}
                    </CModalFooter>
                  </CModal>
                </CCardBody>
                {/* </CCard> */}
              </CCol>
            </Row>
          </div>
          <TheFooter />
        </div>
      </div>
    </>
  );
};

export default Category;
