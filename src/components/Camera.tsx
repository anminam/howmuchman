import React, { useRef, useEffect, useState } from 'react';

const Camera = () => {

  const videoEl = useRef<HTMLVideoElement>(null);
  const [errMessage, setErrorMessage] = useState<String>('');

  /**
   * 이미지 받아오기
   * @param stream 
   */
  const handleSuccess = (stream) => {
    if (null !== videoEl.current) {
      videoEl.current.srcObject = stream;
    }
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(handleSuccess)
      .catch((err) => {
        if (err.name === 'NotFoundError') {
          setErrorMessage('카메라를 찾을 수 없습니다.');
        }
      });
  }, []);


  return (
    <div>
      <video id="player" ref={videoEl} controls autoPlay />
      <p>{errMessage}</p>
    </div>
  )
}

export default Camera;