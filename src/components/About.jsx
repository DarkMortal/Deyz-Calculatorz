import { Component } from "react";
import pain from "./samurai.jpg"

export class About extends Component {
    render() {
        const style1 = { display: "block", margin: "auto", height: "200px", width: "200px", borderRadius: "100px" };
        const style2 = { color: "white", fontSize: "1.5em", textAlign: "justify", width: "fit-content", margin: "auto", paddingLeft: "20px", paddingRight: "20px" };
        return (
            <>
                <img src={pain} style={style1}></img><br />
                <div style={style2}><b>Saptarshi Dey</b></div><br /><br />
                <div style={style2}>
                    I am Saptarshi Dey, currently pursuing B.Tech in Computer Science and Engineering (CSE). Checkout my <a href='https://linktr.ee/darkmortal' target='_blank'>Linktree</a>
                </div>
            </>
        )
    }
}