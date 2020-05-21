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
}

class Camera {

    // 비디오 설정
    initMediaConfig:IMediaConfig = {
        video: {
        width: { ideal: 1280 },
        height: { ideal: 1024 },
        facingMode: {
            exact: ICameraDirectionConfig.ENVIRONMENT
        },
        // mandatory: {
        //   minWidth: 1280,
        //   minHeight: 720
        // }
        }
    }

    videoElement:IVideoType;

    stream?:MediaStream;
    devices?:MediaDeviceInfo[];

    constructor(props:ICamera) {
        this.videoElement = props.videoElement;
    }

    /**
   * videoDevice 가져오기
   * @param mediaDevices 
   */
    _getDivices = (mediaDevices: MediaDeviceInfo[]) => {
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

    _checkMediaPermission = async () => {
        let stream: MediaStream | null = null;

        try {
            stream = await navigator.mediaDevices.getUserMedia(this.initMediaConfig);
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

    _connectStream = () => {
        if(!this.stream) {
            return;
        }
        const elementObj = (<React.RefObject<HTMLVideoElement>>this.videoElement).current;
        if (elementObj) {
            elementObj.srcObject = this.stream;
        }
    }

    _getDevice = async () => {
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
     * 
     */
    startCamera = async () => {
        try {
            await this.stopCamera();

            this.stream = await this._checkMediaPermission();

            this._connectStream();

            this.devices = await this._getDevice();







        } catch (error) {
            console.log(error.toString());
        }
    }
    /**
     * 
     */
    stopCamera = async () => {
        try {

        } catch (error) {

        }

    }

    

}

export default Camera;