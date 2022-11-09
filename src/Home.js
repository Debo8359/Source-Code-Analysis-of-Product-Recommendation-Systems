import React, { useState } from "react";
export const Home = () => {
  const [flag, setFlag] = useState(false);
  const [code, setCode] = useState("");
  const [loc, setLoc] = useState("");
  const [ccp, setCcp] = useState("");
  const [ai, setAi] = useState("");
  const [cp, setCp] = useState("");
  const [cd, setCd] = useState("");
  const [fo, setFo] = useState("");

  const evaluate = () => {
    //LOC
    var l = 1;
    for (let i = 0; i < code.length; i++) {
      if (code.charCodeAt(i) === 10) {
        l += 1;
      }
    }
    setLoc(l);
    var loc1 = l;
    //Cyclomatic Complexity
    l = 1;
    for (let i = 0; i < code.length - 1; i++) {
      let val = code.charAt(i) + code.charAt(i + 1);
      if (val === "if" || val === "for" || val === "while" || val === "case") {
        l += 1;
      }
    }
    setCcp(l);
    var ccp1 = l;
    //Comment Percentage
    l = 0;
    for (let i = 0; i < code.length - 1; i++) {
      let val = code.charAt(i) + code.charAt(i + 1);
      console.log(val);
      if (val === "//" || code.charAt(i) === "#") {
        for (; i < code.length - 1 && code.charCodeAt(i) !== 10; i++) {
          l += 1;
        }
      }
      if (val === "/*") {
        for (; i < code.length - 1 || val === "*/"; i++) {
          val = code.charAt(i) + code.charAt(i + 1);
          l += 1;
        }
      }
    }
    setCp((l * 100.0) / code.length + "%");

    //Maintainability Index
    var cp1 = l / code.length;
    l =
      171 -
      5.2 -
      0.23 * parseFloat(ccp1) -
      16.2 * Math.log(parseFloat(loc1)) +
      50 * Math.sqrt(2.46 * cp1);
    setAi((l * 100) / 171.0 + "%");

    //Code Duplication
    l = 0;
    let k = 0;
    let b = [];
    for (let i = 0; i < code.length; i++) {
      if (
        code.charAt(i) === " " ||
        code.charAt(i) === ";" ||
        code.charAt(i) === "=" ||
        code.charAt(i) === "{" ||
        code.charAt(i) === "}"
      ) {
        let x = code.substring(k, i);
        if (x.length > 1) b.push(x);
        k = i + 1;
      }
      if (i + 1 === code.length) {
        let x = code.substring(k, i + 1);
        if (x.length > 1) b.push(x);
        k = i + 1;
      }
    }
    var f = [];
    var s = [];
    for (var i = 0; i < b.length; i++) {
      s.push(b[i]);
    }
    console.log("No of words: " + b.length);
    for (let i = 0; i < b.length; i++) {
      for (let j = 0; j < s.length; j++) {
        if (b[i] === s[j]) {
          s.splice(j, 1, "");
          l++;
        }
      }
      var bool = true;
      for (var j = 0; j < f.length; j++) {
        if (f[j] === b[i]) {
          bool = false;
          break;
        }
      }
      if (bool) f.push(b[i]);
    }
    console.log(b);
    console.log("Number of unique words: " + f.length);
    l = (l - f.length) / b.length;
    setCd(l * 100 + "%");

    //Fan Out
    l = 0;
    for (var i = 0; i < code.length; i++) {
      var j = 0;
      for (j = i + 1; j < code.length; j++) {
        if (code.charAt(j) !== " ") break;
      }
      if (code.charAt(i) === ")" && code.charAt(j) !== ":") {
        l++;
      }
    }
    setFo(l);
  };

  return (
    <>
      {!flag ? (
        <>
          <div className="container1">
            <form className="add-form">
              <div className="form-control">
                <h1 align="center">
                  Source Code Analyzer for Product Recommendation Systems
                </h1>
                <br></br>
                <br></br>
                <label>Enter your code here:</label>
                <textarea
                  cols={40}
                  rows={7}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                ></textarea>
                <button
                  className="btn btn-block"
                  onClick={() => {
                    evaluate();
                    setFlag(true);
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="container1">
            <form className="add-form">
              <div className="form-control">
                <h1 align="center">Analysis Results</h1>
                <br></br>
                <label>Lines of Code</label>
                <input
                  type="text"
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                  readOnly
                ></input>
                <label>Comment Percentage</label>
                <input
                  type="text"
                  value={cp}
                  onChange={(e) => setCp(e.target.value)}
                  readOnly
                ></input>
                <label>Cyclomatic Complexity</label>
                <input
                  type="text"
                  value={ccp}
                  onChange={(e) => setCcp(e.target.value)}
                  readOnly
                ></input>
                <label>Maintainability Index</label>
                <input
                  type="text"
                  value={ai}
                  onChange={(e) => setAi(e.target.value)}
                  readOnly
                ></input>
                <label>Code Duplication</label>
                <input
                  type="text"
                  value={cd}
                  onChange={(e) => setCd(e.target.value)}
                  readOnly
                ></input>
                <label>Fan Out</label>
                <input
                  type="text"
                  value={fo}
                  onChange={(e) => setFo(e.target.value)}
                  readOnly
                ></input>
                <br></br>
                <br></br>
                <br></br>
                <center>
                  <label>
                    <b>Optimal ranges for each metric</b>
                  </label>
                </center>
                <br></br>
                <table>
                  <th>
                    <center>Metric</center>
                  </th>
                  <th>
                    <center>Optimal Range</center>
                  </th>
                  <tr>
                    <td>Comment Percentage</td>{" "}
                    <td>
                      <center>33%</center>
                    </td>
                  </tr>
                  <tr>
                    <td>Cyclomatic Complexity</td>{" "}
                    <td>
                      <center>1-4</center>
                    </td>
                  </tr>
                  <tr>
                    <td>Code Duplication</td>{" "}
                    <td>
                      <center>{"<= 40%"}</center>
                    </td>
                  </tr>
                  <tr>
                    <td>Maintainability Index</td>{" "}
                    <td>
                      <center>{">= 25%"}</center>
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={3}>Fan Out</td>{" "}
                    <td rowSpan={3}>
                      <center>
                        {"For <= 10 LOC - <=7"}
                        <br></br>
                        {"For 10-20 LOC - <=15"}
                        <br></br>
                        {"and so on depending on LOC"}
                      </center>
                    </td>
                  </tr>
                </table>
                <br></br>
                <br></br>
                <br></br>
                <button
                  className="btn btn-block"
                  onClick={() => {
                    setCode("");
                    setFlag(false);
                  }}
                >
                  Back to Home Page
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};
