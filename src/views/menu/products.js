import React from "react";
import { TheFooter, TheHeader, TheSidebar } from "../../containers";

const Typography = () => {
  return (
    <>
      <div className="c-app c-default-layout">
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
         <h1>Hồ Ngọc Đình Châu - Producst</h1>
          </div>
          <TheFooter />
        </div>
      </div>
    </>
  );
};

export default Typography;
