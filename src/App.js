import React, { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./App.scss";

function Splash(props) {
  useEffect(() => {
    setTimeout(() => {
      props.history.push("/start");
    }, 2000);
  });

  return (
    <Container className="app-wrapper">
      <Row>
        <Col lg={12}>JS CODE SNIFFER</Col>
      </Row>
    </Container>
  );
}

export default Splash;
