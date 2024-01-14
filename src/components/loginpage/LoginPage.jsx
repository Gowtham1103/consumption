import logo from "/public/logo 3.png";
import waterGif from "/public/water.gif";
import "./loginpage.css";

const LoginPage = ({ setPassword, setUsername, handleCheck, errorMessage }) => {
  return (
    <div
      className="body body-scroll d-flex flex-column h-100 owner-bg bg1"
      data-page="signin"
    >
      <img className="owner-login-bg-img" src={waterGif} alt="" />

      <main className="container-fluid h-100 main-container d-flex align-items-right justify-content-center">
        <div className="overlay-image text-end">
          <div className="col-12 text-center align-self-center ">
            <div className="row">
              <div className="center">
                <img className="gowatr" src={logo} alt="logo" />
              </div>
              <div className="col text-center align-self-center"></div>
            </div>
          </div>

          <div className="col-12 mx-auto text-center ">
            <div className="row">
              <div className="text-right">
                <form className="login-card" onSubmit={handleCheck}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <p className="error">{errorMessage}</p>
                  <button type="submit" className="owner-log-btn">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
