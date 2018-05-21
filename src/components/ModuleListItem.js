import React from 'react';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'

class ModuleListItem extends React.Component{

    constructor(props){
        super(props);

    }

    render(){
        return(
            <tr><td>
                <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`} style={{ color: '#000' }}>
                {this.props.module.title}
                </Link>
                </td>
                <td><span className="float-right">
                   <button type="button" className="btn" onClick={() =>{
                       if (window.confirm("Are you sure?"))  this.props.delete(this.props.module.id)
                   }}><i className="fa fa-2x fa-times" style={{color:"red"}}></i></button>
                </span></td>
            </tr>
        );
    }
}

export default ModuleListItem;