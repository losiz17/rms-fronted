import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../style/header.css";

import { BrowserRouter, Route, Link } from "react-router-dom";

const header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">RMS</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link>
            <Link to="/search">Search</Link>
          </Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Link to="/register">
          <Button variant="outline-success">Sign up</Button>
        </Link>
        <Button variant="success">Sign in</Button>
      </Navbar>
    </>
  );
};

export default header;
