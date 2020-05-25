import React, { useState } from "react";
import PhotoRegisterComponent from 'components/PhotoRegisterComponent'

export interface IRegistList {
    id: string
    script: string
    sampleSrc: string
    data: string
}

export interface IPhotoRegisterMain {
  list: IRegistList[]
}

const PhotoRegisterMain = (props:IPhotoRegisterMain) => {

  const [list] = useState<IRegistList[]>(props.list);

  return (
    <>
      {list && list.map((item, i) => {
        return <PhotoRegisterComponent key={i} id={item.id} alt={item.script} />
      })}
    </>
  )
}

export default PhotoRegisterMain;