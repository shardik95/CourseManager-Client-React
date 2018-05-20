import React from 'react';
import {BrowserRouter as Router,Link,Route}
    from 'react-router-dom'

class CourseRow extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return(
            <tr>
                <td>
                    <div>
                        <Link to={`/course/${this.props.course.id}`}>
                             Course - {this.props.course.title}
                             </Link>
                    </div>
                </td>
                <td>Me</td>
                <td>{this.props.course.modified}</td>
                <td><button type="button" className="btn" onClick={() =>{
                    this.props.delete(this.props.course.id)
                }}><i className="fa fa-2x fa-times" style={{color:"red"}}></i></button></td>
            </tr>
        );
    }

}

export default CourseRow;