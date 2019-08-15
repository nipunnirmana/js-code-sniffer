import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Start from "./Start";

import "./App.scss";

function Splash(props) {
  const [path, setPath] = useState(
    <Container className="app-wrapper">
      <Row>
        <Col lg={12}>JS CODE SNIFFER</Col>
      </Row>
    </Container>
  );
  useEffect(() => {
    setTimeout(() => {
      setPath(<Start />);
    }, 1500);
  });

  return path;
}

export default Splash;
