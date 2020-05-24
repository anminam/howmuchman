import React, { useRef, useEffect, useState } from 'react';
import PhotoRegister, { IPhotoRegister } from 'lib/core/PhotoRegister';

const initConfig = {
  sampleImageSrc: '/assets/images/sample.jpg',
  width: 300,
  height: 300
}

const PhotoRegisterDemo = () => {

  const imgEl = useRef<HTMLImageElement>(null);
  const inputFileEl = useRef<HTMLInputElement>(null);
  const [photoRegister, setPhotoRegister] = useState<PhotoRegister>();
  const [alt, stAlt] = useState<string>('');
  const [imgData, setImgData] = useState<string>('');

  useEffect(()=> {
    const config:IPhotoRegister = {

    }
    setPhotoRegister(new PhotoRegister(config));
  },[]);

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;

    if (files === null) {
      return;
    }

    const imgSrc = URL.createObjectURL(files[0]);
    setImgData(imgSrc);
  }

  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
    inputFileEl.current?.click();
  }

  return (
    <>
      <div className="thumbnail-container">
        { !imgData &&
          <div className="sample-container image-container" style={{width:initConfig.width, height:initConfig.height}} >
            <img className="sample-img" src={initConfig.sampleImageSrc} alt="샘플이미지"/>
            <h3 className="sample-title">사진 샘플</h3>
          </div>
        }
        { imgData &&
          <div className="photo-container image-container" style={{width:initConfig.width, height:initConfig.height}} >
            <img id="frame" src={imgData} ref={imgEl} alt={alt}/>
          </div>
        }
      </div>
      <div className="button-container">
        <input type="file" accept="image/*" capture="camera" ref={inputFileEl} onChange={onChangeImage} className="hidden-input-file" style={{display: 'none'}}/>
        <button type="button" className="ne-bt2 btn-upload-image" onClick={handleClickBtn}>사진 등록하기</button>
      </div>
    </>
  )
}

export default PhotoRegisterDemo;