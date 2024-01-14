import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Page2.css";
import assets from "/public/plutus-building.jpg";
import building1 from "/public/cg-building.jpg";
import rightarrow from "/public/right-arrow.gif";

import { useNavigate } from "react-router-dom";

const Page2 = ({ total, totalpl }) => {
  const totalLiter = total.map((item) => {
    return item.tot;
  });
  const totalLiterpl = totalpl.map((item) => {
    return item.tot;
  });

  const navigate = useNavigate();
  const cloudGrazeData = () => {
    navigate("/cloudgraze");
  };

  const selectPlutus = () => {
    navigate("/consumption");
  };

  return (
    <Container
      fluid
      className="body body-scroll d-flex flex-column h-100 owner-bg bg1"
      data-page="signin"
    >
      <div id="loading-icon">
        <div className="spinner"></div>
      </div>

      <Row className="footer-card-p">
        <Col xs={12} className="text-center align-self-start">
          <Row>
            <h2 className="text-center ">Choose Property ▼</h2>
          </Row>
        </Col>
      </Row>

      <main className="container-fluid h-100 main-container position">
        <Row
          className="cen-p"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center !important",
          }}
        >
          <Col>
            <Row>
              <Col className="colspan-p">
                <ul id="cg">
                  <a id="click">
                    <li className="building-card-p" style={{ marginTop: "8%" }}>
                      <img className="right-arrow-p" src={rightarrow} alt="" />
                      <div className="overlay"></div>
                      <img
                        className="building-img-p"
                        src={building1}
                        alt=""
                        onClick={cloudGrazeData}
                      />

                      <div
                        className="informations-container-p"
                        onClick={cloudGrazeData}
                      >
                        <h5 className="title-p">CLOUD GRAZE</h5>
                        <div className="main-div">
                          Total : {(totalLiter / 1000).toFixed(2)} KL
                        </div>
                        <h6 className="main-div">Total Flowmeters: {130}</h6>
                      </div>
                    </li>
                  </a>
                </ul>
              </Col>
              <Col className="colspan-p ">
                <ul id="pl">
                  <li className="building-card-p" style={{ marginTop: "8%" }}>
                    <img className="right-arrow-p" src={rightarrow} alt="" />
                    <div className="overlay"></div>
                    <img
                      className="building-img-p"
                      src={assets}
                      onClick={selectPlutus}
                      alt=""
                    />

                    <div
                      className="informations-container-p"
                      onClick={selectPlutus}
                    >
                      <h5 className="title-p">PLUTUS</h5>
                      <div className="main-div">
                        Total :{(totalLiterpl / 1000).toFixed(2)} KL
                      </div>
                      <h6 className="main-div">Total Flowmeters: {478}</h6>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </main>
    </Container>
  );
};

export default Page2;
