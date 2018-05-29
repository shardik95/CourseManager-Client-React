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
                <input type="text" placeholder="Link Url" onChange={()=>linkurl(widget.id,urlName.value)} ref={node=>urlName=node} value={widget.linkUrl} /><br/>
                <input type="text" placeholder="Link Text"  onChange={()=>linktext(widget.id,urlText.value)} ref={node=>urlText=node} value={widget.linkText}/><br/>
                <input placeholder="Widget Name" type="text" value={widget.linkText}  onChange={()=>widgetNamePlace(widget.id,widgetName.value)} ref={node=>widgetName=node} value={widget.widgetName}/>
                <br/>
            </div>
            {widget.widgetType==='Link' && <a href={widget.linkUrl}>{widget.linkText}</a>}
        </div>
    )
}


const dispatchToLinkPropsMapper = dispatch => ({
    linktext: (id,text)=>Actions.linktext(id,text,dispatch),
    linkurl: (id,url)=>Actions.linkurl(id,url,dispatch),
    widgetNamePlace: (id,widgetname)=> Actions.widgetName(id,widgetname,dispatch)
})

export const LinkContainer = connect(null,dispatchToLinkPropsMapper)(Link);
