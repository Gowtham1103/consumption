import React, { useEffect, useState } from "react";
import fm1 from "/public/fm1.png";
import { useNavigate } from "react-router-dom";

const TableData = ({ data }) => {
  var cgName = "Cloud Graze";
  const time1 = data.time;
  let activeMeters = 0;
  let deactiveMeters = 0;
 
  
  const StatusCalculation = () => {
    data.time.forEach((row) => {
      row.forEach((state) => {
        if (state === "active") {
          activeMeters++;
        } else {
          deactiveMeters++;
        }
      });
    });
  };
  
  {
    time1 ? StatusCalculation() : "ok";
  }

  const navigate = useNavigate();
  const previousBtn = () => {
    navigate("/Page2");
  };
  const logoutBtn = () => {
    navigate("/");
  };

  const invoice = (index) => {
    const encodedIndex = encodeURIComponent(index);

    navigate(`/invoice/${encodedIndex}`, {
      state: {
        cgName,
      },
    });
  };
  const morePage = (doorNo) => {
    const encodedDoorNo = encodeURIComponent(doorNo);
    navigate(`/moreFetching/${encodedDoorNo}`, {
      state: {
        cgName,
      },
    });
  };
  


  return (
    <div>
      <div>
        <div className="text-top">
          <p>{cgName} - Water Consumption</p>
          <p>Total Flowmeters:{activeMeters + deactiveMeters}</p>
          <p>Active Flowmeters:{activeMeters} </p>
        </div>
        <div className="btn-top">
          <button className="button1 btn btn-primary" onClick={previousBtn} >
            Previous
          </button>
          <button className="button2 btn btn-danger" onClick={logoutBtn}>
            Log out
          </button>
        </div>
      </div>
      <div className="t-scroll">
        <table>
          <thead>
            <tr>
              <th className="table-head">Door No</th>
              <th className="table-head">Time Status</th>
              <th className="table-head">Last Month Total</th>
              <th className="table-head">Current Month Total</th>
              <th className="table-head">Last Total</th>
              <th className="table-head">More Detail</th>
            </tr>
          </thead>

          <tbody>
            {data.door_no.map((doorNo, index) => (
              <tr key={index}>
                <td>{doorNo}</td>
                <td>
                  <div className="row">
                    {data.time[index].map((status, innerIndex) => (
                      <span
                        key={innerIndex}
                        className={`circle ${
                          status === "active" ? "active" : "deactive"
                        }`}
                      >
                        <img className="img-act" src={fm1} alt="" />
                      </span>
                    ))}
                  </div>
                </td>
                <td className="gen-last">
                  {data.last_month_tot[index]}{" "}
                  <button
                    className="generate-bill-button-t"
                    onClick={() => invoice(index)}
                  >
                    Generate Bill
                  </button>
                </td>
                <td>{data.current_month_tot[index]}</td>
                <td>{data.last_tot[index]}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="more-button"
                      onClick={() => morePage(doorNo)}
                    >
                      More{" "}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableData;
