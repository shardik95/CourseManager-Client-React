import React from 'react';
import {connect} from 'react-redux';

const Paragraph = ()=>(
    <div>
        <h1>Paragraph</h1>
        <textarea></textarea>
    </div>
)

const List = ()=>(
    <h1>List</h1>
)

const Image = () =>(
    <h1>Image</h1>
)

const Heading = ({widget,dispatch}) => {
    let inputElem;
    let selectElem;
    return(
        <div>
            <input ref={node=>inputElem=node} onChange={()=>dispatch({
                type:'HEADING_TEXT',
                id:widget.id,
                text:inputElem.value
            })} value={widget.text} type="text"/>
            <select onChange={()=>dispatch({
                type:'HEADING_SIZE',
                id:widget.id,
                size:selectElem.value
            })} ref={node=>selectElem=node} value={widget.size}>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
            </select>
            {widget.size==1 && <h1>{widget.text}</h1>}
            {widget.size==2 && <h2>{widget.text}</h2>}
            {widget.size==3 && <h3>{widget.text}</h3>}
        </div>
    )
}

const Link = () =>(
    <h1>Link</h1>
)

const HeadingContainer = connect()(Heading);

export const Widget = ({widget,topicId,dispatch}) => {
    let selectElem
    return (
        <li>{widget.widgetType}
            <select value={widget.widgetType} onChange={()=>dispatch({
                type:'SELECT_WIDGET',
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
                dispatch({type: 'DELETE', id: widget.id, topicId: topicId})
            }}>Delete Widget
            </button>
            {widget.widgetType==='Heading' && <HeadingContainer widget={widget}/>}
            {widget.widgetType==='Paragraph' && <Paragraph/>}
            {widget.widgetType==='List' && <List/>}
            {widget.widgetType==='Image' && <Image/>}
            {widget.widgetType==='Link' && <Link/>}
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
                <button onClick={()=>{this.props.save(this.props.topicId)}} >Save</button>
                <ul>
                    {this.props.widgets.map(
                        widget => (
                            <div>
                            <WidgetCont key={widget.id} widget={widget} topicId={this.props.topicId}/>
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
    dispatch({type:"SAVE",topicId:topicId})
)

const add = (topicId,dispatch) => (
    dispatch({type:'ADD',topicId:topicId})
)

const dispatchToPropsMapper =(dispatch)=>({
    findWidgetsForTopic: (topicId) => findWidgetsForTopic(topicId,dispatch),
    save: (topicId)=> save(topicId,dispatch),
    add: (topicId) => add(topicId,dispatch)
})

const stateToPropsMapper = state => (
    {
        widgets:state.widgets,
    }
)

export const WidgetContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(WidgetList);