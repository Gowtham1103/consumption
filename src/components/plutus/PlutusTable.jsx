import React, { useEffect, useState } from "react";
import fm1 from "/public/fm1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlutusTable = ({ data }) => {
  console.log(data);
  var cgName = "Plutus";
  const time1 = data.time;

  let deactiveMeters = 0;
  let activeMeters = 0;

  useEffect(() => {
    axios
      .get("http://localhost:3001/check-and-send-email")
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  }, [activeMeters]);

  const StatusCalculation = () => {
    if (Array.isArray(data.time)) {
      data.time.forEach((doorStatus) => {
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
      console.error("Data time should be an array:", data.time);
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
            {data.door_no.map((doorNo, index) => (
              <tr key={index}>
                <td>{doorNo}</td>
                <td>
                  <div className="row tablesize">
                    {Array.isArray(data.time[index]) ? (
                      data.time[index].slice(0, 4).map((status, innerIndex) => (
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
                    {Array.isArray(data.time[index]) &&
                      data.time[index].length > 4 && (
                        <span>{`+${data.time[index].length - 4} more`}</span>
                      )}
                  </div>
                </td>
                <td className="gen-last">
                  {data.last_month_tot[index]}

                  <button
                    className="generate-bill-button-t"
                    onClick={() => invoice(index)}
                  >
                    Generate Bill
                  </button>
                </td>
                <td>{data.Current_month_tot[index]}</td>
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

export default PlutusTable;
