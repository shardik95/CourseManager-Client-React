import * as Actions from "../actions";
import React from 'react';
import {connect} from 'react-redux'

const Heading = ({widget,preview,headingtext,headingsize,widgetNamePlace}) => {
    let inputElem;
    let selectElem;
    let widgetName;
    return(
        <div>
            <div hidden={preview}>
                <h2 style={{padding:"10px"}}>{widget.widgetType}</h2>
                <div className="form-group" style={{padding:"10px"}}>
                    <input className="form-control" ref={node=>inputElem=node} onChange={()=>headingtext(widget.id,inputElem.value)} value={widget.text} type="text" placeholder="Heading text"/>
                    <br/>
                    <select className="form-control" onChange={()=>headingsize(widget.id,selectElem.value)} ref={node=>selectElem=node} value={widget.size}>
                        <option value="1">Heading 1</option>
                        <option value="2">Heading 2</option>
                        <option value="3">Heading 3</option>
                    </select>
                    <br/>
                    <input className="form-control" placeholder="Widget Name" type="text" ref={node=>widgetName=node} onChange={()=>widgetNamePlace(widget.id,widgetName.value)} value={widget.widgetName}/>
                </div>
                <h4 style={{padding:"10px"}}>Preview</h4>
            </div>
            <div style={{padding:"10px"}}>
                {widget.size==1 && <h1>{widget.text}</h1>}
                {widget.size==2 && <h2>{widget.text}</h2>}
                {widget.size==3 && <h3>{widget.text}</h3>}
            </div>
        </div>
    )
}

const dispatchToHeadingPropsMapper = dispatch => ({
    headingtext: (id,text)=> Actions.headingText(id,text,dispatch),
    headingsize: (id,size)=> Actions.headingSize(id,size,dispatch),
    widgetNamePlace: (id,widgetname)=> Actions.widgetName(id,widgetname,dispatch)
})

export const HeadingContainer = connect(null,dispatchToHeadingPropsMapper)(Heading);