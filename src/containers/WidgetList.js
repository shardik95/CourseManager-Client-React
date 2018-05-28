import React from 'react';
import {connect} from 'react-redux';

export const Widget = ({widget,topicId,dispatch}) =>(
    <li>{widget.text}
        <button onClick={()=>{
            dispatch({type:'DELETE',widgetId:widget.id,topicId:topicId})
        }}>Delete Widget</button>
    </li>
)

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