import React, { useRef } from 'react';

const Camera = () => {

  const imgEl = useRef<HTMLImageElement>(null);

  const onChangeCamera = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
      <input type="file" accept="image/*" capture="camera" id="camera" onChange={onChangeCamera} />
      <img id="frame" ref={imgEl} alt="img" />
    </>
  )
}

export default Camera;