import style from "./Header.module.css";
import HeaderButton from "./HeaderButton";
// import mealsImage from "../";

const Header = (props) => {
  return (
    <div>
      <header className={style.header}>
        <h1>Delicios Meals</h1>

        <HeaderButton onClick={props.onShowCart} />
      </header>

      <div className={style[`main-image`]}>
        <img
          src="https://raw.githubusercontent.com/academind/react-complete-guide-code/11-practice-food-order-app/extra-files/meals.jpg"
          alt="A table full of delicios food, couldn`t fetch it"
        />
      </div>
    </div>
  );
};

export default Header;
