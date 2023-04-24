import useValid from "../../../hooks/use-valid";
import style from "./Checkout.module.css";

const Checkout = (props) => {
  // useValid is my custom hook to handle validation of forms.
  const [nameErr, nameValue, nameChangeHandler, nameBlurHandler] = useValid(
    (value) => value.trim() !== ""
  );
  const [streetErr, streetValue, streetChangeHandler, streetBlurHandler] =
    useValid((value) => value.trim() !== "");
  const [postalErr, postalValue, postalChangeHandler, postalBlurHandler] =
    useValid((value) => value.trim() !== "");
  const [cityErr, cityValue, cityChangeHandler, cityBlurHandler] = useValid(
    (value) => value.trim() !== ""
  );

  const confirmHandler = (event) => {
    event.preventDefault();
    if (!nameErr && !streetErr && !postalErr && !cityErr) {
      props.onConfirm({
        name: nameValue,
        street: streetValue,
        postal: postalValue,
        city: cityValue,
      });
    }
  };

  return (
    <form className={style.form} onSubmit={confirmHandler}>
      <div className={style.control}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
      </div>
      <div className={style.control}>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
      </div>
      {/* {streetErr && <p>error</p>} */}
      <div className={style.control}>
        <label htmlFor="postal">Postal Code</label>
        <input
          id="postal"
          type="text"
          value={postalValue}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
      </div>
      {/* {postalErr && <p>error</p>} */}
      <div className={style.control}>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          value={cityValue}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
      </div>
      {cityErr || nameErr || postalErr || streetChangeHandler ? (
        <p style={{ color: "red" }}>please enter valid data</p>
      ) : null}
      <div className={style.actions}>
        <button type="submit" className={style.submit}>
          Confirm
        </button>
        <button type="button" onClick={props.cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Checkout;
