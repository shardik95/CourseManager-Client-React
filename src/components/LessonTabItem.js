import React from 'react'

class LessonTabItem extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return(
            <li className="nav-item" style={{"color":"white"}}>{this.props.lesson.title}&nbsp;
            <button className="btn btn-dark" type="button" onClick={()=> {
                if (window.confirm("Are you sure?")) this.props.delete(this.props.lesson.id)
            }}><i className="fa fa-times" style={{color:"red"}}></i>
                </button>
            </li>
        );

    }

}

export default LessonTabItem;