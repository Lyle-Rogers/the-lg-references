import { useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useState } from "react";

const FloatingInput = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleTextChange = (e) => {
    setValue(e.target.value);

    if (e.target.value !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    props.handleInput(e.target.name, e.target.value);
  };

  return (
    <div className={"float-label " + props.className}>
      <input
        name={props.label}
        value={value}
        onChange={(e) => handleTextChange(e)}
        placeholder={props.placeholder}
        required={props.required ? props.required : false}
      />
      <label className={isActive ? "Active" : ""}>{props.label}</label>
    </div>
  );
};

export default FloatingInput;
