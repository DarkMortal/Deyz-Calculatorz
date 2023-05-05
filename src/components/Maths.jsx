import Latex from 'react-latex';

export default function Maths(props) {
    const styling = {
        overflow: "auto",
        textAlign: "center",
        height: "35vh",
    }
    if (props.isMathMode) return (
        <div style={styling}>
            <Latex>{props.equation}</Latex>
        </div>
    );
    else return (
        <div style={styling}>
            <font color="white" style={{ "fontFamily": "sans-serif" }}><b>{props.noMath}</b></font>
        </div>
    )
}