import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import InvoiceForm from "./components/InvoiceForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListInvoice from "./components/ListInvoice";

const App = () => {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <BrowserRouter>
        <Routes>
          <Route
            path={"/list-invoice"}
            element={
                <ListInvoice />
            }
          />
          <Route
            path={"/create-invoice"}
            element={
              <Container>
                <InvoiceForm />
              </Container>
            }
          />

          <Route
            path={"/edit-invoice"}
            element={
              <Container>
                <InvoiceForm isEdit={true}/>
              </Container>
            }
          />
          <Route
            path={"*"}
            element={
              <Container>
                <InvoiceForm />
              </Container>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
