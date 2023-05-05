import React, { Component } from "react";
import brand from "./brand.png"

export class Navbar extends Component {
    render() {
        const headstyle = {
            "color": "white",
            "textAlign": "center"
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark boxshadow" /*style={{position: 'fixed', width: '100vw', zIndex: '100', top: '0px'}}*/>
                <a className="navbar-brand" style={{ display: "inline-flex" }}><img src={brand} style={{ height: "30px", width: "30px", marginRight: "5px" }} /> Deyz Calculatorz</a>
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarMenu">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" style={headstyle} onClick={this.props.Functions.ChangeOfBases}><b>Change of Bases</b></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" style={headstyle} onClick={this.props.Functions.HavelHakimi}><b>Havel Hakimi Theorem</b></a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" style={headstyle} id="matrix" role="button" data-bs-toggle="dropdown"><b>Matrix Calculator</b></a>
                            <div className="dropdown-menu bg-dark" aria-labelledby="matrix">
                                <a className="dropdown-item" style={headstyle} onClick={this.props.Functions.Determinant}><b>Determinant</b></a>
                                <a className="dropdown-item" style={headstyle} onClick={this.props.Functions.Adjoint}><b>Adjoint</b></a>
                                <a className="dropdown-item" style={headstyle} onClick={this.props.Functions.Inverse}><b>Inverse</b></a>
                                <a className="dropdown-item" style={headstyle} onClick={this.props.Functions.Power}><b>Power</b></a>
                                <a className="dropdown-item" style={headstyle} onClick={this.props.Functions.Transpose}><b>Transpose</b></a>
                                <a className="dropdown-item" style={headstyle} onClick={this.props.Functions.Multiplication}><b>Multiplication</b></a>
                                <a className="dropdown-item" style={headstyle} onClick={this.props.Functions.Addition}><b>Addition</b></a>
                                <a className="dropdown-item" style={headstyle} onClick={this.props.Functions.Subtraction}><b>Subtraction</b></a>
                                <a className="dropdown-item" style={headstyle} onClick={this.props.Functions.InverseM}><b>Inverse Matrix Method</b></a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" style={headstyle} onClick={this.props.Functions.About}><b>About Me</b></a>
                        </li></ul>
                </div>
            </nav>)
    }
}