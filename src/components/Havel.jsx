import React from "react";

export default function Havel(){
        const style={
            "margin":"auto",
            "display":"inline-flex",
            "width":"fit-content",
        }
        const button_style={
            "marginLeft":"10px",
            "height":"42px",
            "marginTop":"0px"
        }
        React.useEffect(function (){
            document.getElementById("hvl_btn").addEventListener("submit",(evt)=>{
                evt.preventDefault();
                var string=document.getElementById("array").value;
                var bool=true;
                for(var i=0;i<string.length;i++){ if(!"1234567890,".includes(string[i])){ console.log(i,string[i]); bool=false; break; }}
                if(bool){
                    var arr=[],x=string.split(',');
                    x.forEach(elm=>arr.push(parseInt(elm)));
                    if(Havel(arr)) str+="Conclusion:- The Graph is possible";
                    else str+="Conclusion:- The Graph is not possible";
                    document.getElementById("message").value=str; str="";
                }else alert("Please enter some valid values");
            });
            var str="";

            function Disp(v,a){
                str+="STEP-"+a.toString()+": ";
                for(var i=v.length;i>0;i--) str+=v[i-1].toString()+" ";
                str+="\n\n";
            }

            function Havel(arr){
                var x=0,n=arr.length;
                var allZero=false;
                arr.sort();
                for(var i=1;i<=n;i++){
                    x=arr[n-i]; arr.pop();
                    if(x>(n-i)) return false;
                    for(var j=i+1;j<=x+i;j++){
                        arr[n-j]--;
                        if(arr[n-j]<0){
                            Disp(arr,i);
                            return false;
                        }
                    }
                    allZero=arr.every(elm=>elm===0) //To check if all elements are equal to 0
                    if(allZero){
                        Disp(arr,i);
                        return true;
                    }
                    arr.sort();
                    Disp(arr,i);
                } return true;
            }
        },[]);
        return(
            <>
            <form className="form-inline" id="hvl_btn" style={{textAlign:"center"}}>
            <div style={style}>
            <div>
                <div className="relative mb-4">
                    <input type="text" id="array" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Enter the degrees of the vertices seperated by comma" data-toggle="tooltip" data-placement="top" title="Enter the degrees of the vertices seperated by comma" autoComplete="off"/>
                </div>
            </div>
            <button className="btn btn-primary mb-2" style={button_style}>Check</button></div>
            </form>
            <div className="relative mb-4" style={{textAlign:"center"}}>
                <label htmlFor="message" className="leading-7 text-sm text-gray-400" style={{"fontSize":"larger"}}>Answer</label><br/>
                <textarea id="message" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" style={{width:"90%",overflow:"auto",textAlign:"center"}}></textarea>
            </div>
            <details style={{textAlign:"justify",fontSize:"1.5em",overflow:"auto"}}><summary style={{color:"white"}}><b><u>About Havel Hakimi Theorem</u></b></summary><div style={{color:"white"}}>
                <iframe style={{margin:"auto"}} width="560" height="315" src="https://www.youtube.com/embed/DdCxNvULI-c" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                The Havel-Hakimi algorithm is an algorithm in graph theory solving the graph realization problem. That is, it answers the following question: Given a finite list of nonnegative integers in non-increasing order, is there a simple graph such that its degree sequence is exactly this list?
            </div></details>
            </>
        );
}