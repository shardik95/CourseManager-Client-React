import * as Actions from "../actions";
import React from 'react';
import {connect} from 'react-redux'

const Image = ({widget,preview,imgurl,widgetNamePlace}) =>{
    let imageUrlElem;
    let widgetName;
    return (
        <div>
            <div hidden={preview}>
                <h2 style={{padding:"10px"}}>{widget.widgetType}</h2>
                <div className="form-group" style={{padding:"10px"}}>
                    <input className="form-control" type="text" placeholder="Link Url" onChange={()=>imgurl(widget.id,imageUrlElem.value)} ref={node=>imageUrlElem=node} value={widget.imageUrl}/><br/>
                    <input className="form-control" placeholder="Widget Name" type="text" ref={node=>widgetName=node} onChange={()=>widgetNamePlace(widget.id,widgetName.value)} value={widget.widgetName}/><br/>
                </div>
                    <h4 style={{padding:"10px"}}>Preview</h4>
            </div>
            <div style={{padding:"10px"}}>
             {widget.widgetType==='Image'&&<img src={widget.imageUrl} style={{width:"300px",height:"200px"}}/>}
            </div>
        </div>

    )
}


const dispatchToImagePropsMapper = dispatch => ({
    imgurl: (id,url)=>Actions.imgurl(id,url,dispatch),
    widgetNamePlace: (id,widgetname)=> Actions.widgetName(id,widgetname,dispatch)
})


export const ImageContainer= connect(null,dispatchToImagePropsMapper)(Image);
