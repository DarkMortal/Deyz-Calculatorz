import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <React.StrictMode>
  <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)', color: 'white', bottom: '0px', position: 'absolute', alignSelf:'right'}}>
      © Saptarshi Dey {new Date().getFullYear()}
  </div>
</React.StrictMode>, document.getElementById("footer")
)
