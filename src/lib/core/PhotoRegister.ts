import React from "react";
import PhotoRegisterComponent from 'components/PhotoRegisterComponent'

export interface IRegistList {
    id: string
    script: string
}
export interface IPhotoRegister {
    list:IRegistList[]
}

class PhotoRegister {

    list:IRegistList[];
    componentList:JSX.Element[] = [];

    constructor(props:IPhotoRegister) {
        this.list = props.list;

        this.list.forEach((item)=> {
            this.componentList?.push(PhotoRegisterComponent({
                alt: item.script,
                id: item.id
            }))
        });
        
    }

    getComponent(index:number):JSX.Element {
        return this.componentList[index];
    }

    getComponentList() {
        return this.componentList
    }

}

export default PhotoRegister;