import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, 
  updateCategories ,
  getAllCategory,
  deleteCategories as deleteCategoriesAction
} from "../../../actions";
import { TheFooter, TheHeader, TheSidebar } from "../../../containers";
import CheckboxTree from "react-checkbox-tree";
import { Row, Col } from "react-bootstrap";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
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
} from "@coreui/react";
import Input from "../../../components/Input";
import { IoTrashBin, IoPencilSharp,IoCloudUploadSharp,IoAddCircleSharp } from "react-icons/io5";
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
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

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

  useEffect(() => {

    if (!category.loading) {
        setInfo(!info);
    }

}, [category.loading]);

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
            type: category.type
        });
        if (category.children.length > 0) {
            createCategoryList(category.children, options)
        }
    }

    return options;
}

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleClose = () => {
    const form = new FormData();

    if(categoryName === ""){
      alert("Name is required");
      setInfo(!info);
      return;
    }

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    dispatch(addCategory(form));

    setInfo(!info); // đóng modal
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(!updateCategoryModal);
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

    setUpdateCategoryModal(!updateCategoryModal);
  };
  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(!deleteCategoryModal);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
    const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);

    if (checkedIdsArray.length > 0) {
        dispatch(deleteCategoriesAction(checkedIdsArray))
            .then(result => {
                if (result) {
                    dispatch(getAllCategory())
                    setDeleteCategoryModal(false)
                }
            });
    }

    setDeleteCategoryModal(false);


}
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

  const renderUpdateCategoriesModal = () => {
    return (
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
                    {createCategoryList(category.categories).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select 
                    className="form-control"
                    value={item.type}
                    onChange={(e) =>
                      handleCategoryInput(
                        "type",
                        e.target.value,
                        index,
                        "expanded"
                      )
                    }
                  >
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
                    {createCategoryList(category.categories).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select 
                    className="form-control"
                    value={item.type}
                    onChange={(e) =>
                      handleCategoryInput(
                        "type",
                        e.target.value,
                        index,
                        "checked"
                      )
                    }
                  >
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
            onClick={() => setUpdateCategoryModal(!updateCategoryModal)}
          >
            Cancel
          </CButton>
          <CButton color="primary" onClick={updateCategoriesForm}>
            OK
          </CButton>{" "}
        </CModalFooter>
      </CModal>
    );
  };
  const renderAddCategoriesModal = () => {
    return (
      <CModal show={info} onClose={() => setInfo(!info)} color="success">
        <CModalHeader closeButton>
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
            className="form-control"
            value={parentCategoryId}
            onChange={(e) => setParentCategortId(e.target.value)}
          >
            <option>Select Category</option>
            {createCategoryList(category.categories).map((option) => (
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
          <CButton color="secondary" onClick={() => setInfo(!info)}>
            Cancel
          </CButton>
          <CButton color="success" onClick={handleClose}>
            OK
          </CButton>{" "}
        </CModalFooter>
      </CModal>
    );
  };
  const renderDeleteCategoriesModal = () => {
    return (
      <CModal
        show={deleteCategoryModal}
        onClose={() => setDeleteCategoryModal(!deleteCategoryModal)}
        color="danger"
      >
        <CModalHeader closeButton>
          <CModalTitle>Delete Category</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h5>
            <center>Do you want delete Category</center>
          </h5>
          <h5>Expaned</h5>
          {
              expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
          }
          <h5>Checked</h5>
          {
            checkedArray.map((item, index) => <span key={index}>{item.name}</span>)
          }
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setDeleteCategoryModal(!deleteCategoryModal)}
          >
            Cancel
          </CButton>
          <CButton color="danger" onClick={deleteCategories}>
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
                    onClick={() => setInfo(!info)}
                    className="mr-1"
                  >
                    <IoAddCircleSharp /> <span>Create</span>
                  </CButton>
                  <CButton
                    color="primary"
                    onClick={updateCategory}
                    className="mr-1"
                  >
                    <IoCloudUploadSharp /> <span>Edit</span>
                  </CButton>
                  {/* Button xoa  */}
                  <CButton
                    color="danger"
                    onClick={deleteCategory}
                    className="mr-1"
                  >
                    <IoTrashBin /> <span>Delete</span>
                  </CButton>
                </CCardBody>
              </CCol>
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
              {renderAddCategoriesModal()}
              {renderUpdateCategoriesModal()}
              {renderDeleteCategoriesModal()}
            </Row>
          </div>
          <TheFooter />
        </div>
      </div>
    </>
  );
};

export default Category;
