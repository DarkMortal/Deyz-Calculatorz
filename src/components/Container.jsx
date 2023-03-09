import React from "react";
import PropTypes from 'prop-types';

export default function FORM(props){
    function OnClickHandler(){
        if(props.data!==[]){
            if(props.whichCalc==="Matrix Determinant Calculator" || props.whichCalc==="Matrix Adjoint Calculator" || props.whichCalc==="Matrix Inverse Calculator" || props.whichCalc==="Matrix Power Calculator"){
            var x=document.getElementById(props.data[0].Text).selectedIndex+1;
            props.btnFunction(x,x);
            }
            else if(props.whichCalc==="Matrix Transpose"){
                x=document.getElementById(props.data[0].Text).selectedIndex+1;
                var y=document.getElementById(props.data[1].Text).selectedIndex+1;
                props.btnFunction(x,y);
            }
            else if(props.whichCalc==="Matrix Multiplication"){
                x=document.getElementById(props.data[0].Text).selectedIndex+1;
                y=document.getElementById(props.data[1].Text).selectedIndex+1;
                var z=document.getElementById(props.data[2].Text).selectedIndex+1;
                props.btnFunction(x,y); props.btnFunction2(y,z);
            }
            else if(props.whichCalc==="Matrix Addition" || props.whichCalc==="Matrix Subtraction"){
                x=document.getElementById(props.data[0].Text).selectedIndex+1;
                y=document.getElementById(props.data[1].Text).selectedIndex+1;
                props.btnFunction(x,y); props.btnFunction2(x,y);
            }
            else if(props.whichCalc==="Inverse Matrix Method"){
                x=document.getElementById(props.data[0].Text).selectedIndex+1;
                props.btnFunction(x,x); props.btnFunction2(x,1);
            }
            else if(props.whichCalc==="Continue Matrix Multiplication from Left"){
                x=document.getElementById(props.data[0].Text).selectedIndex+1;
                props.btnFunction3(x);
            }
            else if(props.whichCalc==="Continue Matrix Multiplication from Right"){
                x=document.getElementById(props.data[0].Text).selectedIndex+1;
                props.btnFunction4(x);
            }
            else if(props.whichCalc==="Continue Matrix Power") props.btnFunc();
            else if(props.whichCalc==="Continue Matrix Addition") props.Addition();
            else if(props.whichCalc==="Continue Matrix Subtraction from Left") props.SubL();
            else if(props.whichCalc==="Continue Matrix Subtraction from Right") props.SubR();
        }
    }
    React.useEffect(function (){
        document.getElementById("htbn").onclick=OnClickHandler;
        if(document.getElementById("Trailing Decimals:")!==null){
            document.getElementById("Trailing Decimals:").onchange=()=>{
            props.onClickHandler(document.getElementById("Trailing Decimals:").selectedIndex+1);
        }}
        if(document.getElementById("Enter Power:")!==null){
            document.getElementById("Enter Power:").onchange=()=>{
                props.onClickHandler2(document.getElementById("Enter Power:").selectedIndex+1);
            }
        }
    });
        return(
        <div className="container px-5 py-10 mx-auto flex flex-wrap items-center text-gray-400 bg-gray-900 body-font" style={{backgroundColor:"transparent"}}>
            <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0" style={{margin:"auto"}}>
            {
                props.data.map(e=>{ if(e){
                    return (<>
                    <b>{e.Text}</b>
                    <select className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" id={e.Text} defaultValue={e.selectedIndex+1} disabled={e.isDisabled}>
                        {
                            Array.from(Array(e.Num),(err,i)=>{
                                if(err) console.error("Error : ",err);
                                else{
                                    if(i===e.selectedIndex) return <option key={i+1} value={i+1} selected>{i+1}</option>
                                    else return <option key={i+1} value={i+1}>{i+1}</option>
                                }
                            })
                        }
                    </select></>)
                }})
            }
            <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" id="htbn">{props.btntxt}</button>
            
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#profileModal" style={{marginTop: '10px'}}>Functions and Constants</button>
            <div className="modal fade" id="profileModal" aria-labelledby="profileModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                    <div className="modal-content bg-dark">
                        <div className="modal-header">
                        <h5 className="modal-title" id="profileModalLabel">List of functions and constants that can be used</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul style={{color: 'white'}}>
                                <li>pi : Evaluates to Math.PI</li>
                                <li>sin : Evaluates to Math.sin</li>
                                <li>cos : Evaluates to Math.cos</li>
                                <li>tan : Evaluates to Math.tan</li>
                                <li>sinh : Evaluates to Math.sinh</li>
                                <li>conh : Evaluates to Math.cosh</li>
                                <li>tanh : Evaluates to Math.tanh</li>
                            </ul>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                    </div>
                </div>

          </div>
        </div>
        );
}

FORM.propTypes={
    data: PropTypes.array.isRequired
}