// import logo from './logo.svg';

// include DOM references
import React, {useRef} from 'react';

// import tf dependencies
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as Webcam from "react-webcam";


import './App.css';

//import the drawing function
import {drawHand} from "./utilities.js";


function App() {
  // include references to pass
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // load handpose model
  const runHandpose = async () => {
    const net = await handpose.load();
    console.log('Handpose model loaded.');
    
    // detect hands loop
    setInterval(() => {
      detect(net);
    }, 1);

  };
  // detect hands
  const detect = async (net) => { 
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // set video properties
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // set canvas properties
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // make detections
      const hand = await net.estimateHands(video);
      console.log(hand);

      // draw mesh
      const ctx = canvasRef.current.getContext("2d");
      
      drawHand(hand, ctx);
    }

  };
  const videoConstraints = {
    
    mirrored: true
  };
  runHandpose();

  return (
    <div className="App">
      <header className="App-header">
        {/* webcam */}
        <Webcam ref={webcamRef} /* mirror camera */ mirrored="true" style={{
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
          height: 500,
          /* flip canvas */
          transform: 'scale(-1, 1)',
          filter: 'FlipH'
        }} />
      </header>
    </div>
  );
}

export default App;
