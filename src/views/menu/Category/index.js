import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../actions";
import { TheFooter, TheHeader, TheSidebar } from "../../../containers";

const Category = (props) => {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('Category.js');
        dispatch(getAllCategory());
    },[]);


    const renderCategories =(categories) =>{
        let myCategories = [];
        for(let category of categories){
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ?(<ul>{renderCategories(category.children)}</ul>):null}
                </li>
            );
        }
      return myCategories; 
    }
  return (
    
    <>
      <div className="c-app c-default-layout">
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
         <h1>Hồ Ngọc Đình Châu - Category</h1>
         <button>Add</button>
         <ul>
             {renderCategories(category.categories)}
         </ul>
          </div>
          <TheFooter />
        </div>
      </div>
    </>
  );
};

export default Category;
