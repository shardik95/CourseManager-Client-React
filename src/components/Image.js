import * as Actions from "../actions";
import React from 'react';
import {connect} from 'react-redux'

const Image = ({widget,preview,imgurl,widgetNamePlace}) =>{
    let imageUrlElem;
    let widgetName;
    return (
        <div>
            <div hidden={preview}>
                <input type="text" placeholder="Link Url" onChange={()=>imgurl(widget.id,imageUrlElem.value)} ref={node=>imageUrlElem=node} value={widget.imageUrl}/><br/>
                <input placeholder="Widget Name" type="text" ref={node=>widgetName=node} onChange={()=>widgetNamePlace(widget.id,widgetName.value)} value={widget.widgetName}/><br/>
            </div>
            {widget.widgetType==='Image'&&<img src={widget.imageUrl} style={{width:"300px",height:"200px"}}/>}
        </div>

    )
}


const dispatchToImagePropsMapper = dispatch => ({
    imgurl: (id,url)=>Actions.imgurl(id,url,dispatch),
    widgetNamePlace: (id,widgetname)=> Actions.widgetName(id,widgetname,dispatch)
})


export const ImageContainer= connect(null,dispatchToImagePropsMapper)(Image);
