import React, { useEffect, useState } from "react";
import cp from "child_process";
import app from "electron";

import "./Start.scss";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Start(props) {
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

  const reset = () => {
    props.history.go("/start");
  };

  const handleOnDrop = e => {
    if (e.dataTransfer.files) {
      setPrimaryText("Checking ...");
      setSecondaryText("Please wait this may take sometime...");

      const file = e.dataTransfer.files;
      let fileList = [];

      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        fileList.push(formatPath(e.dataTransfer.files[i].path));
      }

      const configPath = `${formatPath(
        app.remote.process.env.PWD
      )}/.eslintrc.json`;

      const eslintFlags = [
        `${fileList.join(" ")} --c ${configPath}`,
        `--no-eslintrc`,
        `-f json`,
        `--ignore-pattern  '**/node_modules'`,
        `--ignore-pattern  '**/plugins/'`,
        `--ignore-pattern '**/*.eslintrc'`,
        `--ignore-pattern '**/*.min.js'`,
        `--ignore-pattern '**/requirejs-config.js'`
      ];

      cp.exec(
        `eslint ${eslintFlags.join(" ")}`,
        { maxBuffer: Infinity },
        (err, stdout, stderr) => {
          if (stderr.length) {
            if (stderr.indexOf("No files matching the pattern") > 0) {
              setPrimaryText("No Errors Found");
              setSecondaryText(
                <Button variant="outline-success" size="sm" onClick={reset}>
                  START OVER
                </Button>
              );
            } else {
              setPrimaryText(stderr);
              setSecondaryText("");
            }
          } else {
            try {
              const parsedErrorData = JSON.parse(stdout);
              props.history.push({
                pathname: "/results",
                state: { parsedErrorData }
              });
            } catch (error) {
              console.error("Error:Parsed JSON", error);
              setPrimaryText(error.toString());
              setSecondaryText("Please try again...");
            }
          }
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

export default Start;
