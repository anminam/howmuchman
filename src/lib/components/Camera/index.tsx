import React, {useState, useRef} from 'react';

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
           style={{display: 'none'}}>
         </video>
         <canvas
           ref={(canvas) => { setCanvas(canvas) }}
           width='800'
           height='600'
           style={{display: 'none'}}
         />
       </div>
    ) 
}

const submitPhoto = () => {
    const image = this.camera.captureImage()
    doSomethingWithImage(image)
}

const captureImage = () => {
    const context = this.canvas.getContext("2d")
    context.drawImage(this.videoStream, 0, 0, 800, 600)
    const image = this.canvas.toDataURL('image/jpeg', 0.5)
    return image
}

export default Camera;