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
                <input ref={node=>inputElem=node} onChange={()=>headingtext(widget.id,inputElem.value)} value={widget.text} type="text" placeholder="Heading text"/>
                <select onChange={()=>headingsize(widget.id,selectElem.value)} ref={node=>selectElem=node} value={widget.size}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
                <input placeholder="Widget Name" type="text" ref={node=>widgetName=node} onChange={()=>widgetNamePlace(widget.id,widgetName.value)} value={widget.widgetName}/>
            </div>
            {widget.size==1 && <h1>{widget.text}</h1>}
            {widget.size==2 && <h2>{widget.text}</h2>}
            {widget.size==3 && <h3>{widget.text}</h3>}
        </div>
    )
}

const dispatchToHeadingPropsMapper = dispatch => ({
    headingtext: (id,text)=> Actions.headingText(id,text,dispatch),
    headingsize: (id,size)=> Actions.headingSize(id,size,dispatch),
    widgetNamePlace: (id,widgetname)=> Actions.widgetName(id,widgetname,dispatch)
})

export const HeadingContainer = connect(null,dispatchToHeadingPropsMapper)(Heading);