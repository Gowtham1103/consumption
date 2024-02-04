import React, { useEffect, useState } from "react";
import axios from "axios";
import PlutusTable from "./PlutusTable";
import "./plutus.css";
import LoadingPage from "../loading/LoadingPage";

const FetchPlutus = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dapper-window-production.up.railway.app/api.pl/getdata/1"
        );
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <div>{data ? <PlutusTable data={data} /> : <LoadingPage />}</div>;
};

export default FetchPlutus;
