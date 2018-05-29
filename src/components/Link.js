import * as Actions from "../actions";
import React from 'react';
import {connect} from 'react-redux'

const Link = ({widget,preview,linktext,linkurl,widgetNamePlace}) =>{
    let widgetName;
    let urlName;
    let urlText;
    return(
        <div>
            <div hidden={preview}>
                <h2 style={{padding:"10px"}}>{widget.widgetType}</h2>
                <div className="form-group" style={{padding:"10px"}}>
                    <input className="form-control" type="text" placeholder="Link Url" onChange={()=>linkurl(widget.id,urlName.value)} ref={node=>urlName=node} value={widget.linkUrl} /><br/>
                    <input className="form-control" type="text" placeholder="Link Text"  onChange={()=>linktext(widget.id,urlText.value)} ref={node=>urlText=node} value={widget.linkText}/><br/>
                    <input className="form-control" placeholder="Widget Name" type="text" value={widget.linkText}  onChange={()=>widgetNamePlace(widget.id,widgetName.value)} ref={node=>widgetName=node} value={widget.widgetName}/>
                    <br/>
                </div>
                <h4 style={{padding:"10px"}}>Preview</h4>
            </div>
            <div style={{padding:"10px"}}>
            {widget.widgetType==='Link' && <a href={widget.linkUrl}>{widget.linkText}</a>}
            </div>
        </div>
    )
}


const dispatchToLinkPropsMapper = dispatch => ({
    linktext: (id,text)=>Actions.linktext(id,text,dispatch),
    linkurl: (id,url)=>Actions.linkurl(id,url,dispatch),
    widgetNamePlace: (id,widgetname)=> Actions.widgetName(id,widgetname,dispatch)
})

export const LinkContainer = connect(null,dispatchToLinkPropsMapper)(Link);
