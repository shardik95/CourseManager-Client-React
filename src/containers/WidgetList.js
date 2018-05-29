import React from 'react';
import {connect} from 'react-redux';

import * as Constants from '../constants';

const Paragraph = ({widget,preview,dispatch})=> {

    let textareaElem;
    let widgetName;
    return (
        <div>
            <div hidden={preview}>
                <textarea onChange={()=>dispatch({
                    type:Constants.PARAGRAPH_TEXT,
                    id:widget.id,
                    paragraphText:textareaElem.value
                })} ref={node=>textareaElem=node} value={widget.paragraphText}/><br/>
                <input placeholder="Widget Name" type="text" ref={node=>widgetName=node} onChange={()=>dispatch(
                    {
                        type:Constants.WIDGET_NAME,
                        id:widget.id,
                        widgetName:widgetName.value
                    }
                )} value={widget.widgetName}/>
            </div>
            {widget.widgetType==='Paragraph'&&<p>{widget.paragraphText}</p>}
        </div>

    )}

const List = ({widget,preview,dispatch})=>{
    let listtext;
    let listType;
    let widgetName;
    return (
        <div>
            <div hidden={preview}>
                <textarea onChange={()=>dispatch({
                    type:Constants.LIST_TEXT,
                    id:widget.id,
                    listText:listtext.value
                })} ref={node=>listtext=node} value={widget.listText} placeholder="Put each item in a separate row"/><br/>
                <select ref={node=>listType=node} value={widget.listType} onChange={()=>dispatch({
                    type:Constants.LIST_TYPE,
                    id:widget.id,
                    listType:listType.value
                })}>
                    <option>Ordered List</option>
                    <option>Unordered List</option>
                </select>
                <input placeholder="Widget Name" type="text" ref={node=>widgetName=node} onChange={()=>dispatch(
                    {
                        type:Constants.WIDGET_NAME,
                        id:widget.id,
                        widgetName:widgetName.value
                    }
                )} value={widget.widgetName}/><br/>
            </div>
            {widget.listType==='Ordered List' && <OrderedList key={widget.id} list={widget.listText}/>}
            {widget.listType==='Unordered List' && <UnorderedList key={widget.id} list={widget.listText}/>}
        </div>
    )

}

const UnorderedList = ({list})=>{
    let i=0;
    return (
        <div>
            <ul>
                {list.split("\n").map((listitem)=>(
                    <li key={i=i+1}>{listitem}</li>
                ))}
            </ul>
        </div>
    )
}



const OrderedList = ({list})=>{
    let i=0;
    return (
        <div>
            <ol>
                {list.split("\n").map((listitem)=>(
                    <li key={i=i+1}>{listitem}</li>
                ))}
            </ol>
        </div>
    )
}

const Image = ({widget,preview,dispatch}) =>{
    let imageUrlElem;
    let widgetName;
    return (
        <div>
            <div hidden={preview}>
                <input type="text" placeholder="Link Url" onChange={()=>dispatch(
                    {
                        type:Constants.IMAGE_URL,
                        id:widget.id,
                        imageUrl:imageUrlElem.value
                    }
                )} ref={node=>imageUrlElem=node} value={widget.imageUrl}/><br/>
                <input placeholder="Widget Name" type="text" ref={node=>widgetName=node} onChange={()=>dispatch(
                    {
                        type:Constants.WIDGET_NAME,
                        id:widget.id,
                        widgetName:widgetName.value
                    }
                )} value={widget.widgetName}/><br/>
            </div>
            {widget.widgetType==='Image'&&<img src={widget.imageUrl} style={{width:"300px",height:"200px"}}/>}
        </div>

    )
}

const Heading = ({widget,preview,dispatch}) => {
    let inputElem;
    let selectElem;
    let widgetName;
    return(
        <div>
            <div hidden={preview}>
                <input ref={node=>inputElem=node} onChange={()=>dispatch({
                    type:Constants.HEADING_TEXT,
                    id:widget.id,
                    text:inputElem.value
                })} value={widget.text} type="text" placeholder="Heading text"/>
                <select onChange={()=>dispatch({
                    type:Constants.HEADING_SIZE,
                    id:widget.id,
                    size:selectElem.value
                })} ref={node=>selectElem=node} value={widget.size}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
                <input placeholder="Widget Name" type="text" ref={node=>widgetName=node} onChange={()=>dispatch(
                    {
                        type:Constants.WIDGET_NAME,
                        id:widget.id,
                        widgetName:widgetName.value
                    }
                )} value={widget.widgetName}/>
            </div>
            {widget.size==1 && <h1>{widget.text}</h1>}
            {widget.size==2 && <h2>{widget.text}</h2>}
            {widget.size==3 && <h3>{widget.text}</h3>}
        </div>
    )
}

const Link = ({widget,preview,dispatch}) =>{
    let widgetName;
    let urlName;
    let urlText;
    return(
        <div>
            <div hidden={preview}>
                <input type="text" placeholder="Link Url" onChange={()=>dispatch(
                    {
                        type:Constants.LINK_URL,
                        id:widget.id,
                        linkUrl:urlName.value
                    }
                )} ref={node=>urlName=node} value={widget.linkUrl} /><br/>
                <input type="text" placeholder="Link Text"  onChange={()=>dispatch(
                    {
                        type:Constants.LINK_TEXT,
                        id:widget.id,
                        linkText:urlText.value
                    }
                )} ref={node=>urlText=node} value={widget.linkText}/><br/>
                <input placeholder="Widget Name" type="text" value={widget.linkText} onChange={()=>dispatch(
                    {
                        type:Constants.WIDGET_NAME,
                        id:widget.id,
                        widgetName:widgetName.value
                    }
                )}ref={node=>widgetName=node} value={widget.widgetName}/>
            <br/>
            </div>
            {widget.widgetType==='Link' && <a href={widget.linkUrl}>{widget.linkText}</a>}
        </div>
    )
}
const HeadingContainer = connect()(Heading);
const ParagraphContainer = connect()(Paragraph);
const LinkContainer = connect()(Link);
const ImageContainer= connect()(Image);
const ListContainer = connect()(List);

export const Widget = ({widget,topicId,preview,length,dispatch}) => {
    let selectElem
    return (
        <li>
            <div hidden={preview}>
                <h1>{widget.widgetType}</h1>
                <br/>
                <select value={widget.widgetType} onChange={()=>dispatch({
                    type:Constants.SELECT_WIDGET,
                    id:widget.id,
                    topicId:topicId,
                    widgetType:selectElem.value
                })} ref={node=>selectElem=node}>
                            <option>Heading</option>
                            <option>Paragraph</option>
                            <option>List</option>
                            <option>Image</option>
                            <option>Link</option>
                </select>
                <button onClick={() => {
                    dispatch({type: Constants.DELETE, id: widget.id, topicId: topicId,orderWidget:widget.orderWidget})
                }}>Delete Widget
                </button>&nbsp;
                <button hidden={widget.orderWidget===1} onClick={()=>dispatch(
                    {
                        type:Constants.UP,
                        id:widget.id,
                        topicId:topicId,
                        orderWidget:widget.orderWidget
                    }
                )}>Up</button>&nbsp;
                <button hidden={widget.orderWidget===length} onClick={()=>dispatch(
                {
                    type:Constants.DOWN,
                    id:widget.id,
                    topicId:topicId,
                    orderWidget:widget.orderWidget
                }
                )}>Down</button>
            </div>
            {widget.widgetType==='Heading' && <HeadingContainer widget={widget} preview={preview}/>}
            {widget.widgetType==='Paragraph' && <ParagraphContainer widget={widget} preview={preview}/>}
            {widget.widgetType==='List' && <ListContainer widget={widget} preview={preview}/>}
            {widget.widgetType==='Image' && <ImageContainer widget={widget} preview={preview}/>}
            {widget.widgetType==='Link' && <LinkContainer widget={widget} preview={preview}/>}
    </li>
    )
}

const WidgetCont= connect()(Widget);


class WidgetList extends React.Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
    }

    componentWillReceiveProps(newProps){
        if(newProps.topicId!==this.props.topicId){
            this.props.findWidgetsForTopic(newProps.topicId);
        }
    }

    render(){
        return(
            <div>
                <br/>
                <h2>Widget List {this.props.widgets.length}</h2>
                <button hidden={this.props.previewMode} onClick={()=>{this.props.save(this.props.topicId)}} >Save</button>
                <button onClick={()=>{this.props.preview(this.props.topicId,this.props.previewMode)}}>Preview</button>
                <ul>
                    {this.props.widgets.map(
                        widget => (
                            <div>
                            <WidgetCont key={widget.id} widget={widget} topicId={this.props.topicId} preview={this.props.previewMode} length={this.props.widgets.length}/>
                            </div>
                        )
                    )}
                </ul>
                <button onClick={()=>{this.props.add(this.props.topicId)}}>Add Widget</button>
            </div>
        )
    }

}

const findWidgetsForTopic = (topicId,dispatch) => (
    fetch("http://localhost:8080/api/topic/TID/widget".replace("TID",topicId))
        .then(response => (response.json()))
        .then(widgets => (dispatch(
            {type:'FIND_WIDGETS_TOPIC',
                widgets:widgets,topicId:topicId}
        )))
)

const save = (topicId,dispatch) =>(
    dispatch({type:Constants.SAVE,topicId:topicId})
)

const add = (topicId,dispatch) => (
    dispatch({type:Constants.ADD,topicId:topicId})
)

const preview = (topicId,preview,dispatch) => (
    dispatch({type:Constants.PREVIEW,topicId:topicId,preview:preview})
)

const dispatchToPropsMapper =(dispatch)=>({
    findWidgetsForTopic: (topicId) => findWidgetsForTopic(topicId,dispatch),
    save: (topicId)=> save(topicId,dispatch),
    add: (topicId) => add(topicId,dispatch),
    preview: (topicId,previewMode) => preview(topicId,previewMode,dispatch)
})

const stateToPropsMapper = state => (
    {
        widgets:state.widgets,
        previewMode:state.preview
    }
)

export const WidgetContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(WidgetList);