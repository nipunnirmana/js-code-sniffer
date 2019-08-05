import React, { useEffect, useState } from "react";
import cp from "child_process";
import app from "electron";

import "./Start.scss";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Splash(props) {
  const [primaryText, setPrimaryText] = useState("Drag and drop to Start");
  const [secondaryText, setSecondaryText] = useState(
    "Drag and drop the project root folder"
  );

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
      setPrimaryText("Checking ...");
      setSecondaryText("");

      const file = e.dataTransfer.files;
      let fileList = [];

      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        fileList.push(formatPath(e.dataTransfer.files[i].path));
      }

      const configPath = `${formatPath(
        app.remote.process.env.PWD
      )}/.eslintrc.json`;

      cp.exec(
        `./node_modules/.bin/eslint ${fileList.join(
          " "
        )} --c ${configPath} -f json  --max-warnings 10`,
        (err, stdout, stderr) => {
          debugger;
          const parsedErrorData = JSON.parse(stdout);
          props.history.push({
            pathname: "/results",
            state: { parsedErrorData }
          });
        }
      );
    }
  };

  return (
    <Container className="start-wrapper" onDrop={handleOnDrop}>
      <Row>
        <Col lg={12} className="start-primary-text">
          {primaryText}
        </Col>
        <Col lg={12} className="start-secondary-text">
          {secondaryText}
        </Col>
      </Row>
    </Container>
  );
}

export default Splash;
