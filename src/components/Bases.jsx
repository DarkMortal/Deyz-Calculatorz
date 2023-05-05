import { useState } from 'react';
import Maths from './Maths';
import base_obj from '../bases.mjs';

export default function Bases() {
  const [answer, ChangeAnswer] = useState('');

  return (
    <><div className="container px-5 py-10 mx-auto flex flex-wrap items-center text-gray-400 bg-gray-900 body-font" style={{ backgroundColor: "transparent" }}>
      <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0" style={{ margin: "auto" }}>
        <div className="relative mb-4">
          <label htmlFor="name" className="leading-7 text-gray-400"><b>Number</b></label>
          <input type="text" placeholder='Enter the number here' className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" style={{ textTransform: 'uppercase' }} />
        </div>
        <b>Input Base</b>
        <select className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" id='inputBase' defaultValue={10}>
          {
            Array.from(Array(32), (err, i) => {
              if (err) console.error("Error : ", err);
              else {
                if (i === 10) return <option key={i + 1} value={i + 1} selected>{i + 1}</option>
                else return <option key={i + 1} value={i + 1}>{i + 1}</option>
              }
            })
          }
        </select>
        <b>Output Base</b>
        <select className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" id='outputBase' defaultValue={10}>
          {
            Array.from(Array(32), (err, i) => {
              if (err) console.error("Error : ", err);
              else {
                if (i === 10) return <option key={i + 1} value={i + 1} selected>{i + 1}</option>
                else return <option key={i + 1} value={i + 1}>{i + 1}</option>
              }
            })
          }
        </select>
        <b>Trailing Decimals:</b>
        <select className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" id='decimal' defaultValue={10}>
          {
            Array.from(Array(8), (err, i) => {
              if (err) console.error("Error : ", err);
              else {
                if (i === 10) return <option key={i + 1} value={i + 1} selected>{i + 1}</option>
                else return <option key={i + 1} value={i + 1}>{i + 1}</option>
              }
            })
          }
        </select>
        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => {
          let text = document.querySelector('input').value.toUpperCase();
          let inputBase = document.getElementById('inputBase').selectedIndex + 1;
          let outputBase = document.getElementById('outputBase').selectedIndex + 1;
          let decimal = document.getElementById('decimal').selectedIndex + 1;
          if(base_obj.isValidNum(text, inputBase)){
            let ans = base_obj.convertToBase(text, inputBase, outputBase, decimal);
            ChangeAnswer(`$(${text})_{${inputBase}} = (${ans})_{${outputBase}}$`);
          }else{
            alert(`${text} is not a valid base ${inputBase} number`);
          }
        }}>Calculate</button>
      </div>
    </div>
      <div style={{ color: 'white' }}>
        <Maths equation={answer} isMathMode={true} noMath={null} />
      </div></>
  );
}