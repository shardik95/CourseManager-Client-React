import React from 'react';
import LessonServiceClient from "../services/LessonServiceClient";
import LessonTabItem from "../components/LessonTabItem";

class LessonTabs extends React.Component{

    constructor(props){
        super(props);
        this.state={
            moduleId:'',
            courseId:'',
            lessons:[],
            lesson:{title:""}
        }
        this.setModuleId=this.setModuleId.bind(this);
        this.findAllLessonsForCourse=this.findAllLessonsForCourse.bind(this);
        this.setLessons=this.setLessons.bind(this);
        this.renderLessons=this.renderLessons.bind(this);
        this.titleChanged=this.titleChanged.bind(this);
        this.createLesson=this.createLesson.bind(this);
        this.delete=this.delete.bind(this);
        this.LessonServiceClient=LessonServiceClient.instance;
    }

    componentDidMount(){
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
    }

    findAllLessonsForCourse(courseId,moduleId){
        this.LessonServiceClient.findAllLessonsForCourse(courseId,moduleId)
            .then((lessons)=>{this.setLessons(lessons)
            })
    }

    setLessons(lessons){
        this.setState({lessons:lessons});
    }

    setCourseId(courseId){
        this.setState({courseId:courseId});
    }

    setModuleId(moduleId){
        this.setState({moduleId:moduleId});
    }

    delete(lessonId){
        this.LessonServiceClient.deleteLesson(lessonId)
            .then(()=>{
                return this.findAllLessonsForCourse(this.state.courseId,this.state.moduleId);
            })
    }

    renderLessons(){
        return this.state.lessons.map((lesson)=>{
            return <LessonTabItem lesson={lesson} key={lesson.id} delete={this.delete}
                                  moduleId={this.state.moduleId} courseId={this.state.courseId}/>
        })
    }

    componentWillReceiveProps(newProps){
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.findAllLessonsForCourse(newProps.courseId,newProps.moduleId);
    }

    titleChanged(event){
        this.setState({lesson:{title:event.target.value}});
    }

    createLesson(){
        if(this.state.lesson.title==""){
            var lesson={
                title:"New Lesson"
            };
            return this.LessonServiceClient.createLesson(this.state.courseId, this.state.moduleId,lesson)
                .then(() => {
                    return this.findAllLessonsForCourse(this.state.courseId, this.state.moduleId);
                })
        }
        else {
            return this.LessonServiceClient.createLesson(this.state.courseId, this.state.moduleId, this.state.lesson)
                .then(() => {
                    return this.findAllLessonsForCourse(this.state.courseId, this.state.moduleId);
                })
        }
    }

    render(){
        return(
            <div className="row">
                <div className="container-fluid">
                    <nav className="navbar navbar-dark bg-dark navbar-expand" style={{height:"56px",paddingRight:"0px"}}>
                         <ul className="navbar-nav">
                            {this.renderLessons()}
                             <li className="nav-item"><input type="text" placeholder="Lesson 1"
                                                             className="form-control navbar-right" onChange={this.titleChanged}/></li>
                             &nbsp;
                             <li className="nav-item"><button className="btn btn-dark navbar-right" type="button" onClick={this.createLesson}><i className="fa fa-plus" ></i></button></li>
                         </ul>
                    </nav>
                </div>
            </div>

        )
    };

}

export default LessonTabs;