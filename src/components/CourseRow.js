import React from 'react';
import {Link} from 'react-router-dom'

class CourseRow extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return(
            <tr>
                <td>
                    <div>
                        <i className="fa fa-book" style={{color:"#4286f4"}}></i>&nbsp;
                        <Link to={`/course/${this.props.course.id}`} style={{ color: '#000' }}>
                             Course - {this.props.course.title}
                        </Link>
                    </div>
                </td>
                <td>Me</td>
                <td>{this.props.course.modified}</td>
                <td><button type="button" className="btn" onClick={() =>{
                    if (window.confirm("Are you sure?")) this.props.delete(this.props.course.id)
                }}><i className="fa fa-2x fa-times" style={{color:"red"}}></i></button>
                </td>
            </tr>
        );
    }

}

export default CourseRow;