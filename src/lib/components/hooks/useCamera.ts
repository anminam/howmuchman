import {useState, useEffect} from 'react';

const useCamera = (videoRef) => {

    const [videoStrem, setVideoStrem] = useState(null);

    useEffect(() => {
        if(videoRef && videoRef) {
            videoRef
        }
    }, [videoRef])

}

export {useCamera}