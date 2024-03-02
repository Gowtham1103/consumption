import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../loading/LoadingPage";
import Invoice2 from "../Invoice/Invoic2";

const FetchingData2 = () => {
  const { index } = useParams();
  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.jsonbin.io/v3/b/65e32be41f5677401f37364a"
        );
        setServerData(response.data.record);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="door">
      {serverData ? (
        <Invoice2 serverData={serverData} index={index} />
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default FetchingData2;
