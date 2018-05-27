import React from 'react';
import TopicService from "../services/TopicService";
import TopicPillItem from "../components/TopicPillItem";

class TopicPills extends React.Component{

    constructor(props){
        super(props);
        this.state={
            courseId:"",
            moduleId:"",
            lessonId:"",
            topic:{title:""},
            topics:[]
        }
        this.setCourseId=this.setCourseId.bind(this);
        this.setModuleId=this.setModuleId.bind(this);
        this.setLessonId=this.setLessonId.bind(this);
        this.titleChanged=this.titleChanged.bind(this);
        this.createTopic=this.createTopic.bind(this);
        this.findAllTopicsForLesson=this.findAllTopicsForLesson.bind(this);
        this.setTopics=this.setTopics.bind(this);
        this.deleteTopic=this.deleteTopic.bind(this);
        this.topicService=TopicService.instance;
    }

    componentDidMount(){
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lessonId);
        this.findAllTopicsForLesson(newProps.courseId,newProps.moduleId,newProps.lessonId);
    }

    findAllTopicsForLesson(courseId,moduleId,lessonId){
        this.topicService.findAllTopicsForLesson(courseId,moduleId,lessonId)
            .then((topics)=>{this.setTopics(topics)
            })
    }

    setTopics(topics){
        this.setState({topics:topics})
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

    titleChanged(event){
        this.setState({topic:{title:event.target.value}});
    }

    renderTopics(){
        return this.state.topics.map((topic)=>{
            return <TopicPillItem topic={topic} key={topic.id} delete={this.deleteTopic} courseid={this.state.courseId}
            lessonid={this.state.lessonId} moduleid={this.state.moduleId}/>
        })
    }

    deleteTopic(topicId){
        return this.topicService.deleteTopic(topicId)
            .then(()=>{
                return this.findAllTopicsForLesson(this.state.courseId,this.state.moduleId,this.state.lessonId);
            })
    }

    createTopic(){
        if(this.state.topic.title==""){
            var topic={
                title:"New topic"
            };
            return this.topicService.createTopic(this.state.courseId, this.state.moduleId,this.state.lessonId,topic)
                .then(() => {
                    return this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId,this.state.lessonId);
                })
        }
        else {
            return this.topicService.createTopic(this.state.courseId, this.state.moduleId,this.state.lessonId, this.state.topic)
                .then(() => {
                    return this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId,this.state.lessonId);
                })
        }
    }

    render(){
        return(
            <ul className="nav nav-pills flex-column flex-sm-row">
                {this.renderTopics()}
                <li className="nav-item" style={{marginLeft:"5px"}}>
                    <div className="row">
                        <div className="col-10" style={{paddingRight:"0px"}}>
                            <input type="text" placeholder="Topic 1" className="form-control navbar-right" onChange={this.titleChanged}/>
                        </div>
                        <div className="col-2" style={{paddingLeft:"0px"}}>
                            <button className="btn" type="button" onClick={this.createTopic}>
                                <i className="fa fa-lg fa-plus"></i></button>
                        </div>
                    </div>
                </li>

            </ul>
        )
    }

}

export default TopicPills;