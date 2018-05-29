import React from 'react';
import {connect} from 'react-redux';

import * as Actions from '../actions';
import {HeadingContainer} from "./Heading";
import {ParagraphContainer} from "./Paragraph";
import {LinkContainer} from "./Link";
import {ListContainer} from "./List";
import {ImageContainer} from "./Image";


export const Widget = ({widget,topicId,preview,length,selectWidget,up,down,deleteWidget}) => {
    let selectElem
    return (
        <li>
            <div hidden={preview}>
                <h1>{widget.widgetType}</h1>
                <br/>
                <select value={widget.widgetType} onChange={()=>selectWidget(widget.id,topicId,selectElem.value)} ref={node=>selectElem=node}>
                    <option>Heading</option>
                    <option>Paragraph</option>
                    <option>List</option>
                    <option>Image</option>
                    <option>Link</option>
                </select>
                <button onClick={()=>deleteWidget(widget.id,topicId,widget.orderWidget)}>Delete Widget
                </button>&nbsp;
                <button hidden={widget.orderWidget===1} onClick={()=>up(widget.id,topicId,widget.orderWidget)}>Up</button>&nbsp;
                <button hidden={widget.orderWidget===length} onClick={()=>down(widget.id,topicId,widget.orderWidget)}>Down</button>
            </div>
            {widget.widgetType==='Heading' && <HeadingContainer widget={widget} preview={preview}/>}
            {widget.widgetType==='Paragraph' && <ParagraphContainer widget={widget} preview={preview}/>}
            {widget.widgetType==='List' && <ListContainer widget={widget} preview={preview}/>}
            {widget.widgetType==='Image' && <ImageContainer widget={widget} preview={preview}/>}
            {widget.widgetType==='Link' && <LinkContainer widget={widget} preview={preview}/>}
        </li>
    )
}

const dispatchTopropsMapper = (dispatch) =>({
    selectWidget: (id,topicId,widgetType) => Actions.selectWidget(id,topicId,widgetType,dispatch),
    up: (id,topicId,orderWidget) => Actions.up(id,topicId,orderWidget,dispatch),
    down:(id,topicId,orderWidget) => Actions.down(id,topicId,orderWidget,dispatch),
    deleteWidget: (id,topicId,orderWidget) => Actions.deleteWidget(id,topicId,orderWidget,dispatch)
})


export const WidgetCont= connect(null,dispatchTopropsMapper)(Widget);
