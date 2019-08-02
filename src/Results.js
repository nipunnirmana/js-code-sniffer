import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Results(props) {
  const parsedErrorData = [
    {
      filePath: "/home/nipun/Desktop/test/a.js",
      messages: [
        {
          ruleId: "no-undef",
          severity: 2,
          message: "'alerz' is not defined.",
          line: 1,
          column: 1,
          nodeType: "Identifier",
          messageId: "undef",
          endLine: 1,
          endColumn: 6
        },
        {
          ruleId: "semi",
          severity: 2,
          message: "Missing semicolon.",
          line: 1,
          column: 9,
          nodeType: "ExpressionStatement",
          fix: {
            range: [8, 8],
            text: ";"
          }
        },
        {
          ruleId: "no-undef",
          severity: 2,
          message: "'alerz' is not defined.",
          line: 2,
          column: 1,
          nodeType: "Identifier",
          messageId: "undef",
          endLine: 2,
          endColumn: 6
        },
        {
          ruleId: "semi",
          severity: 2,
          message: "Missing semicolon.",
          line: 2,
          column: 9,
          nodeType: "ExpressionStatement",
          fix: {
            range: [17, 17],
            text: ";"
          }
        },
        {
          ruleId: "no-undef",
          severity: 2,
          message: "'alerz' is not defined.",
          line: 3,
          column: 1,
          nodeType: "Identifier",
          messageId: "undef",
          endLine: 3,
          endColumn: 6
        },
        {
          ruleId: "semi",
          severity: 2,
          message: "Missing semicolon.",
          line: 3,
          column: 9,
          nodeType: "ExpressionStatement",
          fix: {
            range: [26, 26],
            text: ";"
          }
        },
        {
          ruleId: "no-undef",
          severity: 2,
          message: "'alerz' is not defined.",
          line: 4,
          column: 1,
          nodeType: "Identifier",
          messageId: "undef",
          endLine: 4,
          endColumn: 6
        },
        {
          ruleId: "semi",
          severity: 2,
          message: "Missing semicolon.",
          line: 4,
          column: 9,
          nodeType: "ExpressionStatement",
          fix: {
            range: [35, 35],
            text: ";"
          }
        },
        {
          ruleId: "no-undef",
          severity: 2,
          message: "'alerz' is not defined.",
          line: 5,
          column: 1,
          nodeType: "Identifier",
          messageId: "undef",
          endLine: 5,
          endColumn: 6
        },
        {
          ruleId: "semi",
          severity: 2,
          message: "Missing semicolon.",
          line: 5,
          column: 9,
          nodeType: "ExpressionStatement",
          fix: {
            range: [44, 44],
            text: ";"
          }
        }
      ],
      errorCount: 10,
      warningCount: 0,
      fixableErrorCount: 5,
      fixableWarningCount: 0,
      source: "alerz(0)\nalerz(0)\nalerz(0)\nalerz(0)\nalerz(0)\n"
    },
    {
      filePath: "/home/nipun/Desktop/test/test1/test1.js",
      messages: [
        {
          ruleId: "no-undef",
          severity: 2,
          message: "'alerz' is not defined.",
          line: 1,
          column: 1,
          nodeType: "Identifier",
          messageId: "undef",
          endLine: 1,
          endColumn: 6
        },
        {
          ruleId: "semi",
          severity: 2,
          message: "Missing semicolon.",
          line: 1,
          column: 9,
          nodeType: "ExpressionStatement",
          fix: {
            range: [8, 8],
            text: ";"
          }
        }
      ],
      errorCount: 2,
      warningCount: 0,
      fixableErrorCount: 1,
      fixableWarningCount: 0,
      source: "alerz(0)\n"
    }
  ];
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState();

  const fileList = data => {
    return parsedErrorData.map((val, key) => (
      <li
        key={key}
        onClick={() => {
          updateResult(val);
        }}
      >
        {val.filePath.split("/").pop()}
      </li>
    ));
  };

  const updateResult = result => {
    setResult(result);
  };

  useEffect(() => {
    if (!files.length) {
      setFiles(parsedErrorData);
    }
  });

  return (
    <Container>
      <Row>
        <Col lg={3}>
          <Row>
            <Col lg={12}>{fileList()}</Col>
          </Row>
        </Col>
        <Col lg={9}>{0}</Col>
      </Row>
    </Container>
  );
}

export default Results;
