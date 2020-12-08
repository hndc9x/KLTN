import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory } from "../../../actions";
import { TheFooter, TheHeader, TheSidebar } from "../../../containers";
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

const Category = (props) => {
  // modal
  const [info, setInfo] = useState(false);

  // modal body
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategortId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Category.js");
    dispatch(getAllCategory());
  }, []);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage =(e) =>{
    setCategoryImage(e.target.files[0]);
  }

  const handleClose = () => {
    
    const form = new FormData(); 

    form.append('name',categoryName);
    form.append('parentId',parentCategoryId);
    form.append('categoryImage',categoryImage);
    //console.log(form);
    dispatch(addCategory(form));
    // const cat = {
    //   categoryName,
    //   parentCategoryId,
    //   categoryImage
    // };
    // console.log(cat);
    setInfo(!info) // đóng modal
  }

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
                    <CIcon name="cil-lightbulb" /> Add Category
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
                      <select className="form-control" value={parentCategoryId} onChange={(e) => setParentCategortId(e.target.value)}>
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
                        <CInputFile  custom id="custom-file-input" name="categoryImage" onChange={handleCategoryImage}/>
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
            </CRow>
            <h1>Hồ Ngọc Đình Châu - Category</h1>
            <ul>{renderCategories(category.categories)}</ul>
            {JSON.stringify(createCategoryList(category.categories))}
          </div>
          <TheFooter />
        </div>
      </div>
    </>
  );
};

export default Category;
