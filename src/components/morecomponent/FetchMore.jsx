import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import More from "./More";
import LoadingPage from "../loading/LoadingPage";

const FetchMore = () => {
  const [moreData, setMoreData] = useState(null);
  const { doorNo } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.gowatr.com/wms/consumption/api/fm_detailapi.php?door_no=${doorNo}`
        );
        setMoreData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {moreData ? (
        <More moreData={moreData} doorNo={doorNo} />
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default FetchMore;
