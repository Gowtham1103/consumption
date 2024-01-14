import React from "react";
import "./loading.css";

const LoadingPage = () => {
  return (
    <div className="main-l">
      <div className="container-fluid loader-wrap">
        <div className="row h-100">
          <div className="col-10 col-md-6 col-lg-5 col-xl-3 mx-auto text-center align-self-center">
            <div className="loader-cube-wrap mx-auto"></div>
            <p>
              Lets Manage Water Smartly
              <br />
              <strong>Please wait...</strong>
            </p>

            <div className="center-l">
              <div id="mask">GoWatr</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;