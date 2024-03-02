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
          "https://api.jsonbin.io/v3/b/65e32be41f5677401f37364a"
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
