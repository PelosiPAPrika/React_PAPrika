import axios from "axios";
import Constants from "../Utils/Constants";
import React, { useEffect, useState } from "react";
import { Card, Box } from "@mui/material";
import Table from "./Table";

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

  useEffect(() => {
    tableListFunction();
  }, []);

  useEffect(() => {
    tableListFunction();
  }, [tableChanged])

  return (
    <div className="flex flex-row justify-evenly p-2">
      {tableList.map((table) => (
        <Table table={table} setTableChanged={setTableChanged} />
      ))}
    </div>
  );
}
