import React, { useRef, useEffect, useState } from 'react';
import PhotoRegister, { IPhotoRegister } from 'lib/core/PhotoRegister';

const initConfig = {
  sampleImageSrc: '/assets/images/sample.jpg',
  width: 300,
  height: 300
}

interface IPhotoRegisterComponent {
  id:string
  alt:string
}

const PhotoRegisterComponent = (props:IPhotoRegisterComponent) => {

  const imgEl = useRef<HTMLImageElement>(null);
  const inputFileEl = useRef<HTMLInputElement>(null);
  const [alt, setAlt] = useState<string>(props.alt);
  const [id, setId] = useState<string>(props.id);
  const [imgData, setImgData] = useState<string>('');

  const _removeImage = () => {
    setImgData('');
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;

    if (files === null) {
      return;
    }

    const imgSrc = URL.createObjectURL(files[0]);
    setImgData(imgSrc);
  }

  const handleRegistClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
    inputFileEl.current?.click();
  }
  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
    _removeImage();
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
        <input type="file" accept="image/*" capture="camera" ref={inputFileEl} onChange={handleImageChange} className="hidden-input-file" style={{display: 'none'}}/>
        <button type="button" className="ne-bt2 btn-upload-image" onClick={handleRegistClick}>사진 등록하기</button>
        <button type="button" className="btn-delete" onClick={handleDeleteClick}>사진 삭제</button>
      </div>
    </>
  )
}

export default PhotoRegisterComponent;