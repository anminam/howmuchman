import React, { useState, useRef } from 'react';

const Camera = () => {

  const [uri, setUri] = useState('');
  const [isShow, setIsShow] = useState(true);
  const [cameraError, setCameraError] = useState('');

  const videoRef = useRef(null);

  return (
    <div>
      <video
        ref={(stream) => { stateVideoStream(stream) }}
        width='800'
        height='600'
        style={{ display: 'none' }}>
      </video>
      <canvas
        ref={(canvas) => { setCanvas(canvas) }}
        width='800'
        height='600'
        style={{ display: 'none' }}
      />
    </div>
  )
}

const stateVideoStream = (stream) => {

}
const setCanvas = (canvas) => {

}
const doSomethingWithImage = (image) => {

}

const submitPhoto = (camera) => {
  const image = camera.captureImage()
  doSomethingWithImage(image)
}

const captureImage = (canvas, videoStream) => {
  const context = canvas.getContext("2d")
  context.drawImage(videoStream, 0, 0, 800, 600)
  const image = canvas.toDataURL('image/jpeg', 0.5)
  return image
}

export default Camera;