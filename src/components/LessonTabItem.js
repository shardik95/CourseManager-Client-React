import React from 'react'

class LessonTabItem extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return(
            <li className="list-inline-item">{this.props.lesson.title}
            <button className="btn" type="button" onClick={()=> {
                this.props.delete(this.props.lesson.id)
            }}><i className="fa fa-times" style={{color:"red"}}></i>
                </button>
            </li>
        );

    }

}

export default LessonTabItem;