import React from 'react';
import Modal from 'react-responsive-modal';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'

class LessonTabItem extends React.Component{

    constructor(props){
        super(props);
        this.state={
            courseId:"",
            moduleId:"",
            lessonId:""
        }
        this.setCourseId=this.setCourseId.bind(this);
        this.setModuleId=this.setModuleId.bind(this);
        this.setLessonId=this.setLessonId.bind(this);
    }

    state = {
        open: false,
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount(){
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lesson.id);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lesson.id);
    }

    setCourseId(courseId){
        this.setState({courseId:courseId});
    }

    setModuleId(moduleId){
        this.setState({moduleId:moduleId});
    }

    setLessonId(lessonId){
        this.setState({lessonId:lessonId});
    }


    render(){
        const { open } = this.state;
        return(
            <li className="nav-item" style={{"color":"white"}}>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <br/>
                    <br/>
                    <div className="container-fluid ">
                        Are you sure you want to delete?
                    </div>
                        <br/><br/>
                    <button type="button" className="btn btn-danger float-right"
                            onClick={() =>{
                                this.props.delete(this.props.lesson.id)}}>
                        Delete
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" className="btn btn-success float-left"
                            onClick={this.onCloseModal}>
                        Cancel
                    </button>
                </Modal>
                <Link to={`/course/${this.state.courseId}/module/${this.state.moduleId}/lesson/${this.state.lessonId}`}>{this.props.lesson.title}</Link>&nbsp;
                <button className="btn btn-dark" type="button" onClick={this.onOpenModal}>
                    <i className="fa fa-times" style={{color:"white"}}></i>
                </button>
            </li>
        );

    }

}

export default LessonTabItem;