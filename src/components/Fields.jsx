import React from "react";
import MathOBJ from "../matrix.mjs";

const pi = Math.PI;
function log(x) { return Math.log10(x); }
function ln(x) { return Math.log(x); }
function sin(x) { return Math.sin(x); }
function cos(x) { return Math.cos(x); }
function tan(x) { return Math.tan(x); }
function sinh(x) { return Math.sinh(x); }
function cosh(x) { return Math.cosh(x); }
function tanh(x) { return Math.tanh(x); }

export default function Fields(props) {
    React.useEffect(function () {
        var isComplex = (props.isRight || props.isLeft) ? ((typeof (props.matrix[0][0]) === "number") ? (false) : (true)) : (false);
        const running = "Calculating...", sorry_message = "Sorry, couldn't calculate results :(";
        function AddListeners() {
            var input_elements = document.querySelectorAll("input.real");
            var input_elements2 = document.querySelectorAll("input.imaginary");
            input_elements.forEach(e => {
                e.addEventListener("change", () => {
                    e.setAttribute("value", e.value);
                });
            });
            input_elements2.forEach(e => {
                e.addEventListener("change", () => {
                    e.setAttribute("value", e.value);
                });
            });
        }

        function complexDisplayer() {
            if (isComplex) {
                var txt = document.getElementsByClassName("img_text");
                var img = document.getElementsByClassName("imaginary");
                var imgplc = document.getElementsByClassName("plc");
                for (var i = 0; i < img.length; i++) img[i].style.display = "block";
                for (var j = 0; j < txt.length; j++) txt[j].style.display = "block";
                for (var k = 0; k < imgplc.length; k++) imgplc[k].style.display = "block";
            } else {
                txt = document.getElementsByClassName("img_text");
                img = document.getElementsByClassName("imaginary");
                imgplc = document.getElementsByClassName("plc");
                for (i = 0; i < img.length; i++) img[i].style.display = "none";
                for (j = 0; j < txt.length; j++) txt[j].style.display = "none";
                for (k = 0; k < imgplc.length; k++) imgplc[k].style.display = "none";
            }
        }


        function CheckAll() {
            var input_elements = document.querySelectorAll("input.real");
            var isValidAll = true;
            input_elements.forEach(e => {
                try {
                    if (e.value === "") throw "Empty";
                    else eval(e.value);
                } catch {
                    isValidAll = false;
                    e.style.background = "red";
                    e.style.color = "white";
                }
            });
            if (isComplex) {
                var input_elements2 = document.querySelectorAll("input.imaginary");
                input_elements2.forEach(e => {
                    try {
                        if (e.value === "") throw "Empty";
                        else eval(e.value);
                    } catch {
                        isValidAll = false;
                        e.style.background = "red";
                        e.style.color = "white";
                    }
                });
            }
            return isValidAll;
        }

        function resetStates() {
            var input_elements = document.querySelectorAll("input.real");
            var input_elements2 = document.querySelectorAll("input.imaginary");
            input_elements.forEach(e => { e.style.background = "white"; e.style.color = "black"; });
            input_elements2.forEach(e => { e.style.background = "rgb(165, 207, 152)"; e.style.color = "black"; });
        }

        function AllZero() {
            var input_elements = document.querySelectorAll("input.real");
            input_elements.forEach(e => {
                if (e.value === "") {
                    e.setAttribute("value", "0");
                    e.value = "0";
                }
            });
            var input_elements2 = document.querySelectorAll("input.imaginary");
            input_elements2.forEach(e => {
                if (e.value === "") {
                    e.setAttribute("value", "0");
                    e.value = "0";
                }
            });
        }
        function ClearAll() {
            var input_elements = document.querySelectorAll("input.real");
            input_elements.forEach(e => { if (!e.classList.contains("immutable")) { e.setAttribute("value", ""); e.value = ""; } });
            var input_elements2 = document.querySelectorAll("input.imaginary");
            input_elements2.forEach(e => { if (!e.classList.contains("immutable")) { e.setAttribute("value", ""); e.value = ""; } });
            resetStates();
        }

        //TODO: To asynchronously calculate the Answer
        async function asynchronousWrapper(f, x) { return await f(x); }
        async function asynchronousWrapper2(f, x, y) { return await f(x, y); }
        async function asynchronousWrapper3(f, x, y, z) { return await f(x, y, z); }

        document.getElementById("complex").addEventListener("click", function () {
            isComplex = !isComplex;
            complexDisplayer();
        });

        function GetMatrices1() {
            var elms = document.getElementsByClassName("matrix_input");
            var inp = elms[0].childNodes;
            var arr_here = [], temp = [];
            for (var i = 0; i < ((props.columns + 1) * props.rows); i += (props.columns + 1)) {
                if (isComplex) for (var j = 0; j < props.columns; j++)
                    temp.push(new MathOBJ.complex(parseFloat(eval(inp[i + j].childNodes[0].childNodes[0].value)), parseFloat(eval(inp[i + j].childNodes[2].childNodes[0].value))));
                else for (j = 0; j < props.columns; j++) temp.push(parseFloat(eval(inp[i + j].childNodes[0].childNodes[0].value)));
                arr_here.push(temp); temp = [];
            }
            return arr_here;
        }

        function GetMatrices2() {
            var elms = document.getElementsByClassName("matrix_input");
            var inp = elms[1].childNodes;
            var arr_here = [], temp = [];
            for (var i = 0; i < ((props.secondColumns + 1) * props.secondRows); i += (props.secondColumns + 1)) {
                if (isComplex) for (var j = 0; j < props.secondColumns; j++) temp.push(new MathOBJ.complex(parseFloat(eval(inp[i + j].childNodes[0].childNodes[0].value)), parseFloat(eval(inp[i + j].childNodes[2].childNodes[0].value))));
                else for (j = 0; j < props.secondColumns; j++) temp.push(parseFloat(eval(inp[i + j].childNodes[0].childNodes[0].value)));
                arr_here.push(temp); temp = [];
            }
            return arr_here;
        }

        function varGenerator(n) {
            var str = `\\begin{bmatrix}`;
            for (var i = 0; i < n; i++) str += String.fromCharCode(65 + i) + "  \\\\ ";
            return str + "\\end{bmatrix}";
        }

        document.getElementById("vegeta").style.marginLeft = (window.screen.width / 4).toString() + "px";
        document.getElementById("vegeta").style.marginTop = (window.screen.height / 4).toString() + "px";
        document.getElementById("complex").checked = (props.isRight || props.isLeft) ? ((typeof (props.matrix[0][0]) === "number") ? (false) : (true)) : (false);
        document.getElementById("zero").onclick = AllZero;
        document.getElementById("clear").onclick = ClearAll;
        document.getElementById("close_btn").onclick = props.closeFunction;
        document.getElementById("calc").onclick = () => {
            if (CheckAll()) {
                if (props.calculator === "Matrix Determinant Calculator") {
                    var a = GetMatrices1();
                    props.closeFunction(); props.mathDisabler(); props.setText(running);
                    asynchronousWrapper2(MathOBJ.Determinant, a, isComplex)
                        .then(res => {
                            var ans = (isComplex) ? (res.toSTR(props.trailingDecimals)) : (res.toFixed(props.trailingDecimals).toString());
                            props.setAnswer("$$\\color{white}{det" + props.matrixParser1(a, isComplex) + "=" + ans + "}$$");
                            props.mathEnabler(); props.changeMatrix(null);
                        })
                        .catch(err => {
                            console.log(err);
                            props.mathDisabler();
                            props.setText(sorry_message);
                        });
                }
                else if (props.calculator === "Matrix Adjoint Calculator") {
                    a = GetMatrices1(); var b = a;
                    props.closeFunction(); props.mathDisabler(); props.setText(running);
                    asynchronousWrapper2(MathOBJ.Adjoint, b, isComplex)
                        .then(res => {
                            props.setAnswer("$$\\color{white}{adj" + props.matrixParser1(a, isComplex) + "=" + props.matrixParser2(res, isComplex) + "}$$");
                            props.mathEnabler(); props.changeMatrix(res);
                        })
                        .catch(err => {
                            console.log(err);
                            props.mathDisabler();
                            props.setText(sorry_message);
                        });
                }
                else if (props.calculator === "Matrix Inverse Calculator") {
                    a = GetMatrices1(); b = a;
                    props.closeFunction(); props.mathDisabler(); props.setText(running);
                    asynchronousWrapper2(MathOBJ.Inverse, b, isComplex)
                        .then(res => {
                            props.setAnswer("$$\\color{white}{" + props.matrixParser1(a, isComplex) + "^{-1}=" + props.matrixParser2(res, isComplex) + "}$$");
                            props.mathEnabler(); props.changeMatrix(res);
                        })
                        .catch(err => {
                            console.log(err);
                            props.mathDisabler();
                            if (err === "Inverse not Possible") { props.setText("Inverse not possible since determinant is 0"); props.changeMatrix(null); }
                            else props.setText(sorry_message);
                        });
                }
                else if (props.calculator === "Matrix Power Calculator") {
                    a = GetMatrices1();
                    props.closeFunction(); props.mathDisabler(); props.setText(running);
                    asynchronousWrapper3(MathOBJ.Power, a, props.Pow, isComplex)
                        .then(res => {
                            props.setAnswer("$$\\color{white}{" + props.matrixParser1(a, isComplex) + "^{" + props.Pow.toString() + "}=" + props.matrixParser2(res, isComplex) + "}$$");
                            props.mathEnabler(); props.changeMatrix(res);
                        })
                        .catch(err => {
                            console.log(err);
                            props.mathDisabler();
                            props.setText(sorry_message);
                        });
                }
                else if (props.calculator === "Matrix Transpose") {
                    a = GetMatrices1();
                    props.closeFunction(); props.mathDisabler(); props.setText(running);
                    asynchronousWrapper(MathOBJ.Transpose, a)
                        .then(res => {
                            props.setAnswer("$$\\color{white}{" + props.matrixParser1(a, isComplex) + "^T=" + props.matrixParser2(res, isComplex) + "}$$");
                            props.mathEnabler(); props.changeMatrix(res);
                        })
                        .catch(err => {
                            console.log(err);
                            props.mathDisabler();
                            props.setText(sorry_message);
                        });
                }
                else if (props.calculator === "Matrix Multiplication") {
                    a = GetMatrices1(); b = GetMatrices2();
                    props.closeFunction(); props.mathDisabler(); props.setText(running);
                    asynchronousWrapper3(MathOBJ.Matrix_Multiplication, a, b, isComplex)
                        .then(res => {
                            props.setAnswer("$$\\color{white}{" + props.matrixParser1(a, isComplex) + "." + props.matrixParser1(b, isComplex) + "=" + props.matrixParser2(res, isComplex) + "}$$");
                            props.mathEnabler(); props.changeMatrix(res); props.closeFunction2();
                        })
                        .catch(err => {
                            console.log(err);
                            props.mathDisabler();
                            props.setText(sorry_message);
                        });
                }
                else if (props.calculator === "Matrix Addition") {
                    a = GetMatrices1(); b = GetMatrices2();
                    props.closeFunction(); props.mathDisabler(); props.setText(running);
                    asynchronousWrapper3(MathOBJ.ADD, a, b, isComplex)
                        .then(res => {
                            props.setAnswer("$$\\color{white}{" + props.matrixParser1(a, isComplex) + "+" + props.matrixParser1(b, isComplex) + "=" + props.matrixParser2(res, isComplex) + "}$$");
                            props.mathEnabler(); props.changeMatrix(res); props.closeFunction2();
                        })
                        .catch(err => {
                            console.log(err);
                            props.mathDisabler();
                            props.setText(sorry_message);
                        });
                }
                else if (props.calculator === "Matrix Subtraction") {
                    a = GetMatrices1(); b = GetMatrices2();
                    props.closeFunction(); props.mathDisabler(); props.setText(running);
                    asynchronousWrapper3(MathOBJ.MINUS, a, b, isComplex)
                        .then(res => {
                            props.setAnswer("$$\\color{white}{" + props.matrixParser1(a, isComplex) + "-" + props.matrixParser1(b, isComplex) + "=" + props.matrixParser2(res, isComplex) + "}$$");
                            props.mathEnabler(); props.changeMatrix(res); props.closeFunction2();
                        })
                        .catch(err => {
                            console.log(err);
                            props.mathDisabler();
                            props.setText(sorry_message);
                        });
                }
                else if (props.calculator === "Inverse Matrix Method") {
                    a = GetMatrices1(); b = GetMatrices2();
                    props.closeFunction(); props.mathDisabler(); props.setText(running);
                    asynchronousWrapper2(MathOBJ.Inverse, a, isComplex)
                        .then(res => {
                            asynchronousWrapper3(MathOBJ.Matrix_Multiplication, res, b, isComplex)
                                .then(result => {
                                    props.setAnswer("$$\\color{white}{" + varGenerator(result.length) + "=" + props.matrixParser2(result, isComplex) + "}$$");
                                    props.mathEnabler(); props.closeFunction2();
                                })
                                .catch(err => {
                                    console.log(err);
                                    props.mathDisabler();
                                    props.setText(sorry_message);
                                });
                        })
                        .catch(err => {
                            console.log(err);
                            props.mathDisabler();
                            if (err === "Inverse not Possible") { props.setText("The given system of equations are Linealy Dependent"); props.changeMatrix(null); }
                            else props.setText(sorry_message);
                        });
                }
            } else alert("Please Enter some valid Values");
        }
        AddListeners();
    });


    const stl = {
        "margin": "auto",
        "width": "fit-content",
        "height": "fit-content"
    }

    function SecondMatrix() {
        if (props.isSecondNeeded) {
            return (
                <div className="matrix_input" style={{ marginLeft: "15px" }}>
                    {
                        Array.from(Array(props.secondRows), (e, i) => {
                            if (e) console.log(e);
                            else {
                                return (
                                    Array.from(Array(props.secondColumns), (err, j) => {
                                        if (err) console.log(err);
                                        else {
                                            if (j === props.secondColumns - 1) {
                                                return (
                                                    <>
                                                        <div style={{ display: "inline-flex" }}>
                                                            <div className="input-contain">
                                                                <input className="real" type="text" autoComplete="off" defaultValue="" />
                                                                <label className="placeholder-text">
                                                                    <div className="text"><b>[{i + 1},{j + 1}]</b></div>
                                                                </label>
                                                            </div>
                                                            <div className="img_text none"><br /><b>+</b></div>
                                                            <div className="input-contain">
                                                                <input className="imaginary none" type="text" autoComplete="off" defaultValue="" />
                                                                <label className="placeholder-text">
                                                                    <div className="text none plc"><b>[{i + 1},{j + 1}]</b></div>
                                                                </label>
                                                            </div><div className="img_text none"><br /><b>i</b></div>
                                                        </div>
                                                        <br />
                                                    </>
                                                )
                                            }
                                            else {
                                                return (
                                                    <div style={{ display: "inline-flex" }}>
                                                        <div className="input-contain">
                                                            <input className="real" type="text" autoComplete="off" defaultValue="" />
                                                            <label className="placeholder-text">
                                                                <div className="text"><b>[{i + 1},{j + 1}]</b></div>
                                                            </label>
                                                        </div>
                                                        <div className="img_text none"><br /><b>+</b></div>
                                                        <div className="input-contain">
                                                            <input className="imaginary none" type="text" autoComplete="off" defaultValue="" />
                                                            <label className="placeholder-text">
                                                                <div className="text none plc"><b>[{i + 1},{j + 1}]</b></div>
                                                            </label>
                                                        </div><div className="img_text none"><br /><b>i</b></div>
                                                    </div>
                                                )
                                            }
                                        }
                                    })
                                )
                            }
                        })
                    }
                </div>
            )
        }
    }

    return (
        <div id="abs_back">
            <div id="sec_back">
                <div className="containerM" id="vegeta">
                    <div style={{ "width": "100%", "height": "fit-content" }}>
                        <input id="complex" type="checkbox" style={{ "width": "fit-content" }} />
                        <label htmlFor="complex" style={{ "color": "white" }}><b>Complex Numbers</b></label>
                        <button id="close_btn"><b>&times;</b></button>
                    </div>
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <div style={{ display: "inline-flex", width: "fit-content", height: "fit-content" }}>
                            <div className="matrix_input">
                                {
                                    Array.from(Array(props.rows), (err, i) => {
                                        if (err) console.error("Error : ", err);
                                        else {
                                            return (
                                                Array.from(Array(props.columns), (err2, j) => {
                                                    if (err2) console.log(err2);
                                                    else {
                                                        if (j === props.columns - 1) {
                                                            return (
                                                                <>
                                                                    <div style={{ display: "inline-flex" }}>
                                                                        <div className="input-contain">
                                                                            <input className="real" type="text" autoComplete="off" defaultValue="" />
                                                                            <label className="placeholder-text">
                                                                                <div className="text"><b>[{i + 1},{j + 1}]</b></div>
                                                                            </label>
                                                                        </div>
                                                                        <div className="img_text none"><br /><b>+</b></div>
                                                                        <div className="input-contain">
                                                                            <input className="imaginary none" type="text" autoComplete="off" defaultValue="" />
                                                                            <label className="placeholder-text">
                                                                                <div className="text none plc"><b>[{i + 1},{j + 1}]</b></div>
                                                                            </label>
                                                                        </div><div className="img_text none"><br /><b>i</b></div>
                                                                    </div>
                                                                    <br />
                                                                </>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <div style={{ display: "inline-flex" }}>
                                                                    <div className="input-contain">
                                                                        <input className="real" type="text" autoComplete="off" defaultValue="" />
                                                                        <label className="placeholder-text">
                                                                            <div className="text"><b>[{i + 1},{j + 1}]</b></div>
                                                                        </label>
                                                                    </div>
                                                                    <div className="img_text none"><br /><b>+</b></div>
                                                                    <div className="input-contain">
                                                                        <input className="imaginary none" type="text" autoComplete="off" defaultValue="" />
                                                                        <label className="placeholder-text">
                                                                            <div className="text none plc"><b>[{i + 1},{j + 1}]</b></div>
                                                                        </label>
                                                                    </div><div className="img_text none"><br /><b>i</b></div>
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                })
                                            );
                                        }
                                    })
                                }
                            </div>
                            {
                                SecondMatrix()
                            }</div></div>
                    <div style={stl}>
                        <button type="button" className="btn btn-success" id="calc">Calculate</button>
                        <button type="button" className="btn btn-danger" id="zero" style={{ marginLeft: "10px", marginRight: "10px" }}>Fill Empty Cells with 0</button>
                        <button type="button" className="btn btn-danger" id="clear">Clear all Cells</button></div>
                </div>
            </div></div>
    );
}