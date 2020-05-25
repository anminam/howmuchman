import React, { useEffect, useState } from 'react';
import ImageRegister from 'components/PhotoRegisterComponent';
import Camera from 'components/Camera';
import Camera2 from 'components/CameraDemo';
import PhotoRegister, { IPhotoRegister } from 'lib/core/PhotoRegister';
import PhotoRegisterMain from 'components/PhotoRegisterMain';

const init = {
    list: [
        {
            id:'adf',
            script:'이것은뭐냐',
            sampleSrc: '',
            data: ''
        },
        {
            id:'ad11f',
            script:'저것',
            sampleSrc: '',
            data: ''
        },
        {
            id:'ad11f',
            script:'요것',
            sampleSrc: '',
            data: ''
        },
    ]
}

const CameraContainer = () => {

    return (
        <div>
            {
                <PhotoRegisterMain list={init.list}/>
            }
            {/* <ImageRegister /> */}
            {/* <Camera /> */}

            <Camera2 />
        </div>
    )
}

export default CameraContainer;