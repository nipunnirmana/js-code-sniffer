import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./Results.scss";
import Errors from "./Errors";

function Results(props) {
  const [errorSummary, setErrorSummary] = useState();
  const [file, setFile] = useState();
  const [errors, setErrors] = useState([]);
  const [source, setSource] = useState();
  const [path, setPath] = useState("");

  let renderBlock = "";

  const fileList = data => {
    if (props.parsedErrorData) {
      return props.parsedErrorData.map((val, key) => {
        const { errorCount, warningCount } = val;
        let errors = false;
        if (errorCount + warningCount !== 0) {
          errors = (
            <li
              key={key}
              onClick={event => {
                const activeElement = document.querySelector(
                  ".file-list li.active"
                );
                if (activeElement) {
                  activeElement.classList.remove("active");
                }

                event.target.className += " active";

                updateResult(val);
              }}
            >
              {val.filePath.split("/").pop()}
            </li>
          );
        }
        return errors;
      });
    }
  };

  useEffect(() => {
    renderBlock = (
      <Container fluid>
        <Row>
          <Col xs={3} className="file-list">
            <Row className="file-list-row">
              <Col lg={12} className="text-right">
                <Row>
                  <Col lg={12}>
                    <Button variant="outline-success" size="sm" onClick={reset}>
                      START OVER
                    </Button>
                  </Col>

                  <Col lg={12}>
                    <Button variant="outline-danger" size="lg">
                      RUN AUTO FIX
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col lg={12}>{fileList()}</Col>
            </Row>
          </Col>
          <Col xs={9} className="results">
            <Row>
              <Col lg={12} className="results-summary">
                {errorSummary}
              </Col>
              <Col lg={12} className="results-file-path">
                {file}
              </Col>
              <Col lg={12} className="error-list">
                <Errors errors={errors} source={source} />
              </Col>

              <Col lg={12} className="results-ready active">
                Select a file from the side panel
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
    setPath(renderBlock);
  });

  const updateResult = result => {
    const { errorCount, warningCount, filePath, messages, source } = result;
    const errorSummaryMsg = `${errorCount +
      warningCount} problems (${errorCount} Errors, ${warningCount} Warnings)`;
    setFile(filePath);
    setErrorSummary(errorSummaryMsg);
    setSource(source);
    setErrors(messages);
    window.scrollTo(0, 0);
    const resultsReadyMsg = document.querySelector(".results-ready");
    resultsReadyMsg.classList.remove("active");
  };

  const reset = () => {
    window.location.reload();
  };

  return path;
}

export default Results;
