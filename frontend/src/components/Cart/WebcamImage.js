import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";

function WebcamImage({img,setImg,verifyImage}) {
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  return (
    <div className="Container">
      {img === null ? (
        <>
        <div className="w-max"> 
          <Webcam
            audio={false}
            mirrored={true}
            height={300}
            width={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            />
          <button
            style={{backgroundColor: 'rgb(74 222 128)'}}
            className="mx-auto w-full px-2 font-bold py-1 " onClick={capture}>Capture photo</button>
            </div>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot"/>
          <div className="flex w-full justify-evenly text-center">
            <div className="w-2/4	" style={{backgroundColor:"rgb(214 211 209)"}} onClick={() => setImg(null)}>Retake</div>
            <div className="w-2/4 " style={{backgroundColor:"rgb(52 211 153)"}} onClick={() => verifyImage()}>Verify</div>
          </div>
        </>
      )}
    </div>
  );
}

export default WebcamImage;