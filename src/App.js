// import logo from './logo.svg';

// include DOM references
import React, {useRef, useState,useEffect} from 'react';

// import tf dependencies
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as Webcam from "react-webcam";


import './App.css';

//import the drawing function
import {drawHand} from "./utilities.js";

import { rockOnGesture } from './RockOn.js';
//import fingerpose assets
import * as fp from "fingerpose";
import Handsigns from "./handsigns";
import { Signimage, Signpass } from "./handimage"
import victory from "./victory.png";
import thumbs_up from "./thumbs_up.png";
import rock_on from "./rock_on.png";


function App() {
  // include references to pass
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  
  // const images = {thumbs_up: thumbs_up, victory: victory, rock_on: rock_on};
  // set state for sign
  const [sign, setSign] = useState(null);
  

  // load handpose model
  const runHandpose = async () => {
    const net = await handpose.load();
    console.log('Handpose model loaded.');
    
    // detect hands loop
    setInterval(() => {
      detect(net);
    }, 150); //150 is agreeable for better average detection

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
      
      //console.log(hand);

      // detect gestures
      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          //fp.Gestures.VictoryGesture,
          //fp.Gestures.ThumbsUpGesture,
          //fp.Gestures.ThumbsUpGesture,
          // rockOnGesture
          Handsigns.aSign,
          Handsigns.bSign,
          Handsigns.cSign,
          Handsigns.dSign,
          Handsigns.eSign,
          Handsigns.fSign,
          Handsigns.gSign,
          Handsigns.hSign,
          Handsigns.iSign,
          Handsigns.jSign,
          Handsigns.kSign,
          Handsigns.lSign,
          Handsigns.mSign,
          Handsigns.nSign,
          Handsigns.oSign,
          Handsigns.pSign,
          Handsigns.qSign,
          Handsigns.rSign,
          Handsigns.sSign,
          Handsigns.tSign,
          Handsigns.uSign,
          Handsigns.vSign,
          Handsigns.wSign,
          Handsigns.xSign,
          Handsigns.ySign,
          Handsigns.zSign
          
        ]);

        const gesture = await GE.estimate(hand[0].landmarks, 6.5);
        
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          
          console.log(gesture.gestures); //print guesture array

          const confidence = gesture.gestures.map(prediction => prediction.score)
          console.log(confidence + " confidence");
          const maxConfidence = confidence.indexOf(
            Math.max.apply(Math, confidence)
          );
          console.log(maxConfidence +  " max confidence");
          console.log(gesture.gestures[maxConfidence].name + " name");
          //console.log(gesture.gestures[maxConfidence].name);
          setSign(gesture.gestures[maxConfidence].name);
          console.log(sign + "sign")

          
        };
      };


      // draw mesh
      const ctx = canvasRef.current.getContext("2d");
      
      drawHand(hand, ctx);
    }

  };

  //useEffect(() => console.log(sign + "effect sign"), [sign])
  useEffect(()=>{runHandpose()},[]);

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
          
          {/* emoji */}
          {sign !== null ? (
            <img

              alt="signImage"
                  src={
                    Signimage[sign] //?.src
                      // ? Signimage[sign].src
                      //: "/loveyou_emoji.svg"
                  }
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 400,
                bottom: 400,
                right: 0,
                textAlign: "center",
                height: 100,
              }}
            />
          ) : ("")}

      </header>
    </div>
  );
}

export default App;
