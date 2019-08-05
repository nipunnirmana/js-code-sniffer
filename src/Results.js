import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Results.scss";

import Errors from "./Errors";

function Results(props) {
  const [result, setResult] = useState();

  const [errorSummary, setErrorSummary] = useState();
  const [file, setFile] = useState();
  const [errors, setErrors] = useState([]);
  const [source, setSource] = useState();

  const fileList = data => {
    if (props.location.state && props.location.state.parsedErrorData) {
      return props.location.state.parsedErrorData.map((val, key) => (
        <li
          key={key}
          onClick={() => {
            updateResult(val);
          }}
        >
          {val.filePath.split("/").pop()}
        </li>
      ));
    }
  };

  const updateResult = result => {
    const { errorCount, warningCount, filePath, messages, source } = result;
    const errorSummaryMsg = `${errorCount +
      warningCount} problems (${errorCount} Errors, ${warningCount} Warnings)`;
    setFile(filePath);
    setResult(result);
    setErrorSummary(errorSummaryMsg);
    setSource(source);
    setErrors(messages);
  };

  useEffect(() => {
    if (!(props.location.state && props.location.state.parsedErrorData)) {
      props.history.push("/start");
    }
  });

  return (
    <Container>
      <Row>
        <Col lg={3} className="file-list">
          <Row>
            <Col lg={12}>{fileList()}</Col>
          </Row>
        </Col>
        <Col lg={9} className="results">
          <Row>
            <Col lg={12} className="results-title">
              Results
            </Col>
            <Col lg={12} className="results-summary">
              {errorSummary}
            </Col>
            <Col lg={12} className="results-file-path">
              {file}
            </Col>
            <Col lg={12} className="error-list">
              <Errors errors={errors} source={source} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Results;
