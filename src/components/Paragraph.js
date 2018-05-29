import * as Actions from "../actions";
import React from 'react';
import {connect} from 'react-redux'

const Paragraph = ({widget,preview,paragraphtext,widgetNamePlace})=> {

    let textareaElem;
    let widgetName;
    return (
        <div>
            <div hidden={preview}>
                <h1>{widget.widgetType}</h1>
                <div className="form-group">
                    <textarea className="form-control" onChange={()=>paragraphtext(widget.id,textareaElem.value)} ref={node=>textareaElem=node} value={widget.paragraphText}/><br/>
                    <input className="form-control" placeholder="Widget Name" type="text" ref={node=>widgetName=node} onChange={()=>widgetNamePlace(widget.id,widgetName.value)} value={widget.widgetName}/>
                </div>
                <h4>Preview</h4>
            </div>
            {widget.widgetType==='Paragraph'&&<p>{widget.paragraphText}</p>}
        </div>

    )}

const dispatchToParagraphPropsMapper = dispatch => ({
    paragraphtext:(id,text)=>Actions.paragraphtext(id,text,dispatch),
    widgetNamePlace: (id,widgetname)=> Actions.widgetName(id,widgetname,dispatch)
})

export const ParagraphContainer = connect(null,dispatchToParagraphPropsMapper)(Paragraph);