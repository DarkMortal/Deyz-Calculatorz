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
  <React.Fragment>
    <div className="text-center p-3" style={{
      backgroundColor: '#012148',
      color: 'white',
      bottom: '0px',
      marginTop: '20px',
      position: 'fixed',
      width: '100%'
      // width: "fit-content",
    }}>
      <b>© Saptarshi Dey {new Date().getFullYear()}</b>
    </div>
  </React.Fragment>, document.getElementById("footer")
);
