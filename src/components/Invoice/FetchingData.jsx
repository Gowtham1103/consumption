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
          "https://api.jsonbin.io/v3/b/65e332891f5677401f373932"
        );
        setServerData(response.data.record);
        console.log(serverData);
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
