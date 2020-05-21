import React from "react";

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

interface IMediaConfig {
    video: {
      width: { ideal: number },
      height: { ideal: number },
      facingMode: {
        exact: ICameraDirectionConfig
      },
      // mandatory: {
      //   minWidth: number,
      //   minHeight: number
      // }
    }
  }

type IVideoType = HTMLVideoElement | React.RefObject<HTMLVideoElement>;

export interface ICamera {
    videoElement: IVideoType
    captureElement?: React.RefObject<HTMLButtonElement>
    changeCameraElement?: React.RefObject<HTMLButtonElement>
    direction?: IDirection
    size?: {
        width: number
        height: number
    }
}

class Camera {

    videoElement:IVideoType;

    stream?:MediaStream;
    devices?:MediaDeviceInfo[];

    captureElement?: React.RefObject<HTMLButtonElement>
    changeCameraElement?: React.RefObject<HTMLButtonElement>
    direction: IDirection;

    constructor(props:ICamera) {
        const {videoElement, captureElement, changeCameraElement, direction } = props;
        this.videoElement = videoElement;
        this.captureElement = captureElement;
        this.changeCameraElement = changeCameraElement;
        this.direction = direction || IDirection.BACK
    }

    _getVideoConfig = ():IMediaConfig => {
        return {
            video: {
            width: { ideal: 1280 },
            height: { ideal: 1024 },
            facingMode: {
                exact: this._getDirection(this.direction)
            },
            // mandatory: {
            //   minWidth: 1280,
            //   minHeight: 720
            // }
            }
        }
    }

    /**
     * 퍼미션 체크
     */
    _checkMediaPermission = async () => {
        let stream: MediaStream | null = null;

        try {
            stream = await navigator.mediaDevices.getUserMedia(this._getVideoConfig());
        } catch(error) {
            switch (error.name) {
                case "NotFoundError":
                    throw Error('카메라를 찾을 수 없습니다.');
                default:
                    throw Error('알 수 없는 에러');
            }

        }

        return stream;
    }

    /**
     * 비디오 스트림 연결
     */
    _connectStream = () => {
        if(!this.stream) {
            return;
        }
        const elementObj = (<React.RefObject<HTMLVideoElement>>this.videoElement).current;
        if (elementObj) {
            elementObj.srcObject = this.stream;
        }
    }

    /**
     * 디바이스 가져오기
     */
    _getDivices = async () => {
        const addDevices: MediaDeviceInfo[] = [];
        try {
            const devices = await navigator.mediaDevices.enumerateDevices()
            devices.forEach(( device: MediaDeviceInfo, i ) => {
                if (device.kind === 'videoinput') {
                    addDevices.push(device);
                }
            });
        } catch (error) {
            throw error.toString();
        }

        return addDevices;
    }

    /**
     * props에서 얻은값 -> ICameraDirectionConfig
     * @param configDirection 
     */
    _getDirection = (configDirection:IDirection):ICameraDirectionConfig => {
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
  

    /**
     * 카메라 시작
     */
    startCamera = async () => {
        try {

            this.stopCamera();

            this.stream = await this._checkMediaPermission();

            this._connectStream();

            this.devices = await this._getDivices();

        } catch (error) {
            console.log(error.toString());
        }
    }

    /**
     * 카메라 중단
     */
    stopCamera = () => {
        try {
            this.stream?.getTracks().forEach(i => {
                i.stop();
            });
        } catch (error) {
            console.log(error.toString());   
        }
    }

    /**
     * 카메라 바꾸기
     */
    changeCamera = () => {

        this.stopCamera();

        const configList:Array<ICameraDirectionConfig> = [ICameraDirectionConfig.ENVIRONMENT, ICameraDirectionConfig.USER];
        const deviceLength = configList.length;
        let nextIndex = this.direction + 1;
        
        if (deviceLength === nextIndex) {
            nextIndex = 0;
        }

        this.direction = nextIndex;

        this.startCamera();
    }
}

export default Camera;