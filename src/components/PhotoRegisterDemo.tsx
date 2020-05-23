import React, { useRef, useEffect, useState } from 'react';
import PhotoRegister, { IPhotoRegister } from 'lib/core/PhotoRegister';

const initConfig = {
  sampleImageSrc:"../common/image/car-oneday-photo-front.png"
}

const PhotoRegisterDemo = () => {

  const imgEl = useRef<HTMLImageElement>(null);
  const [photoRegister, setPhotoRegister] = useState<PhotoRegister>();
  const [alt, stAlt] = useState<string>('');

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

    if (null !== imgEl.current) {
      imgEl.current.src = URL.createObjectURL(files[0]);
    }
  }

  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
    document.getElementById('photo-register')?.click();
  }

  return (
    <>
      <div className="thumbnail-container">
        <div className="sample-container">
          <img className="sample-img" src={initConfig.sampleImageSrc} alt="샘플이미지" width="100%" height="100%" />
          <h3 className="sample-title">사진 샘플</h3>
        </div>
        <div className="photo-container">
          <img id="frame" ref={imgEl} alt={alt} />
        </div>
      </div>
      <div className="button-container">
        <input type="file" accept="image/*" capture="camera" id="photo-register" onChange={onChangeImage} className="hidden-input-file" style={{display: 'none'}}/>
        <button type="button" className="ne-bt2 btn-upload-image" onClick={handleClickBtn}>사진 등록하기</button>
      </div>
    </>
  )
}

export default PhotoRegisterDemo;