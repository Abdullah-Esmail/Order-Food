import React from "react";
import style from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  //to use ref inside this created component
  return (
    <div className={style.input}>
      <label htmlFor={props.id}> {props.lable}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});
export default Input;
