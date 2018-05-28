import React from 'react';
import {WidgetContainer} from "./WidgetList";
import {Provider} from 'react-redux';
import {createStore} from 'redux';


class TopicEditor extends React.Component{

    constructor(props){
        super(props);
        this.state={
            courseId:"",
            moduleId:"",
            lessonId:"",
            topicId:""
        }
        this.setCourseId=this.setCourseId.bind(this);
        this.setModuleId=this.setModuleId.bind(this);
        this.setLessonId=this.setLessonId.bind(this);
        this.setTopicId=this.setTopicId.bind(this);
    }

    componentDidMount(){
        this.setCourseId(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
        this.setLessonId(this.props.match.params.lessonId);
        this.setTopicId(this.props.match.params.topicId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.match.params.courseId);
        this.setModuleId(newProps.match.params.moduleId);
        this.setLessonId(newProps.match.params.lessonId);
        this.setTopicId(newProps.match.params.topicId);
    }

    setTopicId(topicId){
        this.setState({topicId:topicId})
    }

    setCourseId(courseId){
        this.setState({courseId:courseId});
    }

    setModuleId(moduleId){
        this.setState({moduleId:moduleId});
    }

    setLessonId(lessonId){
        this.setState({lessonId:lessonId})
    }



    render(){

        return(
            <Provider store={store}>

                <WidgetContainer courseId={this.state.courseId}
                moduleId={this.state.moduleId}
                lessonId={this.state.moduleId}
                topicId={this.state.topicId}
                />
            </Provider>
        )
    }
}

const WidgetReducer = (state={
    widgets:[],topicId:""}, action)=>{
    switch (action.type){

        case 'FIND_WIDGETS_TOPIC':return{
            widgets:action.widgets,
            topicId:action.topicId
        }


        case 'ADD':return {
            widgets:[...state.widgets,
                {
                    text:'New Widget',
                    topicId:action.topicId,
                    widgetId:state.widgets.length+1
                }
            ],
            topicId:action.topicId
        }

        case 'DELETE': return {
            widgets: state.widgets.filter(widget=>(
                widget.id !== action.widgetId
            )),
            topicId:action.topicId
        }

        case 'SAVE': fetch('http://localhost:8080/api/topic/TID/widget/save'.replace('TID',action.topicId),{
            method:'POST',
            body:JSON.stringify(state.widgets),
            headers:{
                'content-type': 'application/json'
            }
        })
            return state;

        default: return state;
    }
}

const store =createStore(WidgetReducer);


export default TopicEditor;