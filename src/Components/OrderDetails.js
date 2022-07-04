import { Button, Paper } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import OrderTable from "./OrderTable";
import Constants from "../Utils/Constants";
import { DataGrid } from "@mui/x-data-grid";

const jwtToken = localStorage.getItem("jwt-token");

console.log(jwtToken);

export default function OrderDetails({ order, orderList, setOrderList, setSelectedOrder }) {
  const columns = [
    {
      field: "id",
      headerName: "Id",
      headerAlign: "center",
      width: 70,
      align: "center",
    },
    {
      field: "name",
      headerName: "Food",
      headerAlign: "center",
      width: 200,
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      width: 130,
      align: "center",
    },
  ];

  axios.defaults.headers.common["Authorization"] = jwtToken;
  const concludeOrder = (id) => {
    try {
      const result = axios
        .put(`${Constants.BASE_URL}/order/endOrder/${id}`, {
          headers: { Authorization: jwtToken },
        })
        .then((response) => {
          const newOrderList = orderList.filter((order) => {
            return order.id !== id;
          });
          setOrderList(newOrderList);
          setSelectedOrder(null)
        })
        .catch((error) => {
          alert(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return order ? (
    <>
      <div className="flex w-full -mt-20 justify-center items-center">
        <div className="flex flex-col items-center justify-evenly w-[700px] h-[500px] rounded-[20px]">
          <div className="w-4/5 mb-4 flex flex-row justify-between">
            <div className="text-white font-bold">Order Id: {order.id}</div>
            <div className="text-white font-bold">
              Table to serve: {order.tableToServe.tableNumber}
            </div>
            <div className="text-white font-bold">Price: {order.price} €</div>
            <div className="text-white font-bold">
              Time: {order.createdDateTime.split(" ")[1]}
            </div>
          </div>
          <DataGrid
            rows={order.lineOrderList.map((lineOder) => ({
              id: lineOder.id,
              name: lineOder.food.name,
              quantity: lineOder.quantity,
            }))}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{
              boxShadow: 2,
              border: 2,
              backgroundColor: "white",
            }}
            style={{ height: "100%", width: "80%" }}
            ali
          />
          <button
            className="font-bold m-5 w-72 h-11 bg-[#D03C1E] shadow-md rounded-lg"
            onClick={() => concludeOrder(order.id)}
          >
            Finish Order
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="w-full" />
  );
}
