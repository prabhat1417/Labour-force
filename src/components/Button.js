import React from "react";

function Button(props) {
  return (
    <button
      style={{
        backgroundColor: props.backgroundColor,
        color: props.color,
        border: "none",
        borderRadius: "5px",
        padding: "10px 20px",
        fontWeight: "bold",
        fontSize: "16px"
      }}
    >
      {props.text}
    </button>
  );
}

export default Button;
