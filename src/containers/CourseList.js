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
            edit:{title:"",id:"",modified:""},
            editTitle:""
        }
        this.titleChanged=this.titleChanged.bind(this);
        this.createCourse=this.createCourse.bind(this);
        this.deleteCourse=this.deleteCourse.bind(this);
        this.populateForm=this.populateForm.bind(this);
        this.updateCourse=this.updateCourse.bind(this);
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

    populateForm(courseId,title){
        this.setState({edit:{title:this.state.editTitle,id:courseId,modified:this.dateTime()}});
    }

    renderAllCourses(){
        return this.state.courses.map((course)=>{
            return <CourseRow course={course} key={course.id} delete={this.deleteCourse} populateForm={this.populateForm}/>
        });
    }

    titleChanged(event){
        var x=event.target.value;
        this.setState({editTitle:x})
        return this.setState({course:{title:x,created:this.dateTime(),modified:this.dateTime()}});
    }

    createCourse(){
        if(this.state.course.title==""){
            var course={
                title:"New Course",
                created:this.dateTime(),
                modified:this.dateTime()
            }
            this.courseService.createCourse(course)
                .then(()=>{
                    this.findAllCourses();
                });
        }
        else{
            this.courseService.createCourse(this.state.course)
                .then(()=>{
                    this.findAllCourses();
                });
        }

    }

    updateCourse(){
        return this.courseService.updateCourse(this.state.edit)
            .then(()=>{
                this.findAllCourses();
            })
    }

    render(){
        return(
            <div>
                <table className="table table-hover table-striped ">
                    <thead>
                        <tr style={{background:'#4286f4'}}>
                            <th style={{color:"white"}}><h4>Course Manager</h4></th>
                            <td colSpan="2"><input className="form-control" placeholder="Course Title" onChange={this.titleChanged}/></td>
                            <th><button className="btn" style={{background:"#4286f4"}}><i className="fa fa-2x fa-plus" onClick={this.createCourse}
                                                           style={{color:"white"}}></i></button>
                            </th>
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