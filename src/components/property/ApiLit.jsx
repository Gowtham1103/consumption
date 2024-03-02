import React, { useEffect, useState } from "react";
import axios from "axios";
import Page2 from "./Page2";

const ApiLit = () => {
  const [total, setTotal] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.jsonbin.io/v3/b/65e33367266cfc3fde9225e8"
        );
        setTotal(response.data.record);
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
          "https://api.jsonbin.io/v3/b/65e333ba266cfc3fde92260f"
        );
        setTotalpl(response.data.record);
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
