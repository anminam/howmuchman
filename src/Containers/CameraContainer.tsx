import React from 'react';
import ImageRegister from 'components/ImageRegister';
import Camera from 'components/Camera';
import Camera2 from 'components/Camera2';

const CameraContainer = () => {
    return (
        <div>
            <ImageRegister />
            {/* <Camera /> */}
            <Camera2 />
        </div>
    )
}

export default CameraContainer;