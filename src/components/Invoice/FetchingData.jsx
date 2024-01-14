import React, { useEffect, useState } from "react";
import Invoice from "./Invoice";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../loading/LoadingPage";

const FetchingData = () => {
  const { index } = useParams();
  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pleasant-pollution-production.up.railway.app/api/data.spring"
        );
        setServerData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="door">
      {serverData ? (
        <Invoice serverData={serverData} index={index} />
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default FetchingData;
