import React from 'react';
import ModuleList from "./ModuleList";
import CourseService from "../services/CourseService";

class CourseEditor extends React.Component{

    constructor(props){
        super(props);
        this.state={
            courseId:'',
            course:{title:""}
        }
        this.selectCourse=this.selectCourse.bind(this);
        this.courseService=CourseService.instance;
        this.getCourseName=this.getCourseName.bind(this);
        this.setCourse=this.setCourse.bind(this);
    }

    componentDidMount(){
        this.selectCourse(this.props.match.params.courseId);
        this.getCourseName(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps){
        this.selectCourse(newProps.match.params.courseId);
        this.getCourseName(newProps.match.params.courseId);
    }

    selectCourse(id){
        this.setState({courseId:id});
    }

    setCourse(course){
        return this.setState({course:{title:course.title}});
    }

    getCourseName(courseId){
        return this.courseService.findCourseById(courseId)
            .then((course)=>{
                return this.setCourse(course);
            }).then(()=>{
                return this.state.course.title;
            })
    }


    render(){
        return (
            <div>
                <nav className="navbar navbar-light bg-dark">
                    <span className="navbar-brand mb-0 h1" style={{color:"white"}}>{this.state.course.title}</span>
                </nav>
                <div>
                    <div>
                        <div>
                         <ModuleList courseId={this.state.courseId}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CourseEditor;