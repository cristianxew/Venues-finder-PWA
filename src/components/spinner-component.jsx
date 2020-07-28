import React from "react";
import ReactDOM from "react-dom";
import "./spinner.styles.scss";

const Spinner = () => {
  const content = (
    <div className="spinner-overlay">
      <div className="spinner-container" />
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("spinner-wrap")
  );
};

export default Spinner;
