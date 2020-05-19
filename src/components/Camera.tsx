import React, { useRef, useEffect, useState } from 'react';

const Camera = () => {

  const videoEl = useRef<HTMLVideoElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream>();
  const [errMessage, setErrorMessage] = useState<String>('');
  const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([]);
  const [isMulticamera, setIsMulticamera] = useState<Boolean>(false);
  const [selectedCameraIndex, setSelectedCameraIndex] = useState<number>(0);

  // 비디오 설정
  const initMediaConfig = {
    video: {
      facingMode: {
        // exact: "user"
        exact: "environment"
      }
    }
  }

  const [mediaConfig, setMediaConfig] = useState(initMediaConfig);

  /**
   * 권한 받기 성공
   * @param stream 
   */
  const handleSuccess = (stream: MediaStream) => {
    if (null !== videoEl.current) {
      setCameraStream(stream);
      videoEl.current.srcObject = stream;
    }

    navigator.mediaDevices.enumerateDevices().then(getDivices);
  }

  /**
   * 
   * @param mediaDevices 
   */
  const getDivices = (mediaDevices: MediaDeviceInfo[]) => {
    const addDevices: MediaDeviceInfo[] = [];
    mediaDevices.forEach((device: MediaDeviceInfo, i) => {
      if (device.kind === 'videoinput') {
        addDevices.push(device);
      }
    });
    setDeviceList([...addDevices]);
    if(addDevices.length > 1) {
      setIsMulticamera(true);
    }

  }

  const onClickCameraKind = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    stopCamera();

    const configList = ['environment', 'user'];
    const deviceLength = configList.length;
    let nextIndex = selectedCameraIndex + 1;
    
    if(deviceLength === nextIndex) {
      nextIndex = 0;
    }

    setSelectedCameraIndex(nextIndex);

    setMediaConfig({
      ...mediaConfig,
      video: {
        facingMode: {
          exact: configList[nextIndex]
        }
      }
    })
  }

  const stopCamera = () => {
    if (undefined !== cameraStream) {
      cameraStream.getTracks().forEach(i => {
        i.stop();
      });
    }
  }

  useEffect(() => {
    // 권한체크
    navigator.mediaDevices.getUserMedia(mediaConfig)
      .then(handleSuccess)
      .catch((err) => {
        switch (err.name) {
          case "NotFoundError":
            setErrorMessage('카메라를 찾을 수 없습니다.');
            break;
          default:
            setErrorMessage('알 수 없는 에러');
        }
      });
  }, [mediaConfig]);

  return (
    <div>
      <video id="player" ref={videoEl} controls autoPlay />
      <p>{errMessage}</p>
      <div>
        {
          isMulticamera && <button onClick={onClickCameraKind}>꾸앙</button>
        }
      </div>
    </div>
  )
}

export default Camera;