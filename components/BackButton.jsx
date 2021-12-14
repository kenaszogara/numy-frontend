import React from "react";

export { BackButton };

function BackButton({ children }) {
  return (
    <>
      <span
        style={{
          width: "30px",
          cursor: "pointer",
          padding: "0.6em",
        }}
        className="shadow-sm rounded-circle border"
        onClick={() => history.back()}
      >
        {children}
      </span>
    </>
  );
}
