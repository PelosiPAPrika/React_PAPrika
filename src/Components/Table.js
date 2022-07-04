import React from "react";
import { Box } from "@mui/system";
import axios from "axios";
import Constants from "../Utils/Constants";

const jwtToken = localStorage.getItem("jwt-token");

const headers = {
  Authorization: jwtToken,
  //"Access-Control-Allow-Origin": "*",
  //"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  //"Access-Control-Allow-Headers": "*",
  //"Content-Type, Authorization, X-Requested-With": "*"
};

export default function Table({ table, setTableChanged }) {
  axios.defaults.headers.common["Authorization"] = jwtToken;
  const unoccupyTable = async (id) => {
    if (window.confirm("Tem certeza que deseja desocupar esta mesa") === true) {
      try {
        const result = await axios
          .put(`${Constants.BASE_URL}/table/leave/${id}`, {
            headers: headers,
          })
          .then((response) => {
            setTableChanged(true);
          })
          .catch((error) => {
            alert(error);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      {table.occupied === true ? (
        <div>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ background: "#D03C1E" }}
          >
            <h1 className="font-bold m-2">{table.tableNumber}</h1>
            <p className="font-bold m-2 text-[#F5f5f5]">Ocupada</p>
          </Box>
          <hr className="w-[100%] border-[#141414] mb-2" />
          <Box display="flex" justifyContent="space-between">
            <p className="m-1">{`Id: ${table.id}`}</p>
            <button
              onClick={() => unoccupyTable(table.id)}
              className="font-bold ml-2 w-52 h-7 bg-[#f5f5f5] shadow-md rounded-lg"
            >
              Desocupar
            </button>
          </Box>
        </div>
      ) : (
        <div>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ background: "#92db5a" }}
          >
            <h1 className="font-bold m-2">{table.tableNumber}</h1>
            <p className="font-bold m-2 text-[#141414]">Desocupada</p>
          </Box>
          <hr className="w-[100%] border-[#141414] mb-2" />
          <Box display="flex" justifyContent="space-between">
            <p className="m-1">{`Id: ${table.id}`}</p>
            <button className="font-bold ml-2 w-52 h-7 bg-[#f5f5f5] shadow-md rounded-lg cursor-not-allowed opacity-50">
              Desocupar
            </button>
          </Box>
        </div>
      )}
    </div>
  );
}
