import React, { useRef, useEffect, useState } from 'react';
import * as CameraMan from 'lib/core/Camera';

const Camera2 = () => {

  const [camera, setCamera] = useState<CameraMan.default>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const btnCaptrueEl = useRef<HTMLButtonElement>(null);
  const btnToggleEl = useRef<HTMLButtonElement>(null);

  // init
  useEffect(() => {
    const config:CameraMan.ICamera = {
      videoElement: videoEl,
      captureElement: btnCaptrueEl,
      changeCameraElement: btnToggleEl
    }
    setCamera(new CameraMan.default(config));
  }, []);

  useEffect(()=> {
    camera?.startCamera();
  },[camera])

  const onToggle = () => {
    camera?.changeCamera();
  }

  return (
    <div>
      <video id="player" ref={videoEl} autoPlay />
      <button id="captrue" ref={btnCaptrueEl}>찍기</button>
      <button id="toggle" onClick={onToggle}>토글</button>
    </div>
  )
}

export default Camera2;