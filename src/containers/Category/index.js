import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  addCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../actions";
import Modal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosTrash,
  IoIosCloudUpload,
  IoIosCreate,
  IoIosFolder,
  IoIosFolderOpen,
  IoIosDocument,
} from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";
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
  CCard,
  CCardHeader,
  CCardFooter,
} from "@coreui/react";
import "./style.css";

/**
 * @author
 * @function Category
 **/

const Category = (props) => {
  //modal
  const [addCategoryModal, setAddCategoryModal] = useState(false);

  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!category.loading) {
  //     setShow(false);
  //   }
  // }, [category.loading]);

  const handleClose = () => {
    const form = new FormData();

    if (categoryName === "") {
      alert("Category name is required");
      setAddCategoryModal(false);
      return;
    }

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");

    alert("Success");
  };

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
        type: category.type,
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

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
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

  const updateCategoriesForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form));
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);

    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
          setDeleteCategoryModal(false);
        }
      });
    }

    setDeleteCategoryModal(false);
  };

  const renderAddCategoriesModal = () => {
    return (
      <CModal
        show={addCategoryModal}
        onClose={() => setAddCategoryModal(!addCategoryModal)}
        color="success"
      >
        <CModalHeader className="modal-header-success" closeButton>
          <CModalTitle>Add New Category</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h3>Enter Fill Information</h3>
          <CForm className="was-validated">
            <CFormGroup>
              <CInput
                value={categoryName}
                placeholder={`Category Name`}
                onChange={(e) => setCategoryName(e.target.value)}
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
          <select
            className="form-control form-control-sm"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>Select category</option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <p></p>
          <CCol xs="12" md="9">
            <CInputFile
              custom
              id="custom-file-input"
              name="categoryImage"
              onChange={handleCategoryImage}
            />
            <CLabel htmlFor="custom-file-input" variant="custom-file">
              Choose file...
            </CLabel>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddCategoryModal(!addCategoryModal)}
          >
            Cancel
          </CButton>
          <CButton color="success" onClick={handleClose}>
            OK
          </CButton>{" "}
        </CModalFooter>
      </CModal>
    );
  };
  const renderDeleteCategoryModal = () => {
    return (
      <Modal
        modalTitle="Confirm"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              setDeleteCategoryModal(false);
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </Modal>
    );
  };

  const categoryList = createCategoryList(category.categories);

  return (
    <Layout sidebar>
      <Container>
        <CRow>
          <CCol>
            <CCard color="gradient-secondary">
              <CCardHeader>
                <h3>
                  <span>CATEGORY LIST</span>
                </h3>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <Col md={12}>
                    <CheckboxTree
                      nodes={renderCategories(category.categories)}
                      checked={checked}
                      expanded={expanded}
                      onCheck={(checked) => setChecked(checked)}
                      onExpand={(expanded) => setExpanded(expanded)}
                      icons={{
                        check: <IoIosCheckbox />,
                        uncheck: <IoIosCheckboxOutline />,
                        halfCheck: <IoIosCheckboxOutline />,
                        expandClose: <IoIosArrowForward />,
                        expandOpen: <IoIosArrowDown />,
                        parentClose: <IoIosFolder />,
                        parentOpen: <IoIosFolderOpen />,
                        leaf: <IoIosDocument />,
                      }}
                    />
                  </Col>
                </CRow>
              </CCardBody>
              <CCardFooter>
                <CRow>
                  &emsp;
                  <CButton color="success"  onClick={() => setAddCategoryModal(!addCategoryModal)}>
                    <IoIosCreate /> Create
                  </CButton>
                  &emsp;
                  <CButton color="primary" onClick={updateCategory}>
                    <IoIosCloudUpload /> Edit
                  </CButton>
                  &emsp;
                  <CButton color="danger" onClick={deleteCategory}>
                    <IoIosTrash /> Delete
                  </CButton>
                  &emsp;
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </Container>
      {/* <AddCategoryModal className = "success"
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleClose}
        modalTitle={"Add New Category"}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        categoryList={categoryList}
        //handleCategoryImage={handleCategoryImage}
      />
      <UpdateCategoriesModal
        show={updateCategoryModal}
        handleClose={() => setUpdateCategoryModal(false)}
        onSubmit={updateCategoriesForm}
        modalTitle={"Update Categories"}
        size="lg"
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={categoryList}
      /> */}
      {renderDeleteCategoryModal()}
      {renderAddCategoriesModal()}
      <CButton
        color="success"
        onClick={() => setAddCategoryModal(!addCategoryModal)}
        className="mr-1"
      >
        Success modal
      </CButton>
    </Layout>
  );
};

export default Category;
