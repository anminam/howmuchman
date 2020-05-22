import React from "react";

export interface IPhotoRegister {
}

class PhotoRegister {

    constructor(props:IPhotoRegister) {
        const {videoElement, captureElement, changeCameraElement, direction } = props;
        this.videoElement = videoElement;
        this.captureElement = captureElement;
        this.changeCameraElement = changeCameraElement;
        this.direction = direction || IDirection.BACK
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

export default PhotoRegister;