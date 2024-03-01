// import logo from './logo.svg';

// include DOM references
import React, {useRef} from 'react';

// import tf dependencies
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as Webcam from "react-webcam";


import './App.css';

function App() {
  // include references to pass
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // load handpose model
  const runHandpose = async () => {
    const net = await handpose.load();
    console.log('Handpose model loaded.');
  };
  runHandpose();

  return (
    <div className="App">
      <header className="App-header">
        {/* webcam */}
        <Webcam ref={webcamRef} style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 10,
          width: 700,
          height: 500
        }} />

        {/* canvas */}
        <canvas ref={canvasRef} style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 10,
          width: 700,
          height: 500
        }} />
      </header>
    </div>
  );
}

export default App;
