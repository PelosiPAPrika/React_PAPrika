import axios from "axios";
import Constants from "../Utils/Constants";
import React, { useEffect, useState } from "react";

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

  axios.defaults.headers.common["Authorization"] = jwtToken;
  const unoccupyTable = async (id) => {
    if(window.confirm("Tem certeza que deseja desocupar esta mesa") === true){
      try {
        const result = await axios.put(
          `${Constants.BASE_URL}/table/leave/${id}`,
          {
            headers: headers,
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    tableListFunction();
  }, []);

  return (
    <ul>
      {tableList.map((table) => (
        <div>
          <li>{table.id}</li>
          <li>{table.tableNumber}</li>
          <li>{table.occupied.toString()}</li>
          <button onClick={() => unoccupyTable(table.id)}> Unoccupy Table </button>
        </div>
      ))}
    </ul>
  );
}
