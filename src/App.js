// import logo from './logo.svg';

// include DOM references
import React, {useRef, useState,useEffect} from 'react';

import { ChakraProvider } from '@chakra-ui/react'
import { Box, Flex, SimpleGrid, Wrap, WrapItem, Center, Square, Circle   } from '@chakra-ui/react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Divider, Image, Container, Stack, Text
} from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react'



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
import Zhand from "./handimage/Zhand.svg";


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
    <ChakraProvider>
    <div className="App">
    
      <body>
   
      <center>
      <SimpleGrid row={1} spacingX='0px' spacingY='0px' width="95%"  m={3} bg="slate.50" border='1px' borderColor='gray.200' borderRadius='20px'>      
      <SimpleGrid columns={4} spacingX='40px' spacingY='20px' width="95%" m={3}>
        <Button>
            <Text
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                bgClip='text'  
                fontWeight='extrabold'>
                ASL Translator
             </Text>     
      </Button>
        <Popover>
          <PopoverTrigger>
            <Button>About this Project</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight='semibold'>About this</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              -- how to use the app <br/>
              -- why I made this app <br/>
              -- limiations of the app <br/>
              -- sources <br/>
           
              
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Button colorScheme='blue'>Github  <ExternalLinkIcon/></Button>
        <Button variant='ghost'>  Built by Nadeem S </Button>
      </SimpleGrid>
      
      
      </SimpleGrid>
        
      <SimpleGrid className="handrows" columns={7} spacingX='40px' spacingY='15px' width="95%" m={3} border='1px' borderColor='gray.200' borderRadius='20px' paddingTop='2' paddingBottom='2'>
        <Box  height='80px'><Box ><img src={Signpass[0].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[1].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[2].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[3].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[4].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[5].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[6].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[7].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[8].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[9].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[10].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[11].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[12].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[13].src} alt="SVG as an image"></img></Box></Box>
      </SimpleGrid>

       <SimpleGrid columns={1}  spacingX='40px' spacingY='0px' width="95%" m={3}>
      
      <Box height = '500px' m={1} >
        {/* webcam */}
        <Webcam ref={webcamRef} /* mirror camera */ mirrored="true" style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 0,
        marginBottom:0, 
        left: 0,
        right: 0,
        forceScreenshotSourceSize: "true",
        audio: "false",
        textAlign: "center",
        zindex: 10,
        width: 700,
        height: 500  
        }} />
      
      
        {/* canvas */}
        
        <canvas ref={canvasRef} 
          style={{
          position: "absolute",
          marginLeft: "auto",
         marginRight: "auto",
          marginTop: 0,
          marginBottom:0, 
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
      </Box>
      

      <Box  m={1} > <Text fontSize="xl" fontWeight="bold">Detected Sign</Text>
          {/* emoji */}
          {sign !== null ? (
            <Image m={1}

              alt="signImage"
                  src={ Signimage[sign] }
                  
              style={{
                position: "sticky",
                marginLeft: 0,
                marginRight: 0,
                marginTop: 10,
                left: 0,
                bottom: 0,
                right: 0,
                zindex: 5,
                textAlign: "center",
                border: '3px solid rgb(229 231 235)',
                borderRadius: '10px',
                paddingTop: '10px',
                paddingBottom: '10px',
                paddingRight: '10px',
                paddingLeft: '10px'
                
              }}
            />
          ) : ("")}
        </Box>

        </SimpleGrid>   

        <SimpleGrid columns={6} spacingX='40px' spacingY='15px' width="95%" m={3} border='1px' borderColor='gray.200' borderRadius='20px' paddingTop='2' paddingBottom='2'>
        <Box  height='80px'><Box ><img src={Signpass[14].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[15].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[16].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[17].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[18].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[19].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[20].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[21].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[22].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[23].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[24].src} alt="SVG as an image"></img></Box></Box>
        <Box  height='80px'><Box ><img src={Signpass[25].src} alt="SVG as an image"></img></Box></Box>
        
      </SimpleGrid>
      </center>
      </body>
    </div>

    </ChakraProvider>
  );
}

export default App;
