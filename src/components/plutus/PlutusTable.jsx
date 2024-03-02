import React, { useEffect, useState } from "react";
import fm1 from "/public/fm1.png";
import { useNavigate } from "react-router-dom";

const PlutusTable = ({ data }) => {
  var cgName = "Plutus";

const time1 = data.record.time;

let deactiveMeters = 0;
let activeMeters = 0;

const StatusCalculation = () => {
  if (Array.isArray(data.record.time)) {
    data.record.time.forEach((doorStatus) => {
      if (Array.isArray(doorStatus)) {
        doorStatus.forEach((status) => {
          if (status === "active") {
            activeMeters++;
          } else if (status === "deactive") {
            deactiveMeters++;
          } else {
            console.error("Invalid status found:", status);
          }
        });
      } else {
        console.error("Each door status should be an array:", doorStatus);
      }
    });
  } else {
    console.error("Data time should be an array:", data.record.time);
  }
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

    navigate(`/invoice2/${encodedIndex}`, {
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
          <button className="button1 btn btn-primary" onClick={previousBtn}>
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
            {data.record.door_no.map((doorNo, index) => (
              <tr key={index}>
                <td>{doorNo}</td>
                <td>
                  <div className="row tablesize">
                    {Array.isArray(data.record.time[index]) ? (
                      data.record.time[index].slice(0, 4).map((status, innerIndex) => (
                        <span
                          key={innerIndex}
                          className={`circle ${
                            status === "active" ? "active" : "deactive"
                          }`}
                        >
                          <img className="img-act" src={fm1} alt="" />
                        </span>
                      ))
                    ) : (
                      <span>{`Data Not Found `}</span>
                    )}
                    {Array.isArray(data.record.time[index]) &&
                      data.record.time[index].length > 4 && (
                        <span>{`+${data.record.time[index].length - 4} more`}</span>
                      )}
                  </div>
                </td>
                <td className="gen-last">
                  {data.record.last_month_tot[index]}

                  <button
                    className="generate-bill-button-t"
                    onClick={() => invoice(index)}
                  >
                    Generate Bill
                  </button>
                </td>
                <td>{data.record.Current_month_tot[index]}</td>
                <td>{data.record.last_tot[index]}</td>
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

export default PlutusTable;
