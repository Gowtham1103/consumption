import React, { useEffect } from "react";
import "./DownloadInvoice.css";
import waterbill_header from "/public/invoice_header.png";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";

const DownloadInvoice = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const location = useLocation();
  const { lastMonthTotal, doorNo, name, number, price, cgName, selectedMonth } =
    location.state;

  useEffect(() => {
    const downloadAsPDF = () => {
      html2pdf(document.getElementById("main-container")).then(function (pdf) {
        pdf.save("downloaded_invoice.pdf");
      });
    };

    downloadAsPDF();
  }, []);
  return (
    <div className="main-container-i" id="main-container">
      <div className="whole">
        <div className="img">
          <img className="header-img" src={waterbill_header} alt="header img" />
        </div>
        <div className="contents-container">
          <div>
            <div className="date">
              <label>Date: {`${day}.${month}.${year}`}</label>
            </div>

            <div className="input-top">
              <p className="bold">Invoice To:</p>

              <p className="name-di">{name}</p>
              <p className="name-di">{number}</p>
            </div>

            <div className="address-section">
              <address>
                <p>
                  {doorNo}, RK Shanmugam Salai <br />
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
              <p></p>
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
                  <td>{doorNo}</td>
                  <td>{cgName}</td>
                  <td>{selectedMonth}</td>
                  <td>{lastMonthTotal}</td>
                  <td>{`₹ ${price} `}</td>
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
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default DownloadInvoice;
