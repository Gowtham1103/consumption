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
          "https://api.jsonbin.io/v3/b/65e332891f5677401f373932"
        );
        setData(response.data.record);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <div>{data ? <TableData data={data} /> : <LoadingPage />}</div>;
};

export default CloudGraze;
