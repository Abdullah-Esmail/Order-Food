import { useContext, useEffect, useState } from "react";
import style from "./HeaderButton.module.css";
import CartIcon from "./CartIcon";
import CartContext from "../../store/cart-context";

const HeaderButton = (props) => {
  const cartctx = useContext(CartContext);
  const [btnAnimated, setBtnAnimated] = useState(false);
  //we want to accumlate the items number & their amount, because of that we will use
  // reduce which is a higher order function return a single thing from the array

  const numOfCartItems = cartctx.items.reduce((curNum, item) => {
    return curNum + item.amount; // this will be=> the summition of(item+its amount)
  }, 0); //the initial value

  //start animation for 0.3 sec whenever items length change
  useEffect(() => {
    if (cartctx.items.length === 0) {
      return;
    }
    setBtnAnimated(true);

    const timer = setTimeout(() => {
      setBtnAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartctx.items.length]);

  //changing the class according to previous useEffect to make the animation work
  const btnClasses = `${style.button} ${btnAnimated ? style.bump : ""}`;

  return (
    <button type="button" className={btnClasses} onClick={props.onClick}>
      <CartIcon />
      <span> Your cart </span>
      <span className={style.badge}>{numOfCartItems} </span>
    </button>
  );
};

export default HeaderButton;
