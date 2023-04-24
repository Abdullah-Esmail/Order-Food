import React, { useContext, useRef } from "react";
import style from "./MealItem.module.css";
import Input from "../input/Input";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const amountRef = useRef();
  const cartctx = useContext(CartContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    cartctx.addItem({
      id: props.id,
      name: props.name,
      amount: +amountRef.current.value,
      price: props.price,
    });
  };

  return (
    <div className={style.meal}>
      <div className={style[`the-meal`]}>
        <h3>{props.name}</h3>
        <p className={style.description}>{props.description}</p>
        <span className={style.price}>{props.price}$</span>
      </div>
      <form className={style.form} onSubmit={onSubmitHandler}>
        <Input
          ref={amountRef}
          lable="Amount"
          input={{
            type: "number",
            id: "amount_" + props.id, // this changed!,
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
          }}
        />
        <button type="submit">+ Add </button>
      </form>
    </div>
  );
};

export default MealItem;
