import React from 'react';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'
import { NavLink } from 'react-router-dom'



class ModuleListItem extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <li className="list-group-item" data-toggle="list" style={{padding:"0px"}}>
                <div>
                        <NavLink to={`/course/${this.props.courseId}/module/${this.props.module.id}`}
                                 style={{ color: '#000',textDecoration:"none",display:"block",padding:"20px"}}
                                 activeStyle={style}>
                            {this.props.module.title}
                                <button type="button" className="btn float-right"
                                        onClick={() =>{
                                            if (window.confirm("Are you sure?"))  this.props.delete(this.props.module.id)
                                        }}
                                        style={{padding:"0px",background:"transparent"}}>
                                    <i className="fa fa-2x fa-times" style={{color:"red"}}></i>
                                </button>
                        </NavLink>
                </div>
            </li>
        );
    }
}

let style={
    fontWeight: 'bold',
    background: 'lightblue',
};



export default ModuleListItem;