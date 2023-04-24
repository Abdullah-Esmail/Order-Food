import React, { useEffect, useState } from "react";

import MealItem from "../UI/Meal/MealItem";
import style from "./MealsList.module.css";
import useHttp from "../../hooks/use-http";

//we want to fetch the meals.
const MealsList = (props) => {
  const [Meals, setMeals] = useState([]);
  const { isLoading, error, requestFun } = useHttp(); //custom Hook

  //fetch the meals
  useEffect(() => {
    const applayData = (data) => {
      let loadedMeals = [];
      for (const i in data) {
        loadedMeals.push({
          id: i,
          name: data[i].name,
          description: data[i].description,
          price: data[i].price,
        });
      }
      // console.log(loadedMeals);
      setMeals(loadedMeals);
    };
    //link of the firebase to pass it to the function of the customrequest hook
    const requestConfig = {
      url: "https://react-http-ec7b8-default-rtdb.asia-southeast1.firebasedatabase.app/Meals.json",
    };

    //fun. of the custom hook.
    requestFun(requestConfig, applayData);
  }, [requestFun]);

  //if there is no custom hook
  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     const response = await fetch(
  //       "https://react-http-ec7b8-default-rtdb.asia-southeast1.firebasedatabase.app/Meals.json"
  //     );
  //     const responseData = await response.json();

  //     let loadedMeals = [];
  //     for (const key in responseData) {
  //       loadedMeals.push({
  //         id: key,
  //         name: responseData[key].name,
  //         description: responseData[key].description,
  //         price: responseData[key].price,
  //       });
  //     }
  //     setMeals(loadedMeals);
  //   };
  //   fetchMeals();
  // }, []);

  return (
    <React.Fragment>
      <div className={style.meals}>
        {isLoading && <p>isLoading..</p>}
        {error && <p>Couldn`t fetch the meals, check internet connection</p>}
        <ul>
          {Meals.map((meal) => (
            //this key is to let the react know the every <li>
            <li key={meal.id}>
              <MealItem
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default MealsList;
