import { useReducer } from "react";
import CartContext from "./cart-context";

const CartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const excistingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const excistingCartItem = state.items[excistingCartItemIndex];
    let updatedItems;

    if (excistingCartItem) {
      const updatedItem = {
        ...excistingCartItem,
        amount: excistingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[excistingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item); // this will return a new arry unlike push()
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  //this will update the cartstate below

  if (action.type === "REMOVE") {
    const excistingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const excistingCartItem = state.items[excistingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - excistingCartItem.price;
    let updatedItems;

    if (excistingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...excistingCartItem,
        amount: excistingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[excistingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return { items: [], totalAmount: 0 };
  }
  return { items: [], totalAmount: 0 }; // its a default state in case  add,remove or clear isnot done
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(CartReducer, {
    items: [],
    totalAmount: 0,
  });

  const addItemToCartHandler = (item) => {
    dispatchCartState({
      type: "ADD",
      item: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartState({
      type: "REMOVE",
      id: id,
    });
  };

  const clearCartHandler = () => {
    dispatchCartState({
      type: "CLEAR",
    });
  };

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
