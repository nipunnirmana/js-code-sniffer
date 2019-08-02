import React, { useEffect } from "react";
import cp from "child_process";
import app from "electron";

import "./start.scss";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Splash(props) {
  useEffect(() => {
    document.ondragover = document.ondrop = ev => {
      ev.preventDefault();
    };
  });

  const formatPath = path =>
    path
      .replace(/[(]/g, "\\(")
      .replace(/[)]/g, "\\)")
      .replace(/ /g, "\\ ");

  const formatErrorType = severity => (severity === 2 ? "error" : "warning");

  const handleOnDrop = e => {
    if (e.dataTransfer.files) {
      const file = e.dataTransfer.files;
      let fileList = [];

      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        fileList.push(formatPath(e.dataTransfer.files[i].path));
      }

      const configPath = `${formatPath(
        app.remote.process.env.PWD
      )}/.eslintrc.json`;

      cp.exec(
        `eslint ${fileList.join(" ")} --c ${configPath} -f json`,
        (err, stdout, stderr) => {
          const parsedErrorData = JSON.parse(stdout);
          props.history.push("/results", { parsedErrorData });
        }
      );
    }
  };

  return (
    <Container className="start-wrapper" onDrop={handleOnDrop}>
      <Row>
        <Col lg={12} className="start-primary-text">
          Drag and drop to Start
        </Col>
        <Col lg={12} className="start-secondary-text">
          Drag and drop the project root folder
        </Col>
      </Row>
    </Container>
  );
}

export default Splash;
