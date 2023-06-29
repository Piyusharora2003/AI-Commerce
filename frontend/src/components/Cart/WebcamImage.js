import React, { useCallback, useRef, useState } from "react";
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
          <Webcam
            audio={false}
            mirrored={true}
            height={350}
            width={350}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture photo</button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot"/>
          <div onClick={() => setImg(null)}>Retake</div>
          <div onClick={() => verifyImage()}>Verify</div>
        </>
      )}
    </div>
  );
}

export default WebcamImage;