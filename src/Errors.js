import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Errors.scss";

export default function(props) {
  const { source } = props;
  return props.errors.map((error, key) => {
    const {
      line,
      endLine,
      message,
      ruleId,
      column,
      endColumn,
      severity
    } = error;
    const currentErrorSource = source.split("\n")[line - 1];

    return (
      <li key={key} className={severity == 2 ? "error-msg" : "warning-msg"}>
        <Row>
          <Col lg={12}>
            <span className="error-summary">{`${line}:${endLine ||
              line} ${message}`}</span>
          </Col>
          <Col lg={12} className="error-source">
            {currentErrorSource}
          </Col>
        </Row>
      </li>
    );
  });
}
