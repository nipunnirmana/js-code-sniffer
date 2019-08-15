import React, { useEffect, useState } from "react";
import cp from "child_process";
import app from "electron";

import "./Start.scss";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Results from "./Results";

function Start(props) {
  const [primaryText, setPrimaryText] = useState("Drag and drop to Start");
  const [secondaryText, setSecondaryText] = useState(
    "Drag and drop the project root folder"
  );

  const [path, setPath] = useState("");

  const getPath = (primaryTextData, secondaryTextData) => {
    return (
      <Container className="start-wrapper" onDrop={handleOnDrop} fluid>
        <Col lg={12}>
          <Row>
            <Col lg={12} className="start-primary-text">
              {primaryTextData}
            </Col>
            <Col lg={12} className="start-secondary-text">
              {secondaryTextData}
            </Col>
          </Row>
        </Col>
      </Container>
    );
  };

  const handleOnDrop = e => {
    if (e.dataTransfer.files) {
      setPrimaryText("Checking ...");
      setSecondaryText("Please wait this may take sometime...");
      setPath(getPath("Checking ...", "Please wait this may take sometime..."));
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
        `--quiet`,
        `-f json`,
        `--ignore-pattern  '**/node_modules'`,
        `--ignore-pattern  '**/plugins/'`,
        `--ignore-pattern '**/*.eslintrc'`,
        `--ignore-pattern '**/*.config.js'`,
        `--ignore-pattern '**/*.chunk.js'`,
        `--ignore-pattern '**/*.babel.js'`,
        `--ignore-pattern '**/*.min.js'`,
        `--ignore-pattern '**/requirejs-config.js'`
      ];

      cp.exec(
        `eslint ${eslintFlags.join(" ")}`,
        { maxBuffer: Infinity },
        (err, stdout, stderr) => {
          if (stderr.length) {
            if (stderr.indexOf("No files matching the pattern") > 0) {
              document.querySelector("html").classList.remove("height-auto");
              setPath(
                getPath(
                  "No Errors Found",
                  <Button variant="outline-success" size="sm" onClick={reset}>
                    START OVER
                  </Button>
                )
              );
            } else {
              setPath(getPath(setPrimaryText(stderr), ""));
              setSecondaryText("");
            }
          } else {
            try {
              const parsedErrorData = JSON.parse(stdout);
              if (parsedErrorData.length) {
                document.querySelector("html").className += " height-auto";
                setPath(
                  getPath(<Results parsedErrorData={parsedErrorData} />, "")
                );
              } else {
                document.querySelector("html").classList.remove("height-auto");
                setPath(
                  getPath(
                    "No Errors Found",
                    <Button variant="outline-success" size="sm" onClick={reset}>
                      START OVER
                    </Button>
                  )
                );
              }
            } catch (error) {
              document.querySelector("html").classList.remove("height-auto");
              console.error("Error:Parsed JSON", error);
              setSecondaryText("Please try again...");
              setPath(getPath(error.toString(), "Please try again..."));
            }
          }
        }
      );
    }
  };

  useEffect(() => {
    document.ondragover = document.ondrop = ev => {
      ev.preventDefault();
    };
    setPath(getPath(primaryText, secondaryText));
  }, []);

  const formatPath = path =>
    path
      .replace(/[(]/g, "\\(")
      .replace(/[)]/g, "\\)")
      .replace(/ /g, "\\ ");

  const reset = () => {
    window.location.reload();
  };

  return path;
}

export default Start;
