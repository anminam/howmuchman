import React, { useRef, useEffect, useState } from 'react';
import PhotoRegister, { IPhotoRegister } from 'lib/core/PhotoRegister';

const PhotoRegisterDemo = () => {

  const imgEl = useRef<HTMLImageElement>(null);
  const [photoRegister, setPhotoRegister] = useState<PhotoRegister>();

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

  return (
    <>
      {/* <input type="file" accept="image/*" capture="camera" id="photo-register" onChange={onChangeImage} /> */}
      {/* <img id="frame" ref={imgEl} alt="img" /> */}
      <div id="photo-front" className="upload-box" data-target="front">
        <div className="thumbnail-frame">
          <div className="sample-container">
            <img className="sample-img" src="../common/image/car-oneday-photo-front.png" alt={alt} width="100%" height="100%" />
            <div className="sample">사진 샘플</div>
          </div>
          <img className="thumbnail" alt={alt}/>
        </div>
        <div className="ne-bt-group">
          <button type="button" className="ne-bt2 btn-upload-image">사진 등록하기</button>
          <input type="file" accept="image/*" capture="environment" className="hidden-input-file" name="inputFileundefined" style={{display: 'none'}}/>
        </div>
      </div>
    </>
  )
}

export default PhotoRegisterDemo;