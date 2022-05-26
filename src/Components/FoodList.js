import axios from "axios";
import React, { useState } from "react";
import BASE_URL from "../Utils/Constants";

export default function FoodList() {
  const [foodList, setFoodList] = useState([]);

  const getFoodList = () => {
    axios
      .get(`${BASE_URL}/food`)
      .then((response) => {
        console.log(response)
        setFoodList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getFoodList();
  }, []);

  return (
    <ul>
      {foodList.map((food) => (
        <li>{food.name}</li>
      ))}
    </ul>
  );
}
