import { Button } from "@mui/material";
import React, { useState } from "react";
import OrderTable from "./OrderTable";

export default function OrderDetails({ order }) {

  return order ? (
    <div className="flex w-full -mt-20 justify-center items-center">
      <div className="flex flex-col items-center justify-center w-[800px] h-[650px] bg-[#C4C4C4] rounded-[20px]">
        <OrderTable lineOrderList={order.lineOrderList} />
        <Button style={{ marginTop: "20px", background: "#BD5454" }}>
          Finalizar
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
}
