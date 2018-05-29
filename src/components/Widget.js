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
        <div className="border" style={{marginBottom:"15px"}}>
            <div hidden={preview}>

                <div className="float-right" style={{padding:"7px"}}>
                    <button className="btn" hidden={widget.orderWidget===1 || widget.orderWidget===0 } onClick={()=>up(widget.id,topicId,widget.orderWidget)} style={{background:"#ffd232"}}>
                        <i className="fa fa-arrow-up"></i></button>&nbsp;
                    <button className="btn" hidden={widget.orderWidget===length || widget.orderWidget===0} onClick={()=>down(widget.id,topicId,widget.orderWidget)} style={{background:"#ffd232"}}>
                        <i className="fa fa-arrow-down"></i></button>
                    <select value={widget.widgetType} onChange={()=>selectWidget(widget.id,topicId,selectElem.value)} ref={node=>selectElem=node}
                    style={{marginRight:"8px",marginLeft:"8px"}}
                    >
                        <option>Heading</option>
                        <option>Paragraph</option>
                        <option>List</option>
                        <option>Image</option>
                        <option>Link</option>
                    </select>
                    <button className="btn" style={{background:'#ea2a2a'}} onClick={()=>deleteWidget(widget.id,topicId,widget.orderWidget)}><i className="fa fa-times"></i>
                    </button>
                </div>
            </div>
            {widget.widgetType==='Heading' && <HeadingContainer widget={widget} preview={preview}/>}
            {widget.widgetType==='Paragraph' && <ParagraphContainer widget={widget} preview={preview}/>}
            {widget.widgetType==='List' && <ListContainer widget={widget} preview={preview}/>}
            {widget.widgetType==='Image' && <ImageContainer widget={widget} preview={preview}/>}
            {widget.widgetType==='Link' && <LinkContainer widget={widget} preview={preview}/>}
        </div>
    )
}

const dispatchTopropsMapper = (dispatch) =>({
    selectWidget: (id,topicId,widgetType) => Actions.selectWidget(id,topicId,widgetType,dispatch),
    up: (id,topicId,orderWidget) => Actions.up(id,topicId,orderWidget,dispatch),
    down:(id,topicId,orderWidget) => Actions.down(id,topicId,orderWidget,dispatch),
    deleteWidget: (id,topicId,orderWidget) => Actions.deleteWidget(id,topicId,orderWidget,dispatch)
})


export const WidgetCont= connect(null,dispatchTopropsMapper)(Widget);
