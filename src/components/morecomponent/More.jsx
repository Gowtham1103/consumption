import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./more.css";
import { useLocation, useNavigate } from "react-router-dom";

const More = ({ moreData, doorNo }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cgName } = location.state;

  const goBack = () => {
    navigate("/Page2");
  };

  const goHome = () => {
    navigate("/");
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const filteredData = Object.keys(moreData).filter((date) => {
    return (
      (!startDate || new Date(date) >= startDate) &&
      (!endDate || new Date(date) <= endDate)
    );
  });

  return (
    <div className="container">
      <div className="top-text">
        <span>
          Flat Numbers <span className="flat-no"> {doorNo} </span>
        </span>
        <span>Appartment Name : {cgName}</span>
        <span>
          Active Flowmeters
          <div className="flow">
            <p>FLowmeter 1: {"GWFMBH0010"}</p>
            <p>FLowmeter 2: {"GWFMBH0011"}</p>
            <p>FLowmeter 3: {"GWFMBH0012"}</p>
            <p>FLowmeter 4: {"GWFMBH0013"}</p>
            <p className="para">
              (Inactive Flowmeters are unable to send data due to power problem
              by Apartment.)
            </p>
          </div>
        </span>
      </div>
      <div className="top-btn">
        <button className="btn-color" onClick={goBack}>
          Previous
        </button>
        <button className="btn-color" onClick={goHome}>
          Logout
        </button>
      </div>

      <div className="t-scroll">
        <div className="top-btn ">
          <div>
            <label className="lab" htmlFor="">
              Start date
            </label>
            <DatePicker
              className="Datepicker"
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Start Date"
            />
          </div>
          <div>
            <label className="lab" htmlFor="">
              End Date
            </label>
            <DatePicker
              className="Datepicker"
              placeholderText="Select End Date"
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        <table>
          <thead>
            <tr className="height-table">
              <th className="table-head-more">Date</th>
              <th className="table-head-more">Fm1</th>
              <th className="table-head-more">Fm2</th>
              <th className="table-head-more">Fm3</th>
              <th className="table-head-more">Total</th>
            </tr>
          </thead>

          <tbody className="even-table">
            {filteredData.map((date) => {
              const dayTotals = moreData[date]?.day_tot || ["0", "0", "0"];
              const totalValue = dayTotals.reduce(
                (accumulator, currentValue) =>
                  accumulator + parseInt(currentValue, 10),
                0
              );

              return (
                <tr key={date}>
                  <td>{moreData[date].date}</td>
                  <td>{dayTotals[0] !== undefined ? dayTotals[0] : "0"}</td>
                  <td>{dayTotals[1] !== undefined ? dayTotals[1] : "0"}</td>
                  <td>{dayTotals[2] !== undefined ? dayTotals[2] : "0"}</td>
                  <td>{isNaN(totalValue) ? "0" : totalValue}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default More;
