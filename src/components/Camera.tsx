import React, {useState} from 'react';

const Camera = () => {

    const [canvas, setCanvas] = useState();
    const [videoStream, stateVideoStream] = useState<HTMLVideoElement | null>(null);

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