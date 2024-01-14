import React, { useState } from "react";
import "./Invoice.css";
import invoice_header from "/public/invoice_header.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Invoice = ({ serverData }) => {
  const { index } = useParams();

  const location = useLocation();

  const { cgName } = location.state;

  const lastMonthTotal = serverData.last_month_tot[index];
  const doorNumber = serverData.door_no[index];
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditMode1, setIsEditMode1] = useState(false);
  const [showPreviewButtons, setShowPreviewButtons] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("");
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const handleMonthChange = (event) => {
    const inputMonth = event.target.value;
    const [year, month] = inputMonth.split("-");
    const monthName = new Date(`${year}-${month}-01`).toLocaleString("en-US", {
      month: "long",
    });
    setSelectedMonth(monthName);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
    setName("");
    setNumber("");
    setIsEditMode(false);
  };

  const handleEditClick1 = () => {
    setIsEditMode1(true);
  };

  const handleSaveClick1 = () => {
    setIsEditMode1(false);
  };

  const handleCancelClick1 = () => {
    setPrice("");
    setIsEditMode1(false);
  };

  const handlePreviewClick = () => {
    setShowPreviewButtons(false);
  };

  const handlePrintClick = () => {
    window.print();
  };
  const goToDownload = () => {
    navigate("/invoicepdf", {
      state: {
        lastMonthTotal,
        doorNo: doorNumber,
        name,
        number,
        price,
        selectedMonth,
        cgName,
      },
    });
  };
  return (
    <div className="main-container-i" id="main-container">
      <div className="whole bg-light">
        <div className="img">
          <img className="header-img" src={invoice_header} alt="header img" />
        </div>
        <div className="contents-container">
          <div>
            <label className="date">Date: {`${day}.${month}.${year}`}</label>

            <div className="input-top">
              <p className="bold">Invoice To:</p>
              <div className="in-btn">
                <span>
                  <input
                    className="input-field"
                    type="text"
                    value={name}
                    placeholder="Enter Name:"
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditMode}
                  />
                </span>
                <span>
                  <input
                    type="number"
                    value={number}
                    className="input-field"
                    onChange={(e) => setNumber(e.target.value)}
                    disabled={!isEditMode}
                    placeholder="Enter Mobile:"
                  />
                  <span className="user-btn">
                    {isEditMode ? (
                      <span>
                        <button
                          className="save-can-space green"
                          onClick={handleSaveClick}
                        >
                          Save
                        </button>
                        <button
                          className="save-can-space red"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button className="userbtn" onClick={handleEditClick}>
                        Update User
                      </button>
                    )}
                  </span>
                </span>
              </div>
            </div>

            <div className="address-section">
              <address>
                <p>
                  {doorNumber}, RK Shanmugam Salai <br />
                  T.S Lakshmanan St, K.K Nagar,
                  <br />
                  Chennai, Tamil Nadu 600078.
                </p>
              </address>
            </div>
          </div>

          <div className="address-section">
            <label className="inp-hidden">Price Per Liter:</label>

            <div className="set-price">
              <input
                type="text"
                className="input-field inp-hidden"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={!isEditMode1}
                placeholder="₹ / L"
              />

              <span>
                {isEditMode1 ? (
                  <span>
                    <button
                      className="save-can-space green"
                      onClick={handleSaveClick1}
                    >
                      Save
                    </button>

                    <button
                      className="save-can-space red"
                      onClick={handleCancelClick1}
                    >
                      Cancel
                    </button>
                  </span>
                ) : (
                  <button
                    className="userbtn2 userbtn"
                    onClick={handleEditClick1}
                  >
                    Change Price
                  </button>
                )}
              </span>
              <input
                type="month"
                className="month"
                onChange={handleMonthChange}
              />
            </div>
          </div>
          <div className="table-padding">
            <table className="table-radius">
              <thead>
                <tr className="table-head bold">
                  <td>Flat Number</td>
                  <td>Apartment Name</td>
                  <td>Month</td>
                  <td>Total Usage in Liters</td>
                  <td>Price / Liter</td>
                </tr>
              </thead>
              <tbody className="table-border">
                <tr>
                  <td>{doorNumber}</td>
                  <td>{cgName}</td>
                  <td>{selectedMonth}</td>
                  <td>{lastMonthTotal}</td>
                  <td>{`₹ ${price}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="value">
          <span className="bold bottom">
            {`Calculation : ₹ ${price} x ${lastMonthTotal} L`} <br />
            <div className="grand-total">
              Grand Total: ₹{" "}
              <span className="tot">{`${price * lastMonthTotal}`}</span>
            </div>
          </span>
        </div>

        <div className="totals-section">
          <span>
            <h6 className="bold">Terms & Conditions</h6>
            <p>
              Authoritatively envisioned business action items through parallel.
            </p>
            <br />
            <h6 className="bold">Note: </h6>
            <p>
              This is a computer-generated receipt and does not require a
              physical signature.
            </p>
          </span>
        </div>

        <div className="preview">
          {showPreviewButtons ? (
            <button className="preview-btn" onClick={handlePreviewClick}>
              Preview
            </button>
          ) : (
            <>
              <button
                className="preview-btn pad-pre"
                onClick={handlePrintClick}
              >
                Print
              </button>
              <span>
                <button className="preview-btn pad-pre" onClick={goToDownload}>
                  Download PDF
                </button>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
