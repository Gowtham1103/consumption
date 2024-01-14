import React, { useEffect, useState } from "react";
import axios from "axios";
import Page2 from "./Page2";

const ApiLit = () => {
  const [total, setTotal] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.gowatr.com/wms/consumption/api/totalconsumption.php?total=cg"
        );

        console.log(response.data);
        setTotal(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const [totalpl, setTotalpl] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.gowatr.com/wms/consumption/api/totalconsumption.php?total=pl"
        );

        console.log(response.data);
        setTotalpl(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Page2 total={total} totalpl={totalpl} />
    </div>
  );
};

export default ApiLit;
