import React, { useState } from "react";

import Header from "./Components/Header/Header";
import MealsSummary from "./Components/The-Food/MealsSummry";
import MealsList from "./Components/The-Food/MealsList";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";
// import ErrorBoundry from "./errorBoundry/ErrorBoundry";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const closeCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {/* <ErrorBoundry errorMsg="error in the cart"> */}
      {cartIsShown && <Cart onCloseCart={closeCartHandler} />}
      {/* </ErrorBoundry> */}

      <Header onShowCart={showCartHandler} />

      <MealsSummary />

      <MealsList />
    </CartProvider>
  );
}

export default App;
