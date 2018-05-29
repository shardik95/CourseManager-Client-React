import React from 'react';
import {connect} from 'react-redux';

import * as Actions from '../actions';
import {WidgetCont} from "../components/Widget";



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

const dispatchToPropsMapper =(dispatch)=>({
    findWidgetsForTopic: (topicId) => Actions.findWidgetsForTopic(topicId,dispatch),
    save: (topicId)=> Actions.save(topicId,dispatch),
    add: (topicId) => Actions.add(topicId,dispatch),
    preview: (topicId,previewMode) => Actions.preview(topicId,previewMode,dispatch)
})

const stateToPropsMapper = state => (
    {
        widgets:state.widgets,
        previewMode:state.preview
    }
)

export const WidgetContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(WidgetList);