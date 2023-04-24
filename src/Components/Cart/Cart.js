// import { useState } from "react";
import react, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import style from "./Cart.module.css";
import CartItem from "./cartItem/CartItem";
import Checkout from "./checkout/Checkout";
import useHttp from "../../hooks/use-http";

//All cart Logic
const Cart = (props) => {
  //taking cart data
  const cartctx = useContext(CartContext);
  const cartItems = cartctx.items;

  //useState to show ckeckout
  const [isShown, setIsShown] = useState(false);
  const orderHandler = () => {
    setIsShown(true);
  };

  //Remove & Add item in the cart
  const removeHandler = (id) => {
    cartctx.removeItem(id);
  };
  const addHandler = (item) => {
    cartctx.addItem({ ...item, amount: 1 });
  };

  //if cancel
  const cancelHandler = () => {
    setIsShown(false);
  };

  //if confirm
  const { isLoading, error, requestFun } = useHttp();
  const onConfirmHandler = (userData) => {
    const applayData = () => {}; //nothing to apply

    const requestConfig = {
      url: "https://react-http-ec7b8-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      method: "POST",
      Headers: { "Content-Type": "appliction/json" },
      body: { userData: userData, userOrder: cartItems },
    };

    requestFun(requestConfig, applayData);

    if (!isLoading && !error) {
      cartctx.clearCart();
      setIsShown(false);
    }
  };

  const renderCartItem = (
    <react.Fragment>
      <ul className={style[`cart-items`]}>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            price={item.price}
            name={item.name}
            amount={item.amount}
            onRemove={removeHandler.bind(null, item.id)}
            onAdd={addHandler.bind(null, item)}
          ></CartItem>
        ))}
      </ul>
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{cartctx.totalAmount.toFixed(2)}</span>
      </div>
    </react.Fragment>
  );

  const renderCartButtons = (
    <react.Fragment>
      <div className={style.actions}>
        {!isShown && (
          <button className={style[`button.alt`]} onClick={props.onCloseCart}>
            {" "}
            Close
          </button>
        )}
        {cartItems.length > 0 && !isShown && (
          <button className={style.button} onClick={orderHandler}>
            {" "}
            Order
          </button>
        )}
      </div>
    </react.Fragment>
  );

  return (
    //modal do the same action of close button
    <Modal onClose={props.onCloseCart}>
      {renderCartItem}
      {renderCartButtons}

      {isShown && (
        <Checkout onConfirm={onConfirmHandler} cancel={cancelHandler} />
      )}
    </Modal>
  );
};

export default Cart;
