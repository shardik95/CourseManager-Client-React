import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseService from "../services/CourseService";

class CourseList extends React.Component{

    constructor(){
        super();
        this.courseService=CourseService.instance;
        this.state={
            course:{title:"",created:"",modified:""},
            courses:[],
        }
        this.titleChanged=this.titleChanged.bind(this);
        this.createCourse=this.createCourse.bind(this);
        this.deleteCourse=this.deleteCourse.bind(this);
    }

    componentDidMount(){
        this.findAllCourses();
    }

    dateTime(){
        var currentdate = new Date();
        var month=currentdate.getMonth();
        var year=currentdate.getFullYear();
        var day=currentdate.getDate();
        var hrs=currentdate.getHours();
        var min=currentdate.getMinutes();
        var sec=currentdate.getSeconds();
        if(month<=8)
            month="0"+(month+1);
        if(day<=9)
            day="0"+day;
        if(hrs<=9)
            hrs="0"+hrs;
        if(min<=9)
            min="0"+min;
        if(sec<=9)
            sec="0"+sec;


        var datetime = year+ "-"
            + month+ "-"
            + day + " "
            + hrs + ":"
            + min + ":"
            + sec;
        return datetime;
    }

    findAllCourses(){
        return this.courseService.findAllCourses()
            .then((courses) =>{
                this.setState({courses: courses});
            })
    }

    deleteCourse(courseId){
        this.courseService.deleteCourse(courseId)
            .then(()=>{
                this.findAllCourses();
            });
    }

    renderAllCourses(){
        return this.state.courses.map((course)=>{
            return <CourseRow course={course} key={course.id} delete={this.deleteCourse}/>
        });
    }

    titleChanged(event){
        return this.setState({course:{title:event.target.value,created:this.dateTime(),modified:this.dateTime()}});
    }

    createCourse(){
        this.courseService.createCourse(this.state.course)
            .then(()=>{
                this.findAllCourses();
            });
    }

    render(){
        return(
            <div>
                <h1>Course Manager</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Add Course</th>
                            <td colSpan="2"><input className="form-control" placeholder="CS1111" onChange={this.titleChanged}/></td>
                            <th><button className="btn"><i className="fa fa-2x fa-plus" onClick={this.createCourse}></i></button></th>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <th>Owned By</th>
                            <th>Last modified by me:</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderAllCourses()}
                    </tbody>

                </table>
            </div>
        );
    }

}

export default CourseList;