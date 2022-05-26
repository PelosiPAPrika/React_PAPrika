import React from "react";

export default function OrderTable({ lineOrderList }) {
  return (
    <div className="bg-[#2E2D2DC2] flex flex-col items-center justify-center w-[400px] h-[350px] rounded-[20px]">
      <ul>
        {lineOrderList.map((lineOrder) => (
          <li className="text-white">
            {lineOrder.food.name} X {lineOrder.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
