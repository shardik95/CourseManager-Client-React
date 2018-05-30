import React from 'react';
import {connect} from 'react-redux';
import ToggleButton from 'react-toggle-button'

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
        //console.log(this.props.results)
        return(
            <div>
                <div className="row float-right" style={{marginRight:"10px",marginTop:"10px"}}>
                    <button style={{marginRight:"5px"}} className="btn-success btn" hidden={this.props.previewMode} onClick={()=>{this.props.save(this.props.topicId)}} >Save</button>
                    <ToggleButton onClick={()=>{this.props.preview(this.props.topicId,this.props.previewMode)}} value={this.props.previewMode}/>
                </div>
                <br/>
                <div style={{marginTop:"40px"}} className="container-fluid">
                    <div>
                        {this.props.widgets.map(
                            widget => (
                                <div>
                                <WidgetCont key={widget.id} widget={widget} topicId={this.props.topicId} preview={this.props.previewMode} length={this.props.widgets.length} results={this.props.results}/>
                                </div>
                            )
                        )}
                    </div>
                    <button hidden={this.props.previewMode} className="btn float-right" style={{background:'#ea2a2a',marginTop:"10px",marginBottom:"20px"}} onClick={()=>{this.props.add(this.props.topicId)}}><i className="fa fa-plus-circle"></i></button>
                </div>
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
        previewMode:state.preview,
        results:state.results
    }
)

export const WidgetContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(WidgetList);