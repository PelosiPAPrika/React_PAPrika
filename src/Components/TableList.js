import axios from "axios";
import Constants from "../Utils/Constants";
import React, { useEffect, useState } from "react";
import { Card, Box } from "@mui/material";
import Table from "./Table";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import SockJsClient from "react-stomp";


const jwtToken = localStorage.getItem("jwt-token");

const headers = {
  Authorization: jwtToken,
  //"Access-Control-Allow-Origin": "*",
  //"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  //"Access-Control-Allow-Headers": "*",
  //"Content-Type, Authorization, X-Requested-With": "*"
};

export default function TableList() {
  const [tableList, setTableList] = useState([]);

  const [tableChanged, setTableChanged] = useState([]);

  const navigate = useNavigate();

  const tableListFunction = async () => {
    try {
      const result = await axios.get(`${Constants.BASE_URL}/table/all`, {
        headers: headers,
      });
      setTableList(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToOrderList = () => {
    navigate("/home")
  }

  useEffect(() => {
    tableListFunction();
  }, []);

  useEffect(() => {
    tableListFunction();
  }, [tableChanged]);

  return (
    <div className="flex flex-row justify-evenly p-2">
      {tableList.map((table) => (
        <Table table={table} setTableChanged={setTableChanged} />
      ))}
      <Box
        marginLeft="25px"
        left="0"
        top="50%"
        bottom="50%"
        position="absolute"
        bgcolor="#141414"
      >
        <div 
        onClick={() => navigateToOrderList()}
        className="h-12 w-12 bg-white flex justify-center items-center rounded-[50%] hover:scale-150 hover:-translate-y-1 transition ease-in-out">
          <ArrowBackIcon fontSize="large" />
        </div>
      </Box>
    </div>
  );
}
