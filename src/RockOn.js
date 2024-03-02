import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

// define rock_on gesture
export const rockOnGesture = new GestureDescription('rock_on');

// thumb
rockOnGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
rockOnGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.9);
rockOnGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.9);

// index
rockOnGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
rockOnGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

// pinky
rockOnGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
rockOnGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);


for (let finger of [Finger.Middle, Finger.Ring]) {
  rockOnGesture.addCurl(finger, FingerCurl.FullCurl, 0.9);
  rockOnGesture.addDirection(finger, FingerDirection.VerticalDown, 1.0);
}
