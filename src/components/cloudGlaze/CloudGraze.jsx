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
          "https://pleasant-pollution-production.up.railway.app/api/data.spring"
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
