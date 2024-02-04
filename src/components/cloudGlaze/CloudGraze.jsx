import React, { useEffect, useState } from "react";
import axios from "axios";
import TableData from "./TableData";
import "./TableData.css";
import LoadingPage from "../loading/LoadingPage";

const CloudGraze = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dapper-window-production.up.railway.app/api.cg/getdata/1"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <div>{data ? <TableData data={data} /> : <LoadingPage />}</div>;
};

export default CloudGraze;
