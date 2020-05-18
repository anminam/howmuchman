import React, { useRef } from 'react';

const ImageRegister = () => {

  const imgEl = useRef<HTMLImageElement>(null);

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
      <input type="file" accept="image/*" capture="camera" id="camera" onChange={onChangeImage} />
      <img id="frame" ref={imgEl} alt="img" />
    </>
  )
}

export default ImageRegister;