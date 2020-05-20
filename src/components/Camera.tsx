import React, { useRef, useEffect, useState } from 'react';

// TODO: 카메라가 1개만 있는 디바이스
// TODO: 카메라가 3개 이상있는 디바이스
// TODO: 그냥 ts로 할까??

enum IDirection {
  FRONT,
  BACK
}
enum ICameraDirectionConfig {
  USER = 'user',
  ENVIRONMENT = 'environment'
}

export interface ICameraConfig {
  direction?:IDirection
}
export interface ICamera {
  onCameraStart?: (stream: MediaStream) => void
  onCameraError?: (error:string) => void
  
  onClickClose?: () => void
  onClickTakePhoto?: () => void
  onClickSwitchCamera?: () => void
  config?: ICameraConfig
}

interface IMediaConfig {
  video: {
    facingMode: {
      exact: ICameraDirectionConfig
    },
    // mandatory: {
    //   minWidth: number,
    //   minHeight: number
    // }
  }
}

/**
 * props에서 얻은값 -> ICameraDirectionConfig
 * @param configDirection 
 */
const getDirection = (configDirection:IDirection):ICameraDirectionConfig => {
  let direction: ICameraDirectionConfig = ICameraDirectionConfig.ENVIRONMENT
  switch(configDirection) {
    case IDirection.FRONT: 
      direction = ICameraDirectionConfig.USER;
      break;
    case IDirection.BACK: 
      direction = ICameraDirectionConfig.ENVIRONMENT;
      break;
    default:
      break;
  }

  return direction;
}

// 비디오 설정
const initMediaConfig:IMediaConfig = {
  video: {
    facingMode: {
      exact: ICameraDirectionConfig.ENVIRONMENT
    },
    // mandatory: {
    //   minWidth: 1280,
    //   minHeight: 720
    // }
  }
}

const Camera = (props: ICamera) => {

  const videoEl = useRef<HTMLVideoElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream>();
  const [errMessage, setErrorMessage] = useState<string>('');
  const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([]);
  const [isMulticamera, setIsMulticamera] = useState<boolean>(false);
  const [selectedCameraIndex, setSelectedCameraIndex] = useState<number>(0);
  const [mediaConfig, setMediaConfig] = useState<IMediaConfig>(initMediaConfig);

  // init
  useEffect(() => {
    if (props.config) {
      if (props.config.direction) {
          setMediaConfig({
            ...mediaConfig,
            video: {
              // mandatory: mediaConfig.video.mandatory,
              facingMode: {
                exact: getDirection(props.config.direction)
              }
            }
          });
      }
    }
  }, []);

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
   * videoDevice 가져오기
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
    if (addDevices.length > 1) {
      setIsMulticamera(true);
    }

  }

  /**
   * 카메라 변경
   * @param event 
   */
  const onClickCameraKind = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    stopCamera();

    const configList:Array<ICameraDirectionConfig> = [ICameraDirectionConfig.ENVIRONMENT, ICameraDirectionConfig.USER];
    const deviceLength = configList.length;
    let nextIndex = selectedCameraIndex + 1;
    
    if (deviceLength === nextIndex) {
      nextIndex = 0;
    }

    setSelectedCameraIndex(nextIndex);

    setMediaConfig({
      ...mediaConfig,
      video: {
        // mandatory: mediaConfig.video.mandatory,
        facingMode: {
          exact: configList[nextIndex]
        }
      }
    });
  }

  const stopCamera = () => {
    if (undefined !== cameraStream) {
      cameraStream.getTracks().forEach(i => {
        i.stop();
      });
    }
  }

  const onTakePhoto = () => {
    if (props.onClickTakePhoto) {
      props.onClickTakePhoto();
    } 

    // 이상하다
    const vidoe = document.getElementById('player') as HTMLVideoElement;
    const canvas = document.getElementById('photo-canvas') as HTMLCanvasElement;
    const img = document.getElementById('photo-image') as HTMLImageElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // cameraStream?.getVideoTracks()[0];
    // ImageCaptrue()
    
    
    ctx.drawImage(vidoe, 0, 0, 1000, 1000);
    img.src = canvas.toDataURL('image/webp');
    
  }

  const getDataUri = (userConfig) => {
    

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
            debugger;
            setErrorMessage('알 수 없는 에러');
        }
      });
  }, [mediaConfig]);

  ////////////////
  // 콜백관련
  ////////////////

  // 카메라 실행 콜백
  useEffect(()=> {
    if (cameraStream) {
      if (props.onCameraStart) {
        props.onCameraStart(cameraStream)
      }
    }
  }, [cameraStream]);

  // 에러 콜백
  useEffect(()=> {
    if (errMessage) {
      if (typeof(props.onCameraError) === 'function') {
        props.onCameraError(errMessage)
      }
    }
  }, [errMessage]);


  return (
    <div>
      <video id="player" ref={videoEl} controls autoPlay />
      <p>{errMessage}</p>
      <div>
        {
          isMulticamera && <button onClick={onClickCameraKind}>꾸앙</button>
        }
        {
          <button onClick={onTakePhoto}>사진찍기</button>
        }
      </div>
      <canvas id="photo-canvas"></canvas>
      <img id="photo-image" style={{display:'none'}} alt="my"></img>
    </div>
  )
}

export default Camera;