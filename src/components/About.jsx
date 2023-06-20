import React from "react";
import { Component } from "react";
import face from "./Face.jpeg"

export class About extends Component {
    render() {
        const style1 = { display: "block", margin: "auto", height: "200px", width: "200px", borderRadius: "100px", marginTop: "25px" };
        const style2 = { color: "white", fontSize: "1.5em", textAlign: "justify", width: "fit-content", margin: "auto", paddingLeft: "20px", paddingRight: "20px" };
        return (
            <React.Fragment>
                <img src={face} style={style1} alt="face"/><br/>
                <div style={style2}><b>Saptarshi Dey</b></div><br/><br/>
                <div style={style2}>
                    I am Saptarshi Dey, currently pursuing B.Tech in Computer Science and Engineering (CSE). Checkout my <a href='https://solo.to/darkmortal' rel="noreferrer" target='_blank'>Link in Bio</a>
                </div>
            </React.Fragment>
        )
    }
}