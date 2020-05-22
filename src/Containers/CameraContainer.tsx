import React from 'react';
import ImageRegister from 'components/PhotoRegisterDemo';
import Camera from 'components/Camera';
import Camera2 from 'components/CameraDemo';

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