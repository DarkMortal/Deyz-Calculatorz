import { Navbar } from './components/Navbar'
import FORM from './components/Container';
import Havel from './components/Havel';
import Field from './components/Fields';
import Maths from './components/Maths';
import MathOBJ from './matrix.mjs';
import FilledFields from './components/FilledField';
import { About } from './components/About'
import { useState } from 'react';

function App() {

  const running = "Calculating...", sorry_message = "Sorry, couldn't calculate results :(";

  //TODO: Declare and initialise the useStates
  const [dimensionManager, dimensionChanger] = useState({ row: 0, column: 0 });
  const [isContainerShow, setContainer] = useState(false);
  const [dimensionManager2, dimensionChanger2] = useState({ row: 0, column: 0 });
  const [isContainerShow2, setContainer2] = useState(false);
  const [isFilledMatrix, changeFilled] = useState("None");
  const [btntxt, SetBtn] = useState("Set Matrix");
  const [answer, ChangeAnswer] = useState("");
  const [which_calculator, ChangeCalc] = useState("Havel Hakimi Theorem");
  const [decimals, ChangeDecimals] = useState(2);
  const [mathMode, changeMode] = useState(false);
  const [tempMatrix, changeTempMatrix] = useState(null);
  const [nonMathModeText, Change_nonMathModeText] = useState("");
  const [pow, powChanger] = useState(1);
  const [data, SetData] = useState(
    [
      {
        Text: "Enter the Size of the Matrix:",
        Num: 10, selectedIndex: 0, isDisabled: false
      },
      {
        Text: "Trailing Decimals:",
        Num: 10, selectedIndex: 0, isDisabled: false
      }
    ]
  );

  const headingStyle = {
    "color": "white",
    "margin": "auto",
    "textAlign": "center",
    "fontSize": "xx-large",
    "marginTop": "20px"
  };
  const style2 = { color: "white", textAlign: "center" };


  //TODO: To asynchronously calculate the Answer
  async function asynchronousWrapper(f, x) { return await f(x); }
  async function asynchronousWrapper2(f, x, y) { return await f(x, y); }
  async function asynchronousWrapper3(f, x, y, z) { return await f(x, y, z); }

  function DET() {
    try {
      var isComplex = (typeof (tempMatrix[0][0]) === "number") ? (false) : (true);
      changeMode(false); Change_nonMathModeText(running);
      asynchronousWrapper2(MathOBJ.Determinant, tempMatrix, isComplex)
        .then(res => {
          var ans = (isComplex) ? (res.toSTR(decimals)) : (res.toFixed(decimals).toString());
          ChangeAnswer("$$\\color{white}{det" + ParseMatrix1(tempMatrix, isComplex) + "=" + ans + "}$$");
          changeMode(true); changeTempMatrix(null);
        })
        .catch(err => {
          console.log(err);
          changeMode(false);
          Change_nonMathModeText(sorry_message);
        });
    } catch (e) {
      console.log(e);
      changeMode(false);
      Change_nonMathModeText(sorry_message);
    }
  }

  function ADJ() {
    try {
      var isComplex = (typeof (tempMatrix[0][0]) === "number") ? (false) : (true);
      changeMode(false); Change_nonMathModeText(running);
      asynchronousWrapper2(MathOBJ.Adjoint, tempMatrix, isComplex)
        .then(res => {
          ChangeAnswer("$$\\color{white}{adj" + ParseMatrix1(tempMatrix, isComplex) + "=" + ParseMatrix2(res, isComplex) + "}$$");
          changeMode(true); changeTempMatrix(res);
        })
        .catch(err => {
          console.log(err);
          changeMode(false);
          Change_nonMathModeText(sorry_message);
        });
    } catch (e) {
      console.log(e);
      changeMode(false);
      Change_nonMathModeText(sorry_message);
    }
  }

  function INV() {
    try {
      var isComplex = (typeof (tempMatrix[0][0]) === "number") ? (false) : (true);
      changeMode(false); Change_nonMathModeText(running);
      asynchronousWrapper2(MathOBJ.Inverse, tempMatrix, isComplex)
        .then(res => {
          ChangeAnswer("$$\\color{white}{" + ParseMatrix1(tempMatrix, isComplex) + "^{-1}=" + ParseMatrix2(res, isComplex) + "}$$");
          changeMode(true); changeTempMatrix(res);
        })
        .catch(err => {
          console.log(err);
          changeMode(false);
          if (err === "Inverse not Possible") { Change_nonMathModeText("Inverse not possible since determinant is 0"); changeTempMatrix(null); }
          else Change_nonMathModeText(sorry_message);
        });
    } catch (e) {
      console.log(e);
      changeMode(false);
      Change_nonMathModeText(sorry_message);
    }
  }

  function PowCalc() {
    try {
      var isComplex = (typeof (tempMatrix[0][0]) === "number") ? (false) : (true);
      changeMode(false); Change_nonMathModeText(running);
      asynchronousWrapper3(MathOBJ.Power, tempMatrix, pow, isComplex)
        .then(res => {
          ChangeAnswer("$$\\color{white}{" + ParseMatrix1(tempMatrix, isComplex) + "^{" + pow.toString() + "}=" + ParseMatrix2(res, isComplex) + "}$$");
          changeMode(true); changeTempMatrix(res);
        })
        .catch(err => {
          console.log(err);
          changeMode(false);
          Change_nonMathModeText(sorry_message);
        });
    } catch (e) {
      console.log(e);
      changeMode(false);
      Change_nonMathModeText(sorry_message);
    }
  }

  function TRANS() {
    try {
      var isComplex = (typeof (tempMatrix[0][0]) === "number") ? (false) : (true);
      changeMode(false); Change_nonMathModeText(running);
      asynchronousWrapper(MathOBJ.Transpose, tempMatrix)
        .then(res => {
          ChangeAnswer("$$\\color{white}{" + ParseMatrix1(tempMatrix, isComplex) + "^T=" + ParseMatrix2(res, isComplex) + "}$$");
          changeMode(true); changeTempMatrix(res);
        })
        .catch(err => {
          console.log(err);
          changeMode(false);
          Change_nonMathModeText(sorry_message);
        });
    } catch (e) {
      console.log(e);
      changeMode(false);
      Change_nonMathModeText(sorry_message);
    }
  }

  const Function_Arrays = {
    Determinant: function () {
      SetData([{ Text: "Enter the Size of the Matrix:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Trailing Decimals:", Num: 10, selectedIndex: decimals - 1, isDisabled: false }]);
      SetBtn("Set Matrix"); ChangeCalc("Matrix Determinant Calculator"); ChangeAnswer(""); Change_nonMathModeText(""); changeTempMatrix(null);
    },
    Adjoint: function () {
      SetData([{ Text: "Enter the Size of the Matrix:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Trailing Decimals:", Num: 10, selectedIndex: decimals - 1, isDisabled: false }]);
      SetBtn("Set Matrix"); ChangeCalc("Matrix Adjoint Calculator"); ChangeAnswer(""); Change_nonMathModeText(""); changeTempMatrix(null);
    },
    Inverse: function () {
      SetData([{ Text: "Enter the Size of the Matrix:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Trailing Decimals:", Num: 10, selectedIndex: decimals - 1, isDisabled: false }]);
      SetBtn("Set Matrix"); ChangeCalc("Matrix Inverse Calculator"); ChangeAnswer(""); Change_nonMathModeText(""); changeTempMatrix(null);
    },
    Multiplication: function () {
      SetData([{ Text: "Enter number of Rows of First Matrix:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Enter number of Columns of First Matrix:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Enter number of Columns of Second Matrix:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Trailing Decimals:", Num: 10, selectedIndex: decimals - 1, isDisabled: false }]);
      SetBtn("Set Matrices"); ChangeCalc("Matrix Multiplication"); ChangeAnswer(""); Change_nonMathModeText(""); changeTempMatrix(null);
    },
    Transpose: function () {
      SetData([{ Text: "Enter number of Rows of the Matrix:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Enter number of Columns of the Matrix:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Trailing Decimals:", Num: 10, selectedIndex: decimals - 1, isDisabled: false }]);
      SetBtn("Set Matrix"); ChangeCalc("Matrix Transpose"); ChangeAnswer(""); Change_nonMathModeText(""); changeTempMatrix(null);
    },
    Power: function () {
      SetData([{ Text: "Enter the Size of the Matrix:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Enter Power:", Num: 20, selectedIndex: pow - 1, isDisabled: false }, { Text: "Trailing Decimals:", Num: 10, selectedIndex: decimals - 1, isDisabled: false }]);
      SetBtn("Set Matrix"); ChangeCalc("Matrix Power Calculator"); ChangeAnswer(""); Change_nonMathModeText(""); changeTempMatrix(null);
    },
    Addition: function () {
      SetData([{ Text: "Enter number of Rows of the Matrices:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Enter number of Columns of the Matrices:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Trailing Decimals:", Num: 10, selectedIndex: decimals - 1, isDisabled: false }]);
      SetBtn("Set Matrices"); ChangeCalc("Matrix Addition"); ChangeAnswer(""); Change_nonMathModeText(""); changeTempMatrix(null);
    },
    Subtraction: function () {
      SetData([{ Text: "Enter number of Rows of the Matrices:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Enter number of Columns of the Matrices:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Trailing Decimals:", Num: 10, selectedIndex: decimals - 1, isDisabled: false }]);
      SetBtn("Set Matrices"); ChangeCalc("Matrix Subtraction"); ChangeAnswer(""); Change_nonMathModeText(""); changeTempMatrix(null);
    },
    HavelHakimi: function () {
      ChangeCalc("Havel Hakimi Theorem"); ChangeAnswer(""); Change_nonMathModeText(""); changeTempMatrix(null);
    },
    InverseM: function () {
      SetData([{ Text: "Enter number of variables:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Trailing Decimals:", Num: 10, selectedIndex: decimals - 1, isDisabled: false }]);
      SetBtn("Set Matrices"); ChangeCalc("Inverse Matrix Method"); ChangeAnswer(""); Change_nonMathModeText(""); changeTempMatrix(null);
    },
    About: function () { ChangeAnswer(""); Change_nonMathModeText(""); changeTempMatrix(null); ChangeCalc("About Myself"); }
  }

  const continueFunctions = {
    continuePower: function () {
      SetData([{ Text: "Enter Power:", Num: 20, selectedIndex: pow - 1, isDisabled: false }, { Text: "Trailing Decimals:", Num: 10, selectedIndex: decimals - 1, isDisabled: false }]);
      ChangeCalc("Continue Matrix Power"); SetBtn("Calculate");
    },
    multiplyLeft: function () {
      SetData([{ Text: "Enter Number of Rows of First Matrix:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Trailing Decimals:", Num: 10, selectedIndex: decimals - 1, isDisabled: false }]);
      ChangeCalc("Continue Matrix Multiplication from Left"); SetBtn("Set Matrix");
    },
    multiplyRight: function () {
      SetData([{ Text: "Enter Number of Columns of Second Matrix:", Num: 10, selectedIndex: 0, isDisabled: false }, { Text: "Trailing Decimals:", Num: 10, selectedIndex: decimals - 1, isDisabled: false }]);
      ChangeCalc("Continue Matrix Multiplication from Right"); SetBtn("Set Matrix");
    },
    contADD: function () {
      SetData([{ Text: "Trailing Decimals:", Num: 10, selectedIndex: decimals - 1, isDisabled: false }]); ChangeCalc("Continue Matrix Addition"); SetBtn("Set Matrix");
    },
    subtractLeft: function () {
      SetData([{ Text: "Trailing Decimals:", Num: 10, selectedIndex: decimals - 1, isDisabled: false }]); ChangeCalc("Continue Matrix Subtraction from Left"); SetBtn("Set Matrix");
    },
    subtractRight: function () {
      SetData([{ Text: "Trailing Decimals:", Num: 10, selectedIndex: decimals - 1, isDisabled: false }]); ChangeCalc("Continue Matrix Subtraction from Right"); SetBtn("Set Matrix");
    }
  }

  const POW = continueFunctions.continuePower;
  const MULTR = continueFunctions.multiplyRight;
  const MULTL = continueFunctions.multiplyLeft;
  const ADD = continueFunctions.contADD;
  const SUBL = continueFunctions.subtractLeft;
  const SUBR = continueFunctions.subtractRight;

  function GetCalculator() {
    if (which_calculator === "Havel Hakimi Theorem") return <Havel></Havel>;
    else if (which_calculator.includes("Matrix")) return (
      <FORM
        data={data}
        btntxt={btntxt}
        btnFunc={PowCalc}
        btnFunction={function (r, c) { dimensionChanger({ row: r, column: c }); setContainer(true); }}
        btnFunction2={function (r, c) { dimensionChanger2({ row: r, column: c }); setContainer2(true); }}
        whichCalc={which_calculator}
        contMulLeft={continueFunctions.multiplyLeft}
        contMulRight={continueFunctions.multiplyRight}
        btnFunction3={(n) => {
          dimensionChanger({ row: n, column: tempMatrix.length });
          dimensionChanger2({ row: tempMatrix.length, column: tempMatrix[0].length });
          changeFilled("Right");
        }}
        btnFunction4={(n) => {
          dimensionChanger({ row: tempMatrix.length, column: tempMatrix[0].length });
          dimensionChanger2({ row: tempMatrix[0].length, column: n });
          changeFilled("Left");
        }}
        Addition={() => {
          dimensionChanger({ row: tempMatrix.length, column: tempMatrix[0].length });
          dimensionChanger2({ row: tempMatrix.length, column: tempMatrix[0].length });
          changeFilled("Left");
        }}
        SubL={() => {
          dimensionChanger({ row: tempMatrix.length, column: tempMatrix[0].length });
          dimensionChanger2({ row: tempMatrix.length, column: tempMatrix[0].length });
          changeFilled("Left");
        }}
        SubR={() => {
          dimensionChanger({ row: tempMatrix.length, column: tempMatrix[0].length });
          dimensionChanger2({ row: tempMatrix.length, column: tempMatrix[0].length });
          changeFilled("Right");
        }}
        onClickHandler={(n) => { ChangeDecimals(n); }}
        onClickHandler2={(n) => { powChanger(n); }}>
      </FORM>
    )
    else if (which_calculator === "About Myself") return <About></About>
  }

  function Continue() {
    if (tempMatrix !== null && which_calculator.includes("Matrix")) {
      if (tempMatrix.length === tempMatrix[0].length) return (
        <>
          <div style={{ textAlign: "center" }}>
            <div className="btn-group">
              <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <b>Continue Calculation</b>
              </button>
              <ul className="dropdown-menu bg-dark">
                <li className="dropdown-item" style={style2} onClick={DET}><b>Determinant</b></li>
                <li className="dropdown-item" style={style2} onClick={ADJ}><b>Adjoint</b></li>
                <li className="dropdown-item" style={style2} onClick={INV}><b>Inverse</b></li>
                <li className="dropdown-item" style={style2} onClick={POW}><b>Power</b></li>
                <li className="dropdown-item" style={style2} onClick={TRANS}><b>Transpose</b></li>
                <li className="dropdown-item" style={style2} onClick={ADD}><b>Addition</b></li>
                <li className="dropdown-item" style={style2} onClick={SUBL}><b>Subtract from Left</b></li>
                <li className="dropdown-item" style={style2} onClick={SUBR}><b>Subtract from Right</b></li>
                <li className="dropdown-item" style={style2} onClick={MULTL}><b>Multiply from Left</b></li>
                <li className="dropdown-item" style={style2} onClick={MULTR}><b>Multiply from Right</b></li>
              </ul></div></div>
        </>
      )
      else return (
        <>
          <div style={{ textAlign: "center" }}>
            <div className="btn-group">
              <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <b>Continue Calculation</b>
              </button>
              <ul className="dropdown-menu bg-dark">
                <li className="dropdown-item" style={style2} onClick={TRANS}><b>Transpose</b></li>
                <li className="dropdown-item" style={style2} onClick={ADD}><b>Addition</b></li>
                <li className="dropdown-item" style={style2} onClick={SUBL}><b>Subtract from Left</b></li>
                <li className="dropdown-item" style={style2} onClick={SUBR}><b>Subtract from Right</b></li>
                <li className="dropdown-item" style={style2} onClick={MULTR}><b>Multiply from Right</b></li>
                <li className="dropdown-item" style={style2} onClick={MULTL}><b>Multiply from Left</b></li>
              </ul></div></div>
        </>
      )
    }
  }

  function GetMath() {
    if (which_calculator.includes("Matrix")) return <Maths equation={answer} isMathMode={mathMode} noMath={nonMathModeText}></Maths>
  }

  function ParseMatrix1(x, isComplex) {
    var str = `\\begin{pmatrix}`;
    for (var i = 0; i < x.length; i++) {
      for (var j = 0; j < x[i].length; j++) {
        str += (isComplex) ? (x[i][j].toSTR(decimals)) : (x[i][j].toFixed(decimals).toString());
        if (j !== x[i].length - 1) str += " & ";
      } str += " \\\\ ";
    } return str + "\\end{pmatrix}";
  }

  function ParseMatrix2(x, isComplex) {
    var str = `\\begin{bmatrix}`;
    for (var i = 0; i < x.length; i++) {
      for (var j = 0; j < x[i].length; j++) {
        str += (isComplex) ? (x[i][j].toSTR(decimals)) : (x[i][j].toFixed(decimals).toString());
        if (j !== x[i].length - 1) str += " & ";
      } str += " \\\\ ";
    } return str + "\\end{bmatrix}";
  }

  function GetMatrixField() {
    if (isContainerShow) return <Field
      rows={dimensionManager.row}
      columns={dimensionManager.column}
      closeFunction={() => { setContainer(false); }}
      isSecondNeeded={isContainerShow2}
      secondRows={dimensionManager2.row}
      secondColumns={dimensionManager2.column}
      setAnswer={(str) => { ChangeAnswer(str); }}
      calculator={which_calculator}
      mathEnabler={() => { changeMode(true); }}
      mathDisabler={() => { changeMode(false); }}
      setText={(strx) => { Change_nonMathModeText(strx); }}
      matrixParser1={ParseMatrix1}
      matrixParser2={ParseMatrix2}
      closeFunction2={() => { setContainer2(false); }}
      Pow={pow} changeMatrix={(x) => { changeTempMatrix(x); }}
      trailingDecimals={decimals}>
    </Field>
  }

  function GetMatrixField2() {
    if (isFilledMatrix !== "None") return <FilledFields
      rows={dimensionManager.row}
      columns={dimensionManager.column}
      tobefilled={isFilledMatrix}
      matrix={tempMatrix}
      isComplexed={(typeof (tempMatrix[0][0]) === "object")}
      closeFunction={() => { changeFilled("None"); }}
      secondRows={dimensionManager2.row}
      secondColumns={dimensionManager2.column}
      setAnswer={(str) => { ChangeAnswer(str); }}
      calculator={which_calculator}
      mathEnabler={() => { changeMode(true); }}
      mathDisabler={() => { changeMode(false); }}
      setText={(strx) => { Change_nonMathModeText(strx); }}
      matrixParser1={ParseMatrix1}
      matrixParser2={ParseMatrix2}
      changeMatrix={(x) => { changeTempMatrix(x); }}
      trailingDecimals={decimals}>
    </FilledFields>
  }

  return (
    <>
      <Navbar Functions={Function_Arrays}></Navbar>
      <div style={headingStyle}><b>{which_calculator}</b></div>
      {
        GetCalculator()
      }
      {
        GetMath()
      }
      {
        GetMatrixField()
      }
      {
        GetMatrixField2()
      }
      {
        Continue()
      }
    </>
  );
}

export default App;
