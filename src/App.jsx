import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CloudGraze from "./components/cloudGlaze/CloudGraze";
import ApiLit from "./components/property/ApiLit";
import FetchingData from "./components/Invoice/FetchingData";
import LoginLogic from "./components/loginpage/LoginLogic";
import DownloadInvoice from "./components/Invoice/DownloadInvoice";
import FetchMore from "./components/morecomponent/FetchMore";
import FetchPlutus from "./components/plutus/FetchPlutus";
import FetchingData2 from "./components/cloudGlaze/FetchingData2";

const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    return () => sessionStorage.removeItem("isAuthenticated");
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<LoginLogic setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route
        path="/Page2"
        element={
          <ProtectedRoute
            element={<ApiLit />}
            isAuthenticated={isAuthenticated}
          />
        }
      />
      <Route
        path="/cloudGraze"
        element={
          <ProtectedRoute
            element={<CloudGraze />}
            isAuthenticated={isAuthenticated}
          />
        }
      />
      <Route
        path="/consumption"
        element={
          <ProtectedRoute
            element={<FetchPlutus />}
            isAuthenticated={isAuthenticated}
          />
        }
      />
      <Route
        path="/moreFetching/:doorNo"
        element={
          <ProtectedRoute
            element={<FetchMore />}
            isAuthenticated={isAuthenticated}
          />
        }
      />

      <Route
        path="/invoice2/:index"
        element={
          <ProtectedRoute
            element={<FetchingData2 />}
            isAuthenticated={isAuthenticated}
          />
        }
      />

      <Route
        path="/invoice/:index"
        element={
          <ProtectedRoute
            element={<FetchingData />}
            isAuthenticated={isAuthenticated}
          />
        }
      />

      <Route
        path="/invoicepdf"
        element={
          <ProtectedRoute
            element={<DownloadInvoice />}
            isAuthenticated={isAuthenticated}
          />
        }
      />
    </Routes>
  );
}

export default App;
